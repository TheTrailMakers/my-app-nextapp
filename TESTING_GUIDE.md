# 🧪 Testing Guide - API Endpoints

Your production booking system is now running! Here's how to test each endpoint.

---

## Quick Start

### 1. Server Status
```bash
# The dev server should be running on:
http://localhost:3000

# Check if it's up:
curl http://localhost:3000/api/treks
```

---

## Test Endpoints

### 📍 1. List All Treks

**Endpoint**: `GET /api/treks`

**In Browser**:
```
http://localhost:3000/api/treks
```

**With curl**:
```bash
curl http://localhost:3000/api/treks
```

**With Pagination & Filters**:
```bash
# List 5 treks per page, page 1
curl "http://localhost:3000/api/treks?limit=5&page=1"

# Filter by state
curl "http://localhost:3000/api/treks?state=Himachal%20Pradesh"

# Filter by difficulty
curl "http://localhost:3000/api/treks?difficulty=MODERATE"

# Filter by price range (in paise)
curl "http://localhost:3000/api/treks?minPrice=1000000&maxPrice=2000000"
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "slug": "beas-kund-trek",
      "name": "Beas Kund Trek",
      "description": "A moderate trek...",
      "state": "Himachal Pradesh",
      "basePrice": 1500000,
      "difficulty": "MODERATE",
      "duration": 5,
      "thumbnailUrl": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

---

### 📍 2. Get Single Trek by Slug

**Endpoint**: `GET /api/treks?slug=beas-kund-trek`

**In Browser**:
```
http://localhost:3000/api/treks?slug=beas-kund-trek
```

**With curl**:
```bash
curl "http://localhost:3000/api/treks?slug=beas-kund-trek"
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "slug": "beas-kund-trek",
    "name": "Beas Kund Trek",
    "description": "...",
    "state": "Himachal Pradesh",
    "difficulty": "MODERATE",
    "duration": 5,
    "basePrice": 1500000,
    "departures": [
      {
        "id": "...",
        "startDate": "2024-06-15T00:00:00.000Z",
        "endDate": "2024-06-20T00:00:00.000Z",
        "seatsAvailable": 8,
        "totalSeats": 15,
        "pricePerPerson": 1500000
      }
    ]
  }
}
```

---

### 📍 3. Check Seat Availability

**Endpoint**: `GET /api/departures/[id]/availability`

**Step 1**: Get a departure ID from previous request (use the `id` from departures array)

**With curl**:
```bash
curl "http://localhost:3000/api/departures/[DEPARTURE_ID]/availability"
```

**Replace `[DEPARTURE_ID]`** with actual ID from the trek response above.

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "departureId": "...",
    "trekName": "Beas Kund Trek",
    "totalSeats": 15,
    "seatsAvailable": 8,
    "seatsBooked": 7,
    "occupancyRate": "46.7",
    "isCancelled": false,
    "isAvailable": true
  }
}
```

---

### 📍 4. Create a Booking (Requires Authentication)

**Endpoint**: `POST /api/bookings`

**Note**: This requires authentication. In development, you need to:

1. **Create a user** first (via auth system)
2. **Get a session token**
3. **Include in request header**

For now, here's how you would call it with the right authentication:

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [SESSION_TOKEN]" \
  -d '{
    "departureId": "[DEPARTURE_ID]",
    "numberOfPeople": 2,
    "contactName": "John Doe",
    "contactPhone": "9876543210",
    "contactEmail": "john@example.com"
  }'
```

**Response** (Success):
```json
{
  "success": true,
  "data": {
    "id": "...",
    "userId": "...",
    "departureId": "...",
    "numberOfPeople": 2,
    "totalAmount": 3000000,
    "status": "PENDING",
    "contactName": "John Doe",
    "createdAt": "2026-02-17T10:30:00Z"
  },
  "message": "Booking created successfully"
}
```

---

### 📍 5. Get User's Bookings (Requires Authentication)

**Endpoint**: `GET /api/bookings`

```bash
curl http://localhost:3000/api/bookings \
  -H "Authorization: Bearer [SESSION_TOKEN]"
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "departureId": "...",
      "numberOfPeople": 2,
      "status": "PENDING",
      "createdAt": "2026-02-17T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### 📍 6. Get Booking Details (Requires Authentication)

**Endpoint**: `GET /api/bookings/[id]`

```bash
curl http://localhost:3000/api/bookings/[BOOKING_ID] \
  -H "Authorization: Bearer [SESSION_TOKEN]"
```

---

### 📍 7. Cancel Booking (Requires Authentication)

