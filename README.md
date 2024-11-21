# School API

A backend service for managing and retrieving school data based on proximity.

## Live API
Base URL: `https://your-app.onrender.com`

### Endpoints
1. **Add School** (`POST /addSchool`):
   - Adds a new school to the database.
   - **Payload**:
     ```json
     {
       "name": "School Name",
       "address": "School Address",
       "latitude": 28.7041,
       "longitude": 77.1025
     }
     ```
   - **Response**:
     ```json
     { "message": "School added successfully", "schoolId": 1 }
     ```

2. **List Schools** (`GET /listSchools`):
   - Retrieves a list of schools sorted by proximity.
   - **Query Parameters**:
     - `latitude`: User's latitude.
     - `longitude`: User's longitude.
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "name": "School A",
         "address": "Address A",
         "latitude": 28.7041,
         "longitude": 77.1025,
         "distance": "2.34 km"
       }
     ]
     ```

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-api.git
   cd school-api
   npm start
