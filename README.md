# KudoSpot

## Introduction

Welcome to the development of "Kudospot-application". KudoSpot is an employee engagement platform that promotes recognition and collaboration among employees. This platform enables team members to give "kudos" to their colleagues, fostering a positive and appreciative work environment. Here the backend service responsible for handling all kudos and user transaction-related routes. The frontend service contains the adding kudos, Bar charts and Tables. This document outlines the coding standards, project structure, and best practices to ensure a smooth development process...

## Table of Contents

1. [Installation](#installation)
2. [Features](#features)
3. [Deployment](#deployment)
4. [Project Structure](#project-structure)
5. [Coding Standards](#coding-standards)
6. [API Reference](#api-reference)
7. [Code Documentation](#code-documentation)
8. [Database Schema](#database-schema)
9. [Stored Email Address](#stored-email-address)
19. [Database Guidelines](#database-guidelines)
11. [Testing](#testing)
12. [Version Control](#version-control)
13. [Dependencies and Environment](#dependencies-and-environment)
14. [Technology Requirements](#technology-requirements)
15. [Conclusion](#conclusion)

## Installation

Provided step-by-step instructions on how to install and set up kudospot.

- Pre-requirements to run kudospot-application locally:

  - ## Clone Repository
    - To run backend serice Open terminal and run the command:
      
      ```shell
      npm install
      cd backend-service
      node server.js
      ```
    - To run frontend serice Open terminal and run the command:
      
      ```shell
      npm install
      cd kudospotUI
      npm start
      ```
    - To run frontend and backend at a time installation command:

      ```shell
      npm install concurrently --save-dev
      ```
    - run command:
      ```shell
      npm start
      ```
    - node version:
      ```shell
      v22.12.0
      ```
  - ## To build and start the service
    - Decrypt the `.env` file before constructing the service.

    - Build and start the service run the command:

      ```shell
      npm start
      ```

  ## Features
  - Interactive chart visualizations for kudos analytics.
  - User-friendly UI with support for form submission.
  - Displays the same data as the chart in a tabular format for easy reference.
  - Both the chart and table are populated dynamically from the backend.
  - Real-time updates for kudos activity and likes.

## Deployment
  - ### For Frontend:
    - build command:
    ```shell
      npm run build
      ```
  - ### For Backend:
    - build command:
    ```shell
    npm run build
    ```

## Project Structure for backend service

Ensure that the project follows a structured organization:

- `./src`: The main source code directory.(main source code files)
  - `./handlers`: Configuration files, getting data, update data functions
  
  - `./routes`: Route definitions for the API.(route definitions)

## Project Structure for frontend service

- `./src`: The main source code directory.(main source code files)
  - `./components`: Components files, cascading style sheets, functions, route calls, bar graph design


## Coding Standards

Adhere to the following coding standards to maintain consistency and readability:

- Use meaningful and camel-case variable names.
- Follow consistent coding style and indentation.
- Include command-line explanations for every block of code.
- Ensure that all code passes the eslint checks.
- Ensure components should be reusable.

## API Reference For Backend (backend-service)
Define API routes with a consistent structure:

- All routes should have `/<end-point-name>` with localhost url
- Existing Routes

  - [Kudospot](#kudos)
    - Post
      - [Add Kudos](#add-kudos)
    - Put
    - Get
      - [Get kudos data](#get-kudos-data)
      - [Check user existence](#check-user)
      - [Get Analytics data](#get-analytics-data)
      - [Audit Validation](#audit-validation)

### Kudospot

#### POST

- #### Add kudos data

  ```bash
  /add-kudos
  ```

  **Payload**
  - Body type: `Object`
  - Required:
  ```bash
  {
    "recipient": "Rahul",
    "badge": "Excellence",
    "message": "You have done a great job!",
    "createdOn": 2024-12-21T10:45:44.926+00:00
  }
  ```
  **Description**
  Employees can send kudos to colleagues with custom badges and personalized messages. 
  **Example response:**
  ```bash
  {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
  ````
#### PUT
#### GET

- #### Get kudos data

  ```bash
  /get-kudos-data
  ```
  **Response**
  ```bash
  [
    {
        "recipient": "Rohith",
        "message": "welldone",
        "badge": "work",
        "createdOn": "2024-12-21T10:20:08.748Z",
        "noOfLikes": 1,
        "userName": "Jhonny"
    },
    {
        "recipient": "Jhon",
        "message": "welldone",
        "badge": "Excellence",
        "createdOn": "2024-12-21T10:20:58.671Z",
        "userName": "Jhonny"
    },
    {
        "recipient": "Rahul",
        "badge": "Excellence",
        "message": "You did a great job in the project",
        "createdOn": "2024-12-21T10:45:44.926Z",
        "userName": "Rohith"
    },
    {
        "recipient": "Jay",
        "badge": "Helping Hand",
        "message": "Thanks for the help in the project",
        "createdOn": "2024-12-21T10:45:44.926Z",
        "noOfLikes": 2,
        "userName": "Rohith"
    }
  ]
  ````

- #### Check user existence

  ```bash
    /check-user
  ```

   **Params**

  | Parameter  | Type     | Description                         |
  | :--------  | :------- | :--------------------------------   |
  | `email`    | `string` | **Required**: email Id of the user  |

  **Description**

  When user trying to login, they will enter their `emailId`, that id should be exist in the `database`. If it is not there, user `can not able to login` into the kudos application page.

  **Response**
  ```bash
  {
    count: 1
  }
  ```

- #### Get Analytics data

  ```bash
  /get-analytics-data
  ```
  **Response**
  ```bash
  {
    "userData": [
        {
            "count": 1,
            "recipient": "Rahul"
        },
        {
            "count": 1,
            "recipient": "Jhon"
        },
        {
            "count": 1,
            "recipient": "Jay"
        },
        {
            "count": 1,
            "recipient": "Rohith"
        }
    ],
    "labels": [
        {
            "count": 1,
            "badge": "Rahul"
        },
        {
            "count": 1,
            "badge": "Jhon"
        },
        {
            "count": 1,
            "badge": "Jay"
        },
        {
            "count": 1,
            "badge": "Rohith"
        }
    ]
  }
    ```

## Code Documentation
Ensure thorough documentation for better understanding and maintainability:

- Include detailed comments for every block of code.
- Explain the purpose and functionality of each section.

## Database Schema
This section provides an overview of the database structure used in the KudoSpot application. It describes the key collections, their fields, and the relationships between them.

### Key Collections
 - KudosData
    - Purpose: Stores information about employee given kudos using the platform.
    - Fields
  ```bash
  _id: Unique identifier for each user (ObjectId).
  userName: Full name of the employee (String).
  addedKudos: Employee given kudos (Array of objects).
  addedKudos: [{
      recipient: For whom kudos given (String)
      badge: badge for the appreciation (String)
      message: message for why they wanted to give (String)
      createdOn: Timestamp when the user was added (Date).
      noOfLikes: number of likes this message received (Number).
  }]
  ``` 
- EmployeesData
    - Purpose: Stores information about employee using the platform.
    - Fields
  ```bash
  _id: Unique identifier for each user (ObjectId).
  name: Full name of the employee (String).
  employeeId: employeeId of the user
  designation: user designation
  email: Email address of the employee (String, unique).
  ``` 

- Consult with the database team or Technical Leads before making changes to the database schema.
- Implement proper CRUD operations in MongoDB.
- Be cautious about collection scans and optimize queries for performance.

## Stored Email Address
- Rohith@gmail.com
- Gabe@gmail.com
- Rahul@gmail.com
- Jay@gmail.com
- Shiva@gmail.com
- Krishna@gmail.com
  
## Database Guidelines
Follow these guidelines for efficient and secure database interactions:

- Consult with the database team or Technical Leads before making changes to the database schema.
- Implement proper CRUD operations in MongoDB.
- Be cautious about collection scans and optimize queries for performance.

## Testing
Ensure code reliability through comprehensive testing:

- Write unit tests, integration tests, and end-to-end tests.
- Verify that all test cases pass before committing changes.

## Version Control
Effectively manage code versions and collaboration
  
## Dependencies and Environment
Handle dependencies and environment variables systematically:

- Run `yarn install` after every `git pull`.
- Ensure proper decryption of environment variables `.env` and provide necessary credentials in the terminal.

## Technology Requirements
Developers should have a good understanding of the following technologies:

- MongoDB connection mechanisms.
- Basic CRUD operations in MongoDB.
- Hapi Rest API and Async API.
- ReactJs frontend library for building the user interface.
- ChartJs for rendering charts and analytics.
- CSS styling and layout.

## Conclusion
Kudospot! application aims to enhance employee engagement and foster a positive work environment by making it easy to share appreciation and track team contributions. The frontend is built to provide a seamless user experience, offering interactive charts, responsive design, and easy-to-use features.
<h2 align="center">
Happy Kudos giving! 👍
</h2>
