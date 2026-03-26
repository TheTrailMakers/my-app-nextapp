const { randomUUID } = require("crypto");
const bcrypt = require("bcryptjs");
const { sql } = require("./db-client");

const DEFAULT_PERMISSIONS = {
  DASHBOARD: {
    VIEW_DASHBOARD: { ADMIN: true, MODERATOR: true },
    VIEW_OVERVIEW_STATS: { ADMIN: true, MODERATOR: true },
  },
  TREKS: {
    VIEW_TREKS: { ADMIN: true, MODERATOR: true },
    CREATE_TREK: { ADMIN: true, MODERATOR: false },
    EDIT_TREK: { ADMIN: true, MODERATOR: false },
    DELETE_TREK: { ADMIN: true, MODERATOR: false },
    MANAGE_DEPARTURES: { ADMIN: true, MODERATOR: false },
    ASSIGN_TREK_LEADER: { ADMIN: true, MODERATOR: false },
  },
  PARTICIPANTS: {
    VIEW_PARTICIPANTS: { ADMIN: true, MODERATOR: true },
    VIEW_MEDICAL_FORMS: { ADMIN: true, MODERATOR: true },
    VERIFY_ID: { ADMIN: true, MODERATOR: true },
    MANAGE_WAIVERS: { ADMIN: true, MODERATOR: true },
  },
  FINANCE: {
    VIEW_FINANCE: { ADMIN: true, MODERATOR: false },
    VIEW_PAYMENTS: { ADMIN: true, MODERATOR: false },
    PROCESS_PAYOUTS: { ADMIN: true, MODERATOR: false },
    VIEW_GST: { ADMIN: true, MODERATOR: false },
  },
  MARKETING: {
    VIEW_MARKETING: { ADMIN: true, MODERATOR: false },
    EDIT_MARKETING_METRICS: { ADMIN: true, MODERATOR: false },
  },
  REVIEWS: {
    VIEW_REVIEWS: { ADMIN: true, MODERATOR: true },
    MODERATE_REVIEWS: { ADMIN: true, MODERATOR: true },
  },
  USERS: {
    VIEW_USERS: { ADMIN: true, MODERATOR: false },
    CREATE_USERS: { ADMIN: true, MODERATOR: false },
    EDIT_USERS: { ADMIN: true, MODERATOR: false },
    DELETE_USERS: { ADMIN: true, MODERATOR: false },
    MANAGE_ROLES: { ADMIN: false, MODERATOR: false },
    VIEW_AUDIT_LOGS: { ADMIN: true, MODERATOR: false },
  },
};

const expeditions = [
  {
    slug: "yunam-peak",
    name: "Yunam Peak",
    description:
      "A moderate trekking peak at 4,885m with stunning views of the Himalayas",
    state: "Himachal Pradesh",
    basePrice: 20000 * 100,
    difficulty: "HARD",
    duration: 5,
    maxAltitude: 4885,
    distance: 22,
    itinerary:
      "Day 1: Reach base camp\nDay 2: Acclimatization\nDay 3: Summit push\nDay 4: Descent and exploration\nDay 5: Return",
    imageUrl:
      "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
    thumbnailUrl:
      "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg",
  },
  {
    slug: "friendship-peak",
    name: "Friendship Peak",
    description:
      "A challenging alpine expedition at 5,289m near the Spiti valley",
    state: "Himachal Pradesh",
    basePrice: 28000 * 100,
    difficulty: "VERY_HARD",
    duration: 7,
    maxAltitude: 5289,
    distance: 35,
    itinerary:
      "Day 1-2: Travel and acclimatization\nDay 3-5: Climbing days\nDay 6: Summit\nDay 7: Descent and return",
    imageUrl:
      "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
    thumbnailUrl:
      "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg",
  },
];

const courses = [
  {
    slug: "rock-climbing-basics",
    name: "Rock Climbing Basics",
    description:
      "Learn fundamental rock climbing techniques in a safe environment",
    location: "Dharamshala, HP",
    price: 8000 * 100,
    difficulty: "EASY",
    duration: 3,
    imageUrl:
      "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
    thumbnailUrl:
      "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg",
  },
];

