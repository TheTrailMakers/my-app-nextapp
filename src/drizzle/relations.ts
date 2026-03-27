import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  account: {
    user: r.one.userTable({
      from: r.accountTable.userId,
      to: r.userTable.id,
    }),
  },
  user: {
    accounts: r.many.accountTable(),
    auditLogs: r.many.auditLog(),
    departuresViaBooking: r.many.departure({
      alias: "departure_id_user_id_via_booking",
    }),
    treks: r.many.trek(),
    failedLoginAttempts: r.many.failedLoginAttempt(),
    bookings: r.many.booking(),
    sessions: r.many.sessionTable(),
    departuresViaTrekLeaderPayout: r.many.departure({
      alias: "departure_id_user_id_via_trekLeaderPayout",
    }),
  },
  auditLog: {
    user: r.one.userTable({
      from: r.auditLog.userId,
      to: r.userTable.id,
    }),
  },
  departure: {
    usersViaBooking: r.many.userTable({
      from: r.departure.id.through(r.booking.departureId),
      to: r.userTable.id.through(r.booking.userId),
      alias: "departure_id_user_id_via_booking",
    }),
    usersViaTrekLeaderPayout: r.many.userTable({
      from: r.departure.id.through(r.trekLeaderPayout.departureId),
      to: r.userTable.id.through(r.trekLeaderPayout.trekLeaderId),
      alias: "departure_id_user_id_via_trekLeaderPayout",
    }),
  },
  courseSession: {
    course: r.one.course({
      from: r.courseSession.courseId,
      to: r.course.id,
    }),
  },
  course: {
    courseSessions: r.many.courseSession(),
  },
  trek: {
    users: r.many.userTable({
      from: r.trek.id.through(r.departure.trekId),
      to: r.userTable.id.through(r.departure.trekLeaderId),
    }),
    trekReviews: r.many.trekReview(),
  },
  expeditionSession: {
    expedition: r.one.expedition({
      from: r.expeditionSession.expeditionId,
      to: r.expedition.id,
    }),
  },
  expedition: {
    expeditionSessions: r.many.expeditionSession(),
  },
  failedLoginAttempt: {
    user: r.one.userTable({
      from: r.failedLoginAttempt.userId,
      to: r.userTable.id,
    }),
  },
  booking: {
    users: r.many.userTable({
      from: r.booking.id.through(r.payment.bookingId),
      to: r.userTable.id.through(r.payment.userId),
    }),
  },
  rolePermission: {
    adminPermission: r.one.adminPermission({
      from: r.rolePermission.permissionId,
      to: r.adminPermission.id,
    }),
  },
  adminPermission: {
    rolePermissions: r.many.rolePermission(),
  },
  session: {
    user: r.one.userTable({
      from: r.sessionTable.userId,
      to: r.userTable.id,
    }),
  },
  trekReview: {
    trek: r.one.trek({
      from: r.trekReview.trekId,
      to: r.trek.id,
    }),
  },
}));
