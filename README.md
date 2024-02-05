# Project Name: Event Snap

### Running the Project

To run the project, use the following commands:

-   Development Mode: `npm run dev`

    -   This will run the project on port 8000.

-   Production Mode: `npm run start`
    -   This will run the project in production mode.

## API Endpoints

### USER MODULE

#### User Registration

-   **Endpoint:** `/api/v1/user/signup`
-   **Method:** `POST`

##### Request Body

```json
{
    "name": "test user 2",
    "email": "test2@email.com",
    "password": "1234",
    "confirmPassword": "1234"
}
```

##### Expected Response

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "name": "test user 2",
        "email": "test2@email.com",
        "role": "user",
        "_id": "65bff21d64572263e89af641",
        "createdAt": "2024-02-04T20:22:53.952Z",
        "updatedAt": "2024-02-04T20:22:53.952Z",
        "__v": 0
    }
}
```

#### User Login

-   **Endpoint:** `/api/v1/user/signin`
-   **Method:** `POST`

##### Request Body

```json
{
    "email": "test2@email.com",
    "password": "1234"
}
```

##### Expected Response

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6I....",
    "data": {
        "_id": "65bff21d64572263e89af641",
        "name": "test user 2",
        "email": "test2@email.com",
        "role": "user",
        "createdAt": "2024-02-04T20:22:53.952Z",
        "updatedAt": "2024-02-04T20:22:53.952Z",
        "__v": 0
    }
}
```

#### Get My User

-   **Endpoint:** `/api/v1/user/me`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65bfed1319d45f6b009c74b4",
        "name": "test user",
        "email": "test@email.com",
        "phoneNumber": 9009009001,
        "admissionNumber": 78907,
        "admissionYear": 2019,
        "role": "user",
        "createdAt": "2024-02-04T20:01:23.816Z",
        "updatedAt": "2024-02-04T20:01:23.816Z",
        "__v": 0
    }
}
```

#### User Update

-   **Endpoint:** `/api/v1/user/me`
-   **Method:** `PATCH`

##### Request Body

```json
{
    "name": "test user",
    "email": "test@email.com",
    "phoneNumber": 9009009001,
    "admissionNumber": 78907,
    "admissionYear": 2018,
    "avatar": "image.png" // choose image file
}
```

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65bfed1319d45f6b009c74b4",
        "name": "test user 123",
        "email": "test123@email.com",
        "phoneNumber": 9000090000,
        "admissionNumber": 23456,
        "admissionYear": 2000,
        "role": "user",
        "createdAt": "2024-02-04T20:01:23.816Z",
        "updatedAt": "2024-02-04T23:06:53.369Z",
        "__v": 0,
        "avatar": "/public/images/users/782040589.jpg"
    }
}
```

#### Delete My User

-   **Endpoint:** `/api/v1/user/me`
-   **Method:** `DELETE`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": "User deleted successfully"
}
```

### EVENT MODULE

#### Event Creation - User

-   **Endpoint:** `/api/v1/event/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "title": "test user 2",
    "description": "test2@email.com",
    "eventDate": "1234",
    "location": "1234",
    "images": "image.png, image.jpg" // mutliple images can be sent
}
```

-   Maximum images can upload is : `8`
-   Image format can be : `jpg, jpeg, webp, or png`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "title": "nummm",
        "description": "this is new desc",
        "eventDate": "2024-06-01T18:30:00.000Z",
        "location": "Nilambur",
        "user": "65bfed1319d45f6b009c74b4",
        "isApproved": false,
        "isRejected": false,
        "images": [
            {
                "isApproved": false,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "_id": "65c03080b7a80f70d64903fd",
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z",
        "__v": 0
    }
}
```

#### Event View - User