**Endpoint**: `PATCH /api/bookings/[id]`

```bash
curl -X PATCH http://localhost:3000/api/bookings/[BOOKING_ID] \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [SESSION_TOKEN]" \
  -d '{
    "action": "cancel"
  }'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "status": "CANCELLED",
    "cancelledAt": "2026-02-17T10:35:00Z"
  },
  "message": "Booking cancelled successfully"
}
```

---

## Testing via Browser

### Simple Tests (No Authentication Needed)

1. **List all treks**:
   ```
   http://localhost:3000/api/treks
   ```

2. **Get single trek**:
   ```
   http://localhost:3000/api/treks?slug=beas-kund-trek
   ```

3. **Check availability**:
   1. First get a departure ID from trek response
   2. Then visit: `http://localhost:3000/api/departures/[ID]/availability`

### View Trek Detail Page

Visit the dynamic trek pages:
- http://localhost:3000/treks/beas-kund-trek
- http://localhost:3000/treks/ranisui-lake-trek
- http://localhost:3000/treks/bhrigu-lake-trek

You'll see:
- Trek details
- Itinerary
- Inclusions/Exclusions
- Available departures with seat availability
- Booking widget (button to book)

---

## Inspect Database

### Use Prisma Studio

Open a terminal and run:
```bash
npx prisma studio
```

This opens a web UI where you can:
- Browse all tables
- View sample data
- Create/edit/delete records
- Run queries

Visit: http://localhost:5555

---

## Error Testing

### Test Invalid Trek Slug
```bash
curl http://localhost:3000/api/treks?slug=non-existent-trek
```

**Response** (404):
```json
{
  "success": false,
  "error": {
    "message": "Trek \"non-existent-trek\" not found",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

### Test Invalid Departure ID
```bash
curl http://localhost:3000/api/departures/invalid-id/availability
```

**Response** (404):
```json
{
  "success": false,
  "error": {
    "message": "Departure not found",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

---

## Sample Data Reference

### Seeded Treks
1. **Beas Kund Trek** - Slug: `beas-kund-trek`
   - Duration: 5 days
   - Difficulty: MODERATE
   - Price: ₹15,000 (1,500,000 paise)

2. **Ranisui Lake Trek** - Slug: `ranisui-lake-trek`
   - Duration: 4 days
   - Difficulty: EASY_MODERATE
   - Price: ₹12,000 (1,200,000 paise)

3. **Bhrigu Lake Trek** - Slug: `bhrigu-lake-trek`
   - Duration: 7 days
   - Difficulty: HARD
   - Price: ₹18,000 (1,800,000 paise)

### Seeded Departures
Each trek has 2-3 departures with varied availability:
- Beas Kund: 3 departures (8, 20, 5 seats available)
- Ranisui Lake: 2 departures (12, 6 seats available)
- Bhrigu Lake: 2 departures (4, 12 seats available)

---

## Postman Collection

Import this into Postman for easy testing:

```json
{
  "info": {
    "name": "Trek Booking API",
    "description": "Test endpoints for the booking system"
  },
  "item": [
    {
      "name": "List Treks",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/treks"
      }
    },
    {
      "name": "Get Trek by Slug",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/treks?slug=beas-kund-trek"
      }
    },
    {
      "name": "Check Availability",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/departures/[DEPARTURE_ID]/availability"
      }
    }
  ]
}
```

---

## Troubleshooting

### Server Not Running
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 [PID]

# Start server again
npm run dev
```

### Database Connection Error
```bash
# Check DATABASE_URL in .env.local
cat .env.local

# Test connection
npx prisma db execute --stdin < ping.sql
```

### Prisma Client Error
```bash
# Regenerate Prisma client
npx prisma generate
```

### 404 Errors on API
```bash
# Verify API route files exist
ls -la src/app/api/treks/route.ts
ls -la src/app/api/bookings/route.ts
```

---

## Next Steps

1. ✅ **Test public endpoints** - List and get treks
2. ✅ **Verify database** - Check Prisma Studio
3. ⬜ **Setup authentication** - Configure NextAuth properly
4. ⬜ **Test booking flow** - Once auth is working
5. ⬜ **Add Razorpay keys** - Enable payment processing
6. ⬜ **Deploy** - Push to production

---

**Happy Testing! 🚀**

For more details, see:
- [README_BOOKING_SYSTEM.md](README_BOOKING_SYSTEM.md) - System overview
- [API_EXAMPLES.ts](API_EXAMPLES.ts) - Code examples
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