const faqs = [
  {
    question: "What is the best time to trek?",
    answer:
      "The best trekking season in Himachal Pradesh is June to September for summer treks and October to November for autumn treks.",
    category: "Trekking",
    order: 1,
  },
  {
    question: "Do I need prior trekking experience?",
    answer:
      "No, we have treks for all levels from beginners to advanced. Choose a trek that matches your fitness level.",
    category: "Safety",
    order: 2,
  },
  {
    question: "What should I pack for a trek?",
    answer:
      "Pack appropriate clothing layers, sturdy hiking boots, backpack, water bottle, and weather-appropriate gear.",
    category: "Preparation",
    order: 3,
  },
  {
    question: "Is altitude sickness a concern?",
    answer:
      "For moderate altitudes (up to 4,000m), altitude sickness is rare. We recommend proper acclimatization during high-altitude treks.",
    category: "Safety",
    order: 4,
  },
  {
    question: "How fit do I need to be?",
    answer:
      "Fitness requirements vary by trek difficulty. Easy treks require basic fitness; moderate to hard treks require regular exercise preparation.",
    category: "Preparation",
    order: 5,
  },
  {
    question: "What meals are provided?",
    answer:
      "We provide meals as per the trek itinerary. Special dietary requirements can be accommodated with prior notice.",
    category: "Facilities",
    order: 6,
  },
  {
    question: "Can I trek solo?",
    answer:
      "Yes, you can trek solo, but we recommend joining group treks for safety and shared experience.",
    category: "General",
    order: 7,
  },
  {
    question: "What is the maximum altitude we trek?",
    answer:
      "Our regular treks go up to 4,000-4,500m. Expeditions can reach up to 5,000m or higher.",
    category: "Trekking",
    order: 8,
  },
  {
    question: "Are permits required?",
    answer:
      "Some high-altitude areas require permits. We handle all permit arrangements for our treks.",
    category: "Legal",
    order: 9,
  },
  {
    question: "What happens in case of emergency?",
    answer:
      "We have experienced guides with first aid training and satellite communication in high-altitude areas.",
    category: "Safety",
    order: 10,
  },
];