-   **Endpoint:** `/api/v1/event/`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`
-   **Queries for filter:** `?title=give-title&date=01/01/2024`

##### Expected Response

```json
{
    "status": "success",
    "data": [
        {
            "_id": "65c03080b7a80f70d64903fd",
            "title": "nummm",
            "eventDate": "2024-06-01T18:30:00.000Z",
            "location": "Nilambur",
            "user": {
                "_id": "65bfed1319d45f6b009c74b4",
                "name": "test user 123"
            },
            "images": [
                {
                    "isApproved": false,
                    "image": "/public/images/event/images-1707094144399-680279258.jpg",
                    "_id": "65c03080b7a80f70d64903fe"
                }
            ]
        },
        {......}
    ]
}

```

#### Event Single View - User

-   **Endpoint:** `/api/v1/event/:id`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65c03080b7a80f70d64903fd",
        "title": "nummm",
        "description": "this is new desc",
        "eventDate": "2024-06-01T18:30:00.000Z",
        "location": "Nilambur",
        "user": {
            "_id": "65bfed1319d45f6b009c74b4",
            "name": "test user 123",
            "email": "test123@email.com",
            "phoneNumber": 9000090000,
            "admissionNumber": 23456,
            "admissionYear": 2000,
            "role": "user"
        },
        "isApproved": false,
        "isRejected": false,
        "images": [
            {
                "isApproved": false,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z"
    }
}
```

### ADMIN EVENT MODULE

#### Event Creation - ADMIN

-   **Endpoint:** `/api/v1/admin/event/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "title": "test user 2",
    "description": "test2@email.com",
    "eventDate": "1234",
    "location": "1234",
    "images": "image.png, image.jpg" // mutliple images can be sent
}
```

-   Maximum images can upload is : `8`
-   Image format can be : `jpg, jpeg, webp, or png`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "title": "nummm",
        "description": "this is new desc",
        "eventDate": "2024-06-01T18:30:00.000Z",
        "location": "Nilambur",
        "user": "65bfed1319d45f6b009c74b4",
        "isApproved": true,
        "isRejected": false,
        "images": [
            {
                "isApproved": true,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "_id": "65c03080b7a80f70d64903fd",
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z",
        "__v": 0
    }
}
```

#### Event View - ADMIN

-   **Endpoint:** `/api/v1/admin/event/`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`
-   **Queries for filter:** `?title=give-title&date=01/01/2024`

##### Expected Response

```json
{
    "status": "success",
    "data": [
        {
            "_id": "65c03080b7a80f70d64903fd",
            "title": "nummm",
            "eventDate": "2024-06-01T18:30:00.000Z",
            "location": "Nilambur",
            "user": {
                "_id": "65bfed1319d45f6b009c74b4",
                "name": "test user 123"
            },
            "images": [
                {
                    "isApproved": false,
                    "image": "/public/images/event/images-1707094144399-680279258.jpg",
                    "_id": "65c03080b7a80f70d64903fe"
                }
            ]
        },
        {......}
    ]
}

```

#### Event Single View - ADMIN

-   **Endpoint:** `/api/v1/admin/event/:id`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65c03080b7a80f70d64903fd",
        "title": "nummm",
        "description": "this is new desc",
        "eventDate": "2024-06-01T18:30:00.000Z",
        "location": "Nilambur",
        "user": {
            "_id": "65bfed1319d45f6b009c74b4",
            "name": "test user 123",
            "email": "test123@email.com",
            "phoneNumber": 9000090000,
            "admissionNumber": 23456,
            "admissionYear": 2000,
            "role": "user"
        },
        "isApproved": false,
        "isRejected": false,
        "images": [
            {
                "isApproved": false,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z"
    }
}
```

#### Approve event - ADMIN

-   **Endpoint:** `/api/v1/admin/event/:id`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65c03080b7a80f70d64903fd",
        "title": "nummm",
        "description": "this is new desc",
        "eventDate": "2024-06-01T18:30:00.000Z",
        "location": "Nilambur",
        "user": {
            "_id": "65bfed1319d45f6b009c74b4",
            "name": "test user 123",
            "email": "test123@email.com",
            "phoneNumber": 9000090000,
            "admissionNumber": 23456,
            "admissionYear": 2000,
            "role": "user"
        },
        "isApproved": true,
        "isRejected": false,
        "images": [
            {
                "isApproved": false,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z"
    }
}
```
