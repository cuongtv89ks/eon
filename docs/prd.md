### **Employee Onboarding System Product Requirements Document (PRD)**

#### **Goals and Background Context**

##### **Goals**

*   Reduce the average employee onboarding time from 10 days to 5 days.
*   Achieve 100% compliance with all required document submissions.
*   Deliver a modern, intuitive, and user-friendly experience for both new hires and HR staff.
*   Successfully launch the MVP within the 4-month project timeline.
*   The user interface must be modern and productive, built with `shadcn` and `tailwindcss`.
*   The solution must be accessible via a responsive web application and native mobile applications (Android & iOS).
*   The web application must be self-hostable using Docker containers.

##### **Background Context**

The company's current onboarding process is a manual, fragmented system relying on paperwork and email. This inefficiency leads to a lengthy 10-day onboarding cycle, creates a disjointed and confusing experience for new hires, and introduces significant compliance risks.

This document outlines the requirements for a new, centralized Employee Onboarding Platform. The platform will automate workflows, provide a self-service portal for new hires (on both web and mobile), and integrate seamlessly with existing systems like Workday and Active Directory. The primary focus is to create a modern, efficient, and secure solution that improves the onboarding experience for everyone involved.

##### **Change Log**

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-08-19 | 1.0 | Initial draft of the PRD based on the approved Project Brief. | John, Product Manager |

#### **Requirements**

##### **Functional Requirements**

1.  **FR1:** The system shall allow authorized HR admins to log in and initiate the onboarding workflow for a new employee.
2.  **FR2:** The system shall provide HR admins with a dashboard to view and track the real-time progress of all new hires.
3.  **FR3:** New hires shall be able to securely register and log in to a self-service portal, available via a responsive web application and native mobile (iOS/Android) apps.
4.  **FR4:** The new hire portal shall display a clear, sequential checklist of all required onboarding tasks, including descriptions and due dates.
5.  **FR5:** New hires shall be able to securely upload documents (e.g., PDF, JPG, PNG) and submit data through forms within the portal.
6.  **FR6:** The system shall automatically trigger email notifications to relevant stakeholders (new hire, HR, IT) for key events, such as task assignment, reminders, and completion.
7.  **FR7:** The system shall integrate with Workday to automatically initiate an onboarding workflow when a new hire's profile is created in the HRMS.
8.  **FR8:** The system shall integrate with Active Directory to automatically provision a new user account upon the successful completion of all required onboarding tasks.

##### **Non-Functional Requirements**

1.  **NFR1:** The web application user interface shall be built using **React/Next.js**, **shadcn/ui**, and **Tailwind CSS**.
2.  **NFR2:** The mobile applications shall be developed for **iOS and Android** using a cross-platform framework like **React Native**.
3.  **NFR3:** The web application must be fully containerized using **Docker** to support self-hosting.
4.  **NFR4:** The system's architecture and data handling practices must be compliant with **GDPR and SOC 2** regulations.
5.  **NFR5:** All user-facing pages shall have a load time of less than 3 seconds on a standard broadband connection.
6.  **NFR6:** The system's APIs must have an average response time of less than 500ms under normal load.
7.  **NFR7:** All sensitive data, including user information and documents, must be encrypted both in transit (using TLS) and at rest.
8.  **NFR8:** The system shall enforce Role-Based Access Control (RBAC) to ensure users can only access data and functionality appropriate for their role.
9.  **NFR9:** The entire system must be fully testable in a local development environment prior to deployment. A comprehensive automated testing strategy, including unit, integration, and end-to-end (e2e) tests, must be implemented to ensure high code quality and test coverage.

#### **User Interface Design Goals**

##### **Overall UX Vision**

The user experience should be clean, modern, and exceptionally intuitive. The design will prioritize clarity and efficiency, guiding users through their tasks with minimal friction. The goal is to create a premium, consumer-grade feel that is both welcoming to new hires and a powerful, productive tool for HR professionals. The aesthetic will be minimalist and professional, leveraging the clean component design of `shadcn/ui` and the utility-first approach of `Tailwind CSS`.

##### **Key Interaction Paradigms**

