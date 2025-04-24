# HealthTrack Pro API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```
**Body:**
```json
{
    "username": "string",
    "password": "string"
}
```
**Response:** Status 201
```json
{
    "message": "User created successfully",
    "user_id": "integer"
}
```

#### Login
```http
POST /auth/login
```
**Body:**
```json
{
    "username": "string",
    "password": "string"
}
```
**Response:** Status 200
```json
{
    "access_token": "string",
    "token_type": "bearer"
}
```

### Clients

#### Create Client
```http
POST /api/clients
```
**Auth:** Required  
**Body:**
```json
{
    "first_name": "Simon",
    "last_name": "Njoguu",
    "email": "Simon@example.com",
    "program_ids": [2, 3]
}
```

**Response:** Status 201
```json
{
    "id": 2,
    "first_name": "Simon",
    "last_name": "Njoguu",
    "email": "Simon@example.com",
    "programs": [
        {
            "id": 2,
            "name": "Mental Health Awareness",
            "description": "A 2-week Mental Health",
            "created_at": "2025-04-24T20:40:31"
        },
        {
            "id": 3,
            "name": "Aerobatics",
            "description": "7 days Aerobatics",
            "created_at": "2025-04-24T21:24:33"
        }
    ]
}
```

**Key Changes:**
- Request now uses `program_ids` array instead of full program objects
- `program_ids` contains just the IDs of existing programs
- Programs must be created separately before being assigned to a client

#### Get Client
```http
GET /clients/{client_id}
```
**Auth:** Required  
**Response:** Status 200
```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "programs": [
        {
            "id": "integer",
            "name": "string",
            "description": "string"
        }
    ]
}
```

#### List Clients
```http
GET /clients
```
**Auth:** Required  
**Query Parameters:**
- `page`: integer (optional)
- `per_page`: integer (optional)
- `search`: string (optional)

**Response:** Status 200
```json
{
    "clients": [
        {
            "id": "integer",
            "first_name": "string",
            "last_name": "string",
            "email": "string"
        }
    ],
    "total": "integer",
    "pages": "integer"
}
```

### Programs

#### Create Program
```http
POST /programs
```
**Auth:** Required  
**Body:**
```json
{
    "name": "string",
    "description": "string"
}
```
**Response:** Status 201
```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "created_at": "datetime"
}
```

#### Get Program
```http
GET /programs/{program_id}
```
**Auth:** Required  
**Response:** Status 200
```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "created_at": "datetime",
    "clients": [
        {
            "id": "integer",
            "first_name": "string",
            "last_name": "string",
            "email": "string"
        }
    ]
}
```

## Error Responses

### 400 Bad Request
```json
{
    "error": "string",
    "message": "string"
}
```

### 401 Unauthorized
```json
{
    "msg": "Missing/invalid token"
}
```

### 404 Not Found
```json
{
    "error": "Resource not found",
    "message": "string"
}
```

## Health Check
```http
GET /health
```
**Response:** Status 200
```json
{
    "status": "healthy",
    "timestamp": "datetime"
}
```