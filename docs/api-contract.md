# API Specification & Contract (`api-contract.md`)

## 1. Overview & Base Configuration
This document defines the RESTful API endpoints, request payloads, and response structures used by the application.

- **Base URL Configuration:** Configured via Vite environment variables (`VITE_API_BASE_URL`)
  - **Static / Read-only endpoints:** `/api/v1` (Local public directory)
  - **Dynamic / Mutation endpoints:** `https://<mockapi-id>.mockapi.io/api/v1`
- **Headers:** `Content-Type: application/json`

---

## 2. Standard HTTP Status Codes

| Code | Status | Description |
| :--- | :--- | :--- |
| `200` | OK | Request succeeded, returns requested data payload. |
| `201` | Created | Resource successfully created via POST. |
| `400` | Bad Request | Validation failure (e.g., missing required fields or Zod schema mismatch). |
| `404` | Not Found | Requested resource ID does not exist on server. |
| `500` | Server Error | Internal server or unhandled runtime failure. |

---

## 3. Endpoints Specification

### 3.1 Service Listing Module

#### GET `/services`
Retrieves a list of available services to render inside the visual Card View.

* **Data Source:** Local Static JSON (`public/api/v1/services.json`)
* **Request Headers:** None
* **Response (200 OK):**
```json
[
  {
    "id": "srv-101",
    "service_name": "Home Deep Cleaning",
    "category": "Cleaning",
    "price": 4500,
    "imageUrl": "/assets/services/cleaning.jpg"
  }
]