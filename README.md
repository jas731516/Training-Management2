# Training Management System (React)

## Overview
This is a simple Training Management web application built using React.
The application manages Subjects, Courses, Batches, and Students with basic validations and clean UI.

## Tech Stack
- React (Functional Components)
- React Hooks (useState)
- React Router DOM
- CSS (basic styling)

## Component Structure
src/
- App.js (Main state container and routing)
- components/
  - Dashboard.js (Shows total counts)
  - SubjectManagement.js (Add/Delete subjects)
  - CourseManagement.js (Create courses with subjects)
  - BatchManagement.js (Create batches with timing)
  - StudentManagement.js (Assign students to courses and batches)

## Features Implemented
- Subject management with validation
- Course creation with multiple subjects
- Batch creation with time validation
- Student assignment with dependent dropdowns
- Dashboard with total counts
- Basic routing using React Router

## Assumptions Made
- Data is stored in memory (no backend)
- Course requires minimum two subjects
- Batch must belong to one course
- Student must be linked to a valid course and batch
- Focus was on logic and validations rather than advanced UI

## How to Run Locally
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## Live Demo
Deployed using Netlify