*   **Dashboard-Centric (for HR):** The primary interaction for HR admins will be a central dashboard providing an at-a-glance, actionable overview of all new hires and their onboarding status.
*   **Checklist-Driven (for New Hires):** The new hire experience will be centered around a simple, clear, and visually engaging checklist that guides them through each step of the process.
*   **Mobile-First Responsiveness:** The design will be mobile-first to ensure a seamless and fully-featured experience on smartphones, tablets, and desktops.

##### **Core Screens and Views**

*   Login / Self-Registration Screen
*   HR Admin Dashboard (with new hire list and status)
*   New Hire Onboarding Checklist View
*   Secure Document Upload View
*   Digital Form Submission View
*   User Profile / Settings Page

##### **Accessibility: WCAG 2.1 AA**

The application will be designed to meet WCAG 2.1 Level AA standards to ensure it is accessible to users with disabilities.

##### **Branding**

The application will incorporate the provided FPT logo. The primary color palette will be derived from the logo, featuring:
*   **Primary:** Deep Blue
*   **Secondary:** Vibrant Orange
*   **Accent/Success:** Fresh Green
The overall design will be clean and professional, consistent with the FPT brand identity.

##### **Target Device and Platforms: Web Responsive & Cross-Platform Mobile**

The application will be a responsive web app that works on all modern browsers and will have dedicated, cross-platform mobile apps for both Android and iOS.

#### **Technical Assumptions**

##### **Repository Structure: Monorepo**

The project will be developed within a **Monorepo** (using a tool like Nx or Turborepo). This will allow us to manage the code for the web app, mobile app, and all backend services in a single repository, which is ideal for sharing code and streamlining development.

##### **Service Architecture: Microservices**

The backend will be designed using a **Microservices Architecture**. This means we will build small, independent services for different parts of the application (e.g., a service for user management, another for workflows). This approach will make the system more scalable, maintainable, and easier to update in the future.

##### **Testing Requirements: Comprehensive & Automated**

The project will include a comprehensive and automated testing strategy. This includes:
*   **Unit Tests:** To verify individual functions and components.
*   **Integration Tests:** To ensure that different parts of the system work together correctly.
*   **End-to-End (E2E) Tests:** To simulate real user scenarios from start to finish.
This strategy is essential for ensuring high quality and catching bugs early.

##### **Additional Technical Assumptions and Requests**

*   **Frontend (Web):** React (using the Next.js framework) with `shadcn/ui` and `Tailwind CSS`.
*   **Frontend (Mobile):** React Native for cross-platform (iOS & Android) development.
*   **Backend:** Node.js (with the NestJS framework) is the preferred choice for its performance and TypeScript support, aligning well with the frontend stack.
*   **Database:** PostgreSQL will be used for its robustness and data integrity.
*   **Deployment:** The web application will be delivered as a set of **Docker** containers for secure, self-hosting.

#### **Epic 1: Foundation & Core User Services**

**Goal:** The goal of this epic is to establish the complete technical foundation of the project. This includes setting up the monorepo, a basic CI/CD pipeline for automated testing, and the core backend services for user authentication and management. By the end of this epic, we will have a secure, functional API and a basic login interface for both web and mobile platforms, ready for future features to be built upon.

##### **Story 1.1: Project & CI/CD Setup**
*As a developer,*
*I want a monorepo with a basic CI/CD pipeline,*
*so that I can build, test, and deploy the application in an automated and consistent manner.*

**Acceptance Criteria:**
1.  A monorepo (using Nx or Turborepo) is created and configured in version control.
2.  A basic CI/CD pipeline is set up to automatically run unit tests on every commit.
3.  The pipeline can successfully build the initial shells for the web and mobile applications.
4.  A simple "health check" page for the web app can be automatically deployed to a development environment.

##### **Story 1.2: User Authentication Service**
*As a developer,*
*I want a user service with secure registration and login endpoints,*
*so that users can be securely created, authenticated, and managed.*

**Acceptance Criteria:**
1.  A `user` microservice is created with API endpoints for user registration (with securely hashed passwords) and login (returning a JWT token).
2.  The service is connected to the PostgreSQL database and can create and retrieve user records.
3.  API documentation (e.g., using Swagger/OpenAPI) is automatically generated for the endpoints.
4.  Unit tests are written for the registration and login logic, achieving at least 80% code coverage.

