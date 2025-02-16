# web4

## Description

**web4** is a project developed using JavaScript that utilizes JWT tokens for authentication. It provides a series of endpoints for task management and user authentication.

## Features

- User registration and login with JWT authentication
- Task creation, retrieval, update, and deletion
- Secure endpoints with middleware authentication

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Nurkens/web4.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web4
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm start
   ```

_(Add any other necessary installation steps or prerequisites.)_

## Usage

To use this project, you can interact with the following endpoints:

### User Endpoints

- **Register**: `POST /register`

  ```json
  {
    "username": "yourusername",
    "password": "yourpassword"
  }
  ```

- **Login**: `POST /login`
  ```json
  {
    "username": "yourusername",
    "password": "yourpassword"
  }
  ```

### Task Endpoints (Protected by JWT Authentication)

- **Create Task**: `POST /create`

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Body:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description"
    }
    ```

- **Get All Tasks**: `GET /`

  - Headers: `Authorization: Bearer <your_jwt_token>`

- **Get Task by ID**: `GET /:id`

  - Headers: `Authorization: Bearer <your_jwt_token>`

- **Update Task**: `PUT /update/:id`

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Body:
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description"
    }
    ```

- **Delete Task**: `DELETE /delete/:id`
  - Headers: `Authorization: Bearer <your_jwt_token>`

## Contact

If you have any questions or feedback, feel free to reach out to me:

- GitHub: [Nurkens](https://github.com/Nurkens)
