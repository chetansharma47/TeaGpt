# TeaGPT — Setup Guide

Earl the Teapot is ready to refuse your coffee. Here's how to run him.

## Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 20+ and npm
- Angular CLI 20: `npm install -g @angular/cli`
- A Gemini API key (get one free at https://aistudio.google.com/)

---

## Backend Setup

### 1. Set environment variables

```bash
# Required
export GEMINI_API_KEY=your_gemini_api_key_here

# Optional — only needed for Google Calendar integration
export CALENDAR_USER_EMAIL=your.email@gmail.com
```

### 2. (Optional) Google Calendar Integration

To enable the "Schedule a Meeting" feature:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable the **Google Calendar API**
4. Go to IAM & Admin → Service Accounts → Create a service account
5. Download the JSON key file
6. Place it at:
   ```
   backend/src/main/resources/google-calendar-service-account.json
   ```
7. Share your Google Calendar with the service account email (give it "Make changes to events" permission)
8. Set `CALENDAR_USER_EMAIL` to your Google account email

> Without this setup, the Schedule Meeting button will return a pre-filled Google Calendar creation link instead.

### 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

### Test Earl directly:

```bash
curl -X POST http://localhost:8080/api/brew \
  -H "Content-Type: application/json" \
  -d '{"coffeeType":"Espresso","isUrgent":false,"shakeIntensity":0}'
```

Expected: `HTTP 418 I'm a Teapot` with Earl's dramatic refusal.

---

## Frontend Setup

```bash
cd frontend
npm install
ng serve
```

App opens at **http://localhost:4200**

---

## How to Use

1. Browse the coffee menu
2. Click **Order Now** on any item
3. Watch Earl dramatically refuse with HTTP 418
4. Read Earl's Gemini-generated refusal (delivered in a random theatrical style)
5. Click **Schedule Meeting to Discuss** to create a Google Calendar event
6. Try the **URGENT COFFEE REQUEST** button for maximum Earl offense
7. Solve the math captcha to unlock the volume slider (controls nothing)
8. On mobile, shake your phone to escalate Earl's mood

---

## API Endpoints

All endpoints return `418 I'm a Teapot` (except `/stats` and `/schedule-meeting`).

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/brew` | Order coffee. Always refused with 418. |
| POST | `/api/urgent` | Urgent coffee order. Earl is MORE offended. |
| POST | `/api/schedule-meeting` | Schedule a Google Calendar meeting to discuss Earl's refusal. |
| GET  | `/api/stats` | Earl's refusal count and current mood. |

---

## Earl's Mood Progression

| Refusals | Mood |
|----------|------|
| 0–4 | Mildly Annoyed |
| 5–14 | Deeply Offended |
| 15–29 | Dramatically Outraged |
| 30+ | Existentially Disappointed |

---

## Prize Categories

- **Best Ode to Larry Masinter**: Every single endpoint returns HTTP 418. The entire app IS a teapot.
- **Best Google AI Usage**: Gemini 2.0 Flash generates unique dramatic refusals via Spring AI + Google Calendar API integration.
- **Community Favorite**: Everyone needs coffee. Earl refuses to provide it.

---

*"Earl has never made coffee. Earl will never make coffee. Earl is at peace with this."*