async function seedUser(user) {
  const existing = await sql`
    select "id"
    from "User"
    where "email" = ${user.email}
    limit 1
  `;

  if (existing.length > 0) {
    console.log(`✓ ${user.role} user already exists: ${user.email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(user.password, 12);

  await sql`
    insert into "User" (
      "id",
      "email",
      "username",
      "password",
      "firstName",
      "lastName",
      "role",
      "isActive",
      "isLocked",
      "isDenied",
      "name",
      "updatedAt"
    )
    values (
      ${randomUUID()},
      ${user.email},
      ${user.username},
      ${hashedPassword},
      ${user.firstName},
      ${user.lastName},
      ${user.role},
      true,
      false,
      false,
      ${`${user.firstName} ${user.lastName}`.trim()},
      ${new Date()}
    )
  `;

  console.log(`✓ Created ${user.role} user: ${user.email}`);
}

async function seedPermissions() {
  console.log("Seeding permissions...");

  for (const [category, permissions] of Object.entries(DEFAULT_PERMISSIONS)) {
    for (const [permission, roles] of Object.entries(permissions)) {
      await sql`
        insert into "AdminPermission" (
          "id",
          "permission",
          "category",
          "description",
          "updatedAt"
        )
        values (
          ${permission},
          ${permission},
          ${category},
          ${`${permission} - ${category}`},
          ${new Date()}
        )
        on conflict ("permission")
        do update set
          "category" = excluded."category",
          "description" = excluded."description",
          "updatedAt" = excluded."updatedAt"
      `;

      for (const [role, isEnabled] of Object.entries(roles)) {
        await sql`
          insert into "RolePermission" (
            "id",
            "permissionId",
            "role",
            "isEnabled",
            "updatedAt"
          )
          values (
            ${`${permission}:${role}`},
            ${permission},
            ${role},
            ${Boolean(isEnabled)},
            ${new Date()}
          )
          on conflict ("permissionId", "role")
          do update set
            "isEnabled" = excluded."isEnabled",
            "updatedAt" = excluded."updatedAt"
        `;
      }
    }
  }

  console.log("✓ Permissions seeded");
}

async function seedExpeditions() {
  for (const expedition of expeditions) {
    await sql`
      insert into "Expedition" (
        "id",
        "slug",
        "name",
        "description",
        "state",
        "basePrice",
        "difficulty",
        "duration",
        "maxAltitude",
        "distance",
        "itinerary",
        "imageUrl",
        "thumbnailUrl",
        "updatedAt"
      )
      values (
        ${randomUUID()},
        ${expedition.slug},
        ${expedition.name},
        ${expedition.description},
        ${expedition.state},
        ${expedition.basePrice},
        ${expedition.difficulty},
        ${expedition.duration},
        ${expedition.maxAltitude},
        ${expedition.distance},
        ${expedition.itinerary},
        ${expedition.imageUrl},
        ${expedition.thumbnailUrl},
        ${new Date()}
      )
      on conflict ("slug")
      do update set
        "name" = excluded."name",
        "description" = excluded."description",
        "state" = excluded."state",
        "basePrice" = excluded."basePrice",
        "difficulty" = excluded."difficulty",
        "duration" = excluded."duration",
        "maxAltitude" = excluded."maxAltitude",
        "distance" = excluded."distance",
        "itinerary" = excluded."itinerary",
        "imageUrl" = excluded."imageUrl",
        "thumbnailUrl" = excluded."thumbnailUrl",
        "updatedAt" = excluded."updatedAt"
    `;
  }

  console.log(`✓ Seeded ${expeditions.length} expeditions`);
}

async function seedCourses() {
  for (const course of courses) {
    await sql`
      insert into "Course" (
        "id",
        "slug",
        "name",
        "description",
        "location",
        "price",
        "difficulty",
        "duration",
        "imageUrl",
        "thumbnailUrl",
        "curriculum",
        "updatedAt"
      )
      values (
        ${randomUUID()},
        ${course.slug},
        ${course.name},
        ${course.description},
        ${course.location},
        ${course.price},
        ${course.difficulty},
        ${course.duration},
        ${course.imageUrl},
        ${course.thumbnailUrl},
        ${"Curriculum to be updated"},
        ${new Date()}
      )
      on conflict ("slug")
      do update set
        "name" = excluded."name",
        "description" = excluded."description",
        "location" = excluded."location",
        "price" = excluded."price",
        "difficulty" = excluded."difficulty",
        "duration" = excluded."duration",
        "imageUrl" = excluded."imageUrl",
        "thumbnailUrl" = excluded."thumbnailUrl",
        "updatedAt" = excluded."updatedAt"
    `;
  }

  console.log(`✓ Seeded ${courses.length} courses`);
}

async function seedFaqs() {
  for (const faq of faqs) {
    const existing = await sql`
      select "id"
      from "FAQ"
      where "order" = ${faq.order}
      limit 1
    `;

    if (existing.length > 0) {
      await sql`
        update "FAQ"
        set
          "question" = ${faq.question},
          "answer" = ${faq.answer},
          "category" = ${faq.category},
          "updatedAt" = ${new Date()}
        where "id" = ${existing[0].id}
      `;
      continue;
    }

    await sql`
      insert into "FAQ" (
        "id",
        "question",
        "answer",
        "category",
        "order",
        "updatedAt"
      )
      values (
        ${randomUUID()},
        ${faq.question},
        ${faq.answer},
        ${faq.category},
        ${faq.order},
        ${new Date()}
      )
    `;
  }

  console.log(`✓ Seeded ${faqs.length} FAQs`);
}

async function main() {
  console.log("Starting Drizzle/SQL bootstrap seed...");

  await seedUser({
    email: "admin@trailmakers.com",
    username: "admin",
    password: "Admin@123456",
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN",
  });

  await seedUser({
    email: "superadmin@trailmakers.in",
    username: "superadmin",
    password: "superAdmin@123456",
    firstName: "Super",
    lastName: "Admin",
    role: "SUPER_ADMIN",
  });

  await seedPermissions();
  await seedExpeditions();
  await seedCourses();
  await seedFaqs();

  console.log("Bootstrap seed complete.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