##### **Story 1.3: Web Application Login**
*As a new hire or HR admin,*
*I want a login screen in the web application,*
*so that I can securely access the platform.*

**Acceptance Criteria:**
1.  A login screen is created in the Next.js web app using `shadcn/ui` and `tailwindcss`, matching the FPT branding.
2.  The login form correctly calls the backend authentication service.
3.  On successful login, the user is redirected to a temporary, placeholder dashboard page.
4.  On failed login, a user-friendly error message is displayed.
5.  The JWT token is securely stored in the browser.

##### **Story 1.4: Mobile Application Login**
*As a new hire,*
*I want a login screen in the mobile application,*
*so that I can securely access the platform on my mobile device.*

**Acceptance Criteria:**
1.  A login screen is created in the React Native mobile app, matching the FPT branding.
2.  The login form correctly calls the backend authentication service.
3.  On successful login, the user is navigated to a temporary, placeholder dashboard screen.
4.  On failed login, a user-friendly error message is displayed.
5.  The JWT token is securely stored on the device.

#### **Epic 2: HR Admin Portal - Onboarding Management**

**Goal:** The goal of this epic is to build the core functionality of the HR Admin Portal. This will empower HR professionals to manage the employee onboarding process efficiently. By the end of this epic, an HR admin will be able to log in, view a dashboard of all new hires, initiate the onboarding process for a new employee, and track their progress through the various stages.

##### **Story 2.1: HR Dashboard & New Hire List**
*As an HR admin,*
*I want to see a dashboard with a list of all new hires and their current onboarding status,*
*so that I can quickly assess the overall progress of all onboarding activities.*

**Acceptance Criteria:**
1.  When an HR admin logs into the web app, they are directed to a dashboard page.
2.  The dashboard displays a table or list of all new hires, showing their Name, Start Date, and Onboarding Status (e.g., "Not Started," "In Progress," "Completed").
3.  The list of new hires can be sorted by each column (Name, Start Date, Status).
4.  The list can be searched by the new hire's name.
5.  The UI is clean, easy to read, and uses the FPT branding and `shadcn/ui` components.

##### **Story 2.2: Initiate Onboarding Workflow**
*As an HR admin,*
*I want to initiate the onboarding process for a new hire by entering their basic information,*
*so that the system can create their profile and assign the initial set of tasks.*

**Acceptance Criteria:**
1.  The HR dashboard contains a clear "Initiate Onboarding" button.
2.  Clicking the button opens a form/modal to enter the new hire's First Name, Last Name, Personal Email Address, and Start Date.
3.  Upon submission, a new hire record is created in the database with a status of "Not Started."
4.  The new hire immediately appears in the list on the HR dashboard.
5.  A welcome email is automatically sent to the new hire's personal email address with a link to register for the new hire portal.

##### **Story 2.3: View New Hire Details & Progress**
*As an HR admin,*
*I want to view the detailed progress of a specific new hire,*
*so that I can see which tasks are completed and which are still pending.*

**Acceptance Criteria:**
1.  Clicking on a new hire from the dashboard list navigates to a dedicated detail page for that employee.
2.  The detail page displays the new hire's basic information (Name, Email, Start Date).
3.  The page shows a checklist of all their assigned onboarding tasks and the status of each task (e.g., "Pending," "Submitted," "Approved").
4.  If a new hire has submitted a document, the HR admin can securely view it from this page.

#### **Epic 3: New Hire Portal - Task & Document Submission**

**Goal:** The goal of this epic is to build the complete self-service portal for the new hire on both web and mobile platforms. This is the primary interface for new employees, and it must be intuitive, welcoming, and efficient. By the end of this epic, a new hire will be able to register, log in, view their assigned tasks, upload required documents, and submit forms.

##### **Story 3.1: New Hire Account Registration**
*As a new hire who has received a welcome email,*
*I want to securely register for the portal using a unique link,*
*so that I can create my account and set my password.*

**Acceptance Criteria:**
1.  The welcome email contains a unique, single-use link to a registration page.
2.  The registration page prompts the new hire to create and confirm a secure password.
3.  Upon successful registration, the new hire is automatically logged into the portal.
4.  The new hire's status in the system is updated from "Not Started" to "In Progress."
5.  The registration link expires after its first use or after a configured time period (e.g., 7 days).

