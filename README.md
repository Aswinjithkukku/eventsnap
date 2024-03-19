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
    "images": "image.png" // Single image only
}
```

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

#### Get present day event - User

-   **Endpoint:** `/api/v1/event/present`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

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

#### Get present day event - User

-   **Endpoint:** `/api/v1/event/upcomming`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

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

#### Update an event - User

-   **Endpoint:** `/api/v1/event/:idofevent`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "title": "test user 2",
    "description": "test2@email.com",
    "eventDate": "1234",
    "location": "1234",
    "thumbnail": "image.png" // single image only
}
```

-   Image format can be : `jpg, jpeg, webp, or png`

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


#### Add Gallery Images - User | Admin

-   **Endpoint:** `/api/v1/event/gallery/:eventId`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "gallery": "imgages.png",
}
```
<!-- can add multiple images -->

-   Image format can be : `jpg, jpeg, webp, or png`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65f90b0a98a48a7b6c025756",
        "title": "user event today",
        "description": "user description",
        "eventDate": "2024-03-26T18:30:00.000Z",
        "location": "Nilambur",
        "user": "65f90ac798a48a7b6c02574e",
        "isApproved": true,
        "isRejected": false,
        "thumbnail": {
            "isApproved": true,
            "image": "/public/images/event/image-1710820106794-88776134.png",
            "_id": "65f90b0a98a48a7b6c025757"
        },
        "createdAt": "2024-03-19T03:48:26.800Z",
        "updatedAt": "2024-03-19T04:26:49.608Z",
        "__v": 0,
        "gallery": [
            {
                "isApproved": true,
                "image": "/public/images/event/gallery-1710822409601-906870205.png",
                "_id": "65f9140989ac5faa7ce84c63"
            },
            {
                "isApproved": true,
                "image": "/public/images/event/gallery-1710822409604-617019131.png",
                "_id": "65f9140989ac5faa7ce84c64"
            }
        ]
    }
}

```


#### Remove Gallery Images - User | Admin

-   **Endpoint:** `/api/v1/event/gallery/remove/:eventId`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "imageId": "65f9140989ac5faa7ce84c64",
}
```
<!-- one image id at a time -->

-   Image format can be : `jpg, jpeg, webp, or png`

##### Expected Response

```json
{
    "status": "success",
    "data": {
        "_id": "65f90b0a98a48a7b6c025756",
        "title": "user event today",
        "description": "user description",
        "eventDate": "2024-03-26T18:30:00.000Z",
        "location": "Nilambur",
        "user": "65f90ac798a48a7b6c02574e",
        "isApproved": true,
        "isRejected": false,
        "thumbnail": {
            "isApproved": true,
            "image": "/public/images/event/image-1710820106794-88776134.png",
            "_id": "65f90b0a98a48a7b6c025757"
        },
        "createdAt": "2024-03-19T03:48:26.800Z",
        "updatedAt": "2024-03-19T04:26:49.608Z",
        "__v": 0,
        "gallery": [
            {
                "isApproved": true,
                "image": "/public/images/event/gallery-1710822409601-906870205.png",
                "_id": "65f9140989ac5faa7ce84c63"
            },
        ]
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
    "images": "image.png" // single image only
}
```

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

#### Update an event - ADMIN

-   **Endpoint:** `/api/v1/admin/event/update/:idofevent`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "title": "test user 2",
    "description": "test2@email.com",
    "eventDate": "1234",
    "location": "1234",
    "thumbnail": "image.png" // single image only
}
```

-   Image format can be : `jpg, jpeg, webp, or png`

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

#### Approve Image of event - ADMIN

-   **Endpoint:** `/api/v1/admin/event/:id/:image_id`
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
                "isApproved": true,
                "image": "/public/images/event/images-1707094144399-680279258.jpg",
                "_id": "65c03080b7a80f70d64903fe"
            }
        ],
        "createdAt": "2024-02-05T00:49:04.417Z",
        "updatedAt": "2024-02-05T00:49:04.417Z"
    }
}
```

### Notification MODULE

#### Notification Creation - ADMIN

-   **Endpoint:** `/api/v1/notification/create`
-   **Method:** `POST`
-   **Authorization:** `Bearer token.....`

##### Request Body

```json
{
    "title": "This is title 3",
    "description": "This is description 3"
}
```

##### Expected Response

```json
{
    "status": "success",
    "message": {
        "_id": "65e07712905630b08555e0bf",
        "title": "This is title 2",
        "description": "This is description 2",
        "seenBy": [
            "65ddde614bba9a06e086271f",
            "65ddde614bba9a06e086271f",
            "65ddde614bba9a06e086271f",
            "65ddde614bba9a06e086271f"
        ],
        "createdAt": "2024-02-29T12:22:42.317Z",
        "updatedAt": "2024-02-29T12:32:24.034Z",
        "__v": 4
    }
}
```

#### Delete Notification - ADMIN

-   **Endpoint:** `/api/v1/notification/delete/:idOfNotification`
-   **Method:** `DELETE`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "message": "deleted successfully"
}
```

#### Get all notifications

-   **Endpoint:** `/api/v1/notification`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "message": [
        {
            "_id": "65e07712905630b08555e0bf",
            "title": "This is title 2",
            "description": "This is description 2",
            "seenBy": [
                "65ddde614bba9a06e086271f",
                "65ddde614bba9a06e086271f",
                "65ddde614bba9a06e086271f",
                "65ddde614bba9a06e086271f"
            ],
            "createdAt": "2024-02-29T12:22:42.317Z",
            "updatedAt": "2024-02-29T12:32:24.034Z",
            "__v": 4
        },
        {....}
    ]
}
```

#### Get Single notifications

-   **Endpoint:** `/api/v1/notification/:idOfNotification`
-   **Method:** `GET`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "message": {
        "_id": "65e07712905630b08555e0bf",
        "title": "This is title 2",
        "description": "This is description 2",
        "seenBy": ["65ddde614bba9a06e086271f"],
        "createdAt": "2024-02-29T12:22:42.317Z",
        "updatedAt": "2024-02-29T12:32:24.034Z",
        "__v": 4
    }
}
```

#### Make notification readed by user

-   **Endpoint:** `/api/v1/notification/:idOfNotification`
-   **Method:** `PATCH`
-   **Authorization:** `Bearer token.....`

##### Expected Response

```json
{
    "status": "success",
    "message": {
        "_id": "65e07712905630b08555e0bf",
        "title": "This is title 2",
        "description": "This is description 2",
        "seenBy": ["65ddde614bba9a06e086271f"],
        "createdAt": "2024-02-29T12:22:42.317Z",
        "updatedAt": "2024-02-29T12:32:24.034Z",
        "__v": 4
    }
}
```
