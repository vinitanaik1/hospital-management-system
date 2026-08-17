# Hospital Management System

A full-stack **Hospital Management System** developed using **React.js**, **Java Spring Boot**, **REST APIs**, and **MySQL**. The application provides an administrator dashboard for managing hospital records and operations.

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Fetch API
- React Hooks (`useState`, `useEffect`)
- npm

### Backend
- Java
- Spring Boot
- Spring MVC
- RESTful Web Services
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL
- MySQL Workbench

### Tools
- Eclipse IDE
- Visual Studio Code
- Git
- GitHub

## Features

### Admin Login
- Administrator username and password login
- Backend login API integration
- Login validation
- Error handling
- Admin session stored using browser local storage
- Logout functionality

### Dashboard
- Professional hospital-themed dashboard
- Sidebar navigation
- Administrator profile
- Hospital modules
- Responsive user interface

### Hospital Modules

- Patients
- Doctors
- Appointments
- Admissions
- Bills
- Departments
- Lab Tests
- Medicines
- Prescriptions
- Rooms
- Treatments

## Patient Management

Patient information includes:

- Patient ID
- Patient Name
- Age
- Gender
- Phone Number
- Address
- Blood Group
- Emergency Contact
- Medical History

Operations implemented:

- Add patient
- View patients
- Search by Patient ID
- Search by Patient Name
- Search by Phone Number
- Update patient
- Delete patient
- Input validation

### Patient APIs

```text
GET    /api/v1/patient/getAllPatients
POST   /api/v1/patient/savePatient
PUT    /api/v1/patient/updatePatient
DELETE /api/v1/patient/deletePatient/{id}
```

## Doctor Management

Doctor information includes:

- Doctor ID
- Doctor Name
- Specialization
- Qualification
- Phone Number
- Email
- Department ID

Operations implemented:

- Add doctor
- View doctors
- Search by Doctor ID
- Search by Doctor Name
- Search by Phone Number
- Update doctor
- Delete doctor
- Phone number validation
- Email validation

### Doctor APIs

```text
GET    /api/v1/doctor/getAllDoctors
POST   /api/v1/doctor/saveDoctor
PUT    /api/v1/doctor/updateDoctor
DELETE /api/v1/doctor/deleteDoctor/{id}
```

## Appointment Management

Appointment information includes:

- Appointment ID
- Patient ID
- Doctor ID
- Appointment Date
- Appointment Time
- Reason
- Status

Appointment statuses:

- Scheduled
- Confirmed
- Completed
- Cancelled

Operations implemented:

- Add appointment
- View appointments
- Search appointment by ID
- Update appointment
- Delete appointment

### Appointment APIs

```text
GET    /api/v1/appointment/getAllAppointments
POST   /api/v1/appointment/saveAppointment
PUT    /api/v1/appointment/updateAppointment
DELETE /api/v1/appointment/deleteAppointment/{id}
GET    /api/v1/appointment/searchAppointment/{id}
```

## Admin Login Credentials

Username: `admin`

Password: `admin123`

## REST API Integration

The React frontend communicates with the Spring Boot backend using the browser **Fetch API**.

The API base URL used by the frontend is:

```javascript
const API = "http://localhost:8083/api/v1";
```

Example:

```javascript
const response = await fetch(
  `${API}/patient/getAllPatients`
);
```

## Application Architecture

```text
React.js Frontend
       |
       | Fetch API / HTTP
       ↓
Spring Boot REST API
       |
       | Spring Data JPA
       ↓
Hibernate
       |
       ↓
MySQL Database
```

## CRUD Operations

The application uses standard REST operations:

| Operation | HTTP Method |
|---|---|
| Create | POST |
| Read | GET |
| Update | PUT |
| Delete | DELETE |

## Backend Structure

```text
src/main/java/
│
├── controller/
├── service/
├── repository/
├── entity/
└── ...
```

- **Controller** – Handles REST API requests
- **Service** – Handles application/business logic
- **Repository** – Handles database operations using Spring Data JPA
- **Entity** – Represents database tables

## Maven

The Spring Boot backend is a Maven project and uses:

```text
pom.xml
```

Maven is used for dependency management and building/running the backend application.

## Frontend Structure

```text
src/
│
├── assets/
│   ├── hospital-photo.jpeg
│   └── hospital-logo.jpeg
│
├── App.jsx
├── App.css
└── main.jsx
```

## Validation

The application includes validation for:

- Required fields
- Patient age between 1 and 120
- Ten-digit phone numbers
- Emergency contact numbers
- Email format
- Required Patient ID and Doctor ID for appointments
- Appointment date and time
- Appointment status

## Error Handling

The application displays messages for:

- Invalid username or password
- Backend connection failure
- Invalid input
- Failed API requests
- Failed save/update/delete operations
- Empty search results

## Running the Project

### Backend

Open the Spring Boot backend in Eclipse and run the application.

Backend URL:

```text
http://localhost:8083
```

### Frontend

Open the React project in VS Code.

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

## Application Flow

```text
Admin Login
     ↓
Dashboard
     ↓
Select Hospital Module
     ↓
React Component
     ↓
Fetch API Request
     ↓
Spring Boot REST Controller
     ↓
Service Layer
     ↓
Repository
     ↓
MySQL Database
     ↓
Response
     ↓
Updated UI
```

## Project Summary

The Hospital Management System is a full-stack web application that provides an administrator-focused interface for managing hospital information. It demonstrates integration between a React.js frontend, Spring Boot REST APIs, Spring Data JPA/Hibernate, and a MySQL database.

## Author

**Vinita Naik**