##### **Story 3.2: New Hire Dashboard & Task Checklist**
*As a new hire,*
*I want to see a clear checklist of all my onboarding tasks on my dashboard,*
*so that I know exactly what I need to do and by when.*

**Acceptance Criteria:**
1.  After logging in, the new hire is presented with a dashboard that prominently displays their onboarding task checklist.
2.  Each task in the list has a clear title, a short description, and a due date.
3.  The status of each task is clearly indicated (e.g., "To Do," "Completed").
4.  The dashboard is fully responsive and functional on both the web and the native mobile (iOS/Android) applications.

##### **Story 3.3: Document Upload Task**
*As a new hire,*
*I want to securely upload a required document, like a signed offer letter,*
*so that I can fulfill my pre-employment requirements.*

**Acceptance Criteria:**
1.  When a user clicks on a "document upload" task, a file upload interface is presented.
2.  The user can select a file (e.g., PDF, JPG, PNG) from their device's local storage.
3.  The file is securely uploaded and stored, associated with the new hire's profile.
4.  Upon successful upload, the corresponding task is marked as "Completed" on the checklist.
5.  This functionality works seamlessly on both web and mobile platforms.

##### **Story 3.4: Form Submission Task**
*As a new hire,*
*I want to fill out and submit a required form, like for my emergency contact information,*
*so that I can provide necessary information to the company.*

**Acceptance Criteria:**
1.  When a user clicks on a "form submission" task, a digital form with the required fields is displayed.
2.  The user can easily fill out and submit the form.
3.  Upon successful submission, the data is securely saved to the database.
4.  The corresponding task is marked as "Completed" on the checklist.
5.  This functionality works seamlessly on both web and mobile platforms.

#### **Epic 4: End-to-End Integration & Workflow Automation**

**Goal:** The goal of this epic is to connect all the components built in the previous epics and implement the key automation features that will deliver the core business value of the project. This includes integrating with Workday to automatically initiate onboarding, integrating with Active Directory to automatically provision user accounts, and implementing the notification engine. By the end of this epic, we will have a fully functional, end-to-end automated onboarding workflow.

##### **Story 4.1: Workday Integration for Automated Onboarding Initiation**
*As an HR admin,*
*I want the onboarding process to be automatically initiated in our system when a new hire is finalized in Workday,*
*so that I don't have to perform manual data entry.*

**Acceptance Criteria:**
1.  The system securely connects to a specified Workday API endpoint on a regular schedule (e.g., every hour).
2.  When a new hire record appears in Workday, a corresponding onboarding record is automatically created in our system.
3.  The manual "Initiate Onboarding" feature from Epic 2 is retained as a fallback, but the primary flow is automated.
4.  The system correctly maps required fields (Name, Email, Start Date) from the Workday API response.
5.  The automated creation of a new hire record triggers the welcome email, just as the manual process does.

##### **Story 4.2: Active Directory Integration for Automated User Provisioning**
*As an IT admin,*
*I want a new user account to be automatically created in Active Directory when a new hire completes their onboarding,*
*so that they have the necessary system access on day one without manual intervention.*

**Acceptance Criteria:**
1.  When a new hire's onboarding status changes to "Completed," a request is automatically sent to the Active Directory API to create a new user account.
2.  The user account is created with the correct information (name, email, etc.) from the onboarding system.
3.  The system logs the success or failure of the account creation for auditing purposes.
4.  Upon successful creation, an email notification is sent to the IT admin and the new hire's manager with the new account details.

##### **Story 4.3: Notification Engine for Key Workflow Events**
*As a new hire or HR admin,*
*I want to receive timely email notifications for key events in the onboarding process,*
*so that I am always aware of required actions and status changes.*

**Acceptance Criteria:**
1.  Email notifications are sent to new hires when a task is approaching its due date (e.g., 24 hours before).
2.  Email notifications are sent to HR admins when a new hire submits a document or form that requires review or approval.
3.  A final confirmation email is sent to all relevant stakeholders (new hire, HR, manager) upon the successful completion of the entire onboarding workflow.
4.  All email templates are professional, well-formatted, and consistent with the FPT brand.
