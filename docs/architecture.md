### **Employee Onboarding System Fullstack Architecture Document**

#### **Introduction**

This document outlines the complete fullstack architecture for the Employee Onboarding System, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

##### **Starter Template or Existing Project**
N/A - This is a Greenfield project. We will be building the architecture from the ground up based on the requirements in the PRD.

##### **Change Log**
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-08-19 | 1.0 | Initial draft of the Fullstack Architecture document. | Winston, Architect |

#### **High Level Architecture**

##### **Technical Summary**
The architecture will be a cloud-native system built on a **Microservices** pattern for the backend and a **Component-Based** pattern for the frontend. The production environment will be deployed on the **Google Cloud Platform (GCP)**, with services containerized using **Docker**. A parallel development/staging environment can be run on a local machine and exposed via a **Cloudflare Tunnel**. This provides a flexible development workflow while ensuring the production system is robust and secure.

##### **Platform and Infrastructure Choice**
*   **Primary Cloud Platform (Production):** **Google Cloud Platform (GCP)**
*   **Local Platform (Dev/Staging):** **Local PC with Docker** exposed via **Cloudflare Tunnel**.
*   **Key GCP Services:**
    *   **Google Kubernetes Engine (GKE):** To run our containerized backend microservices in production.
    *   **Google Cloud SQL:** To host our PostgreSQL database in production.
    *   **Google Cloud Storage:** For secure, scalable document storage.
    *   **Google Apigee or Cloud Endpoints:** To manage and secure our production APIs.
*   **Rationale:** GCP is a powerful and scalable platform with a world-class Kubernetes engine (GKE). For production, it meets all our security and reliability needs. The parallel local deployment model provides a cost-effective and flexible environment for development and pre-production testing.

##### **Repository Structure**
*   **Structure:** **Monorepo**
*   **Monorepo Tool:** **Nx** or **Turborepo**
*   **Package Organization:** We will use a standard monorepo layout with an `apps` folder containing the Next.js web app, the React Native mobile app, and each backend microservice. A `packages` folder will contain shared code, such as TypeScript types, UI components, and common utility functions.

##### **High Level Architecture Diagram (Detailed)**
```mermaid
graph TD
    subgraph "User Layer"
        U1[New Hire]
        U2[HR Admin]
    end

    subgraph "Presentation Layer"
        subgraph "Production (GCP)"
            LB[GCP Load Balancer] --> F_PROD[Frontend: Next.js on Cloud Run]
        end
        subgraph "Development (Local)"
            CFT[Cloudflare Tunnel] --> F_DEV[Frontend: Next.js via Docker]
        end
    end

    subgraph "API Gateway Layer"
        API_G_PROD[GCP API Gateway]
        API_G_DEV[API Gateway via Docker]
    end

    subgraph "Service Layer (Microservices on GKE / Docker)"
        S1[Auth Service]
        S2[Onboarding Service]
        S3[Document Service]
        S4[Notification Service]
    end

    subgraph "Data & Integration Layer"
        subgraph "Data Stores"
            DB[(PostgreSQL on Cloud SQL / Docker)]
            DS[Document Storage on GCS / Local FS]
        end
        subgraph "External APIs"
            E1[Workday API]
            E2[Active Directory API]
        end
    end

    U1 --> F_PROD & F_DEV
    U2 --> F_PROD & F_DEV

    F_PROD --> API_G_PROD
    F_DEV --> API_G_DEV

    API_G_PROD & API_G_DEV --> S1
    API_G_PROD & API_G_DEV --> S2
    API_G_PROD & API_G_DEV --> S3
    
    S2 --> S4

    S1 --> DB
    S2 --> DB
    S3 --> DS
    
    S2 --> E1
    S2 --> E2
```

##### **Architectural Patterns**
*   **Microservices:** The backend will be composed of small, independent services (e.g., Auth Service, Onboarding Service).
    *   *Rationale:* This improves scalability and fault isolation, and allows for independent development and deployment of services.
*   **Component-Based UI:** The frontend applications will be built as a collection of reusable, self-contained components.
    *   *Rationale:* This promotes code reuse, maintainability, and a consistent look and feel across the web and mobile apps.
*   **API Gateway:** A single, managed entry point for all API calls from the frontend clients.
    *   *Rationale:* This centralizes cross-cutting concerns like authentication, rate limiting, and logging, simplifying the microservices themselves.
*   **Infrastructure as Code (IaC):** The AWS infrastructure will be defined and managed using a tool like Terraform or AWS CDK.
    *   *Rationale:* This ensures our infrastructure is repeatable, version-controlled, and can be deployed automatically.

#### **Tech Stack**

##### **Technology Stack Table**
| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| Frontend Language | TypeScript | 5.x | Type safety, developer experience | Industry standard for robust, maintainable JavaScript applications. |
| Frontend Framework | Next.js (Web), React Native (Mobile) | Latest | UI, routing, server-side rendering | Next.js provides a best-in-class React experience. React Native allows for cross-platform mobile development. |
| UI Component Library | shadcn/ui | Latest | UI components | A modern, accessible, and customizable component library that works perfectly with Tailwind CSS. |
| State Management | Zustand | 4.x | Frontend state management | A simple, powerful, and unopinionated state management solution that is less boilerplate-heavy than Redux. |
| Backend Language | TypeScript | 5.x | API development, business logic | Consistency with the frontend stack, providing end-to-end type safety. |
| Backend Framework | NestJS | 10.x | Structuring the backend API | A progressive Node.js framework that provides a robust, modular architecture for building scalable microservices. |
| API Style | REST | N/A | Client-server communication | A well-understood, standard approach for APIs. We will use OpenAPI for documentation. |
| Database | PostgreSQL | 15.x | Primary data storage | A powerful, reliable, and open-source relational database that is excellent for handling structured data. |
| Cache | Redis | 7.x | Caching, session management | An in-memory data store that can be used for caching frequently accessed data and managing user sessions. |
| File Storage | Google Cloud Storage / Local FS | N/A | Storing uploaded documents | GCS for production provides a secure, scalable solution. Local filesystem for local development. |
| Authentication | JWT (JSON Web Tokens) | N/A | Securing API endpoints | A standard, stateless method for handling user authentication in a microservices architecture. |
| Frontend Testing | Jest, React Testing Library | Latest | Unit and component testing | The standard for testing React applications, focusing on user-centric testing. |
| Backend Testing | Jest, Supertest | Latest | Unit and API testing | Jest for unit tests and Supertest for testing our REST API endpoints. |
| E2E Testing | Cypress | Latest | End-to-end testing | A modern, all-in-one testing framework for testing the application from the user's perspective. |
| Build Tool | Nx | Latest | Monorepo management | A powerful build system for managing and orchestrating tasks within our monorepo. |
| IaC Tool | Terraform | 1.x | Infrastructure as Code | The industry standard for defining and managing cloud infrastructure as code. |
| CI/CD | GitHub Actions | N/A | Continuous integration & deployment | Natively integrated with our source code repository, providing a powerful and flexible CI/CD platform. |
| Monitoring | Google Cloud Operations / Prometheus | N/A | Application monitoring | Google Cloud Operations for production. Prometheus/Grafana for local/open-source monitoring. |
| Logging | Google Cloud Logging / Winston | N/A | Application logging | Google Cloud Logging for production. Winston for flexible, local logging. |
| CSS Framework | Tailwind CSS | 3.x | Styling | A utility-first CSS framework that allows for rapid and consistent UI development. |

#### **Data Models**

##### **Model: User**

**Purpose:** To represent any individual who interacts with the system, including New Hires and HR Admins. This model will store authentication details and basic profile information.

**Key Attributes:**
*   `id`: `string` (UUID) - The unique identifier for the user.
*   `email`: `string` - The user's unique email address, used for login.
*   `passwordHash`: `string` - The securely hashed password for the user.
*   `firstName`: `string` - The user's first name.
*   `lastName`: `string` - The user's last name.
*   `role`: `enum` ('NEW_HIRE', 'HR_ADMIN') - The user's role, which controls their permissions.
*   `createdAt`: `Date` - Timestamp of when the user record was created.
*   `updatedAt`: `Date` - Timestamp of the last update to the user record.

**TypeScript Interface:**
```typescript
export enum UserRole {
  NEW_HIRE = 'NEW_HIRE',
  HR_ADMIN = 'HR_ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
*   A `User` with the `NEW_HIRE` role will be associated with one `OnboardingWorkflow`.
*   A `User` with the `HR_ADMIN` role can initiate many `OnboardingWorkflow`s.

##### **Model: OnboardingWorkflow**

**Purpose:** To represent the end-to-end onboarding process for a single new hire. It tracks the overall status and serves as the parent for all associated tasks.

**Key Attributes:**
*   `id`: `string` (UUID) - The unique identifier for this specific onboarding instance.
*   `newHireId`: `string` - A foreign key that links to the `User` record of the new hire.
*   `initiatedById`: `string` - A foreign key that links to the `User` record of the HR admin who started the process.
*   `status`: `enum` ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED') - The overall status of the onboarding workflow.
*   `hireStartDate`: `Date` - The new hire's official start date.
*   `completionDate`: `Date | null` - The timestamp of when the workflow's status was moved to 'COMPLETED'.
*   `createdAt`: `Date` - Timestamp of when the workflow was created.
*   `updatedAt`: `Date` - Timestamp of the last update to the workflow.

**TypeScript Interface:**
```typescript
export enum WorkflowStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface OnboardingWorkflow {
  id: string;
  newHireId: string; // Foreign Key to User
  initiatedById: string; // Foreign Key to User
  status: WorkflowStatus;
  hireStartDate: Date;
  completionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
*   Belongs to one `User` (the `newHireId`).
*   Is initiated by one `User` (the `initiatedById`).
*   Has many `OnboardingTask`s (which we will define next).

##### **Model: OnboardingTask**

**Purpose:** To represent a single, atomic task that a new hire must complete as part of their onboarding workflow (e.g., "Upload your ID," "Sign the NDA").

**Key Attributes:**
*   `id`: `string` (UUID) - The unique identifier for the task.
*   `workflowId`: `string` - A foreign key that links this task to its parent `OnboardingWorkflow`.
*   `title`: `string` - The display name of the task (e.g., "Upload Signed Offer Letter").
*   `description`: `string` - A brief description of what the task requires.
*   `type`: `enum` ('DOCUMENT_UPLOAD', 'FORM_SUBMISSION', 'READ_AND_ACKNOWLEDGE') - The type of action the user needs to perform.
*   `status`: `enum` ('PENDING', 'COMPLETED') - The status of this individual task.
*   `dueDate`: `Date` - The date the task should be completed by.
*   `completedAt`: `Date | null` - The timestamp of when the task was completed.
*   `taskData`: `JSON | null` - A flexible field to store data related to the task's completion, such as the ID of a submitted document or the values from a submitted form.

**TypeScript Interface:**
```typescript
export enum TaskType {
  DOCUMENT_UPLOAD = 'DOCUMENT_UPLOAD',
  FORM_SUBMISSION = 'FORM_SUBMISSION',
  READ_AND_ACKNOWLEDGE = 'READ_AND_ACKNOWLEDGE',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface OnboardingTask {
  id: string;
  workflowId: string; // Foreign Key to OnboardingWorkflow
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  dueDate: Date;
  completedAt: Date | null;
  taskData?: Record<string, any> | null; // e.g., { documentId: '...' } or { formValues: {...} }
}
```

**Relationships:**
*   Belongs to one `OnboardingWorkflow`.
*   May be associated with one `Document` (if `type` is `DOCUMENT_UPLOAD`).

##### **Model: Document**

**Purpose:** To store metadata about a specific file that has been uploaded by a new hire to fulfill a task.

**Key Attributes:**
*   `id`: `string` (UUID) - The unique identifier for this document record.
*   `uploaderId`: `string` - A foreign key that links to the `User` who uploaded the file.
*   `onboardingTaskId`: `string` - A foreign key that links to the `OnboardingTask` this document is associated with.
*   `originalFileName`: `string` - The original name of the uploaded file (e.g., "offer_letter_signed.pdf").
*   `fileType`: `string` - The MIME type of the file (e.g., "application/pdf").
*   `fileSizeInBytes`: `number` - The size of the file in bytes.
*   `storagePath`: `string` - The unique path or key where the file is stored in our file storage system (e.g., Google Cloud Storage).
*   `createdAt`: `Date` - The timestamp of when the document was uploaded.

**TypeScript Interface:**
```typescript
export interface Document {
  id: string;
  uploaderId: string; // Foreign Key to User
  onboardingTaskId: string; // Foreign Key to OnboardingTask
  originalFileName: string;
  fileType: string;
  fileSizeInBytes: number;
  storagePath: string;
  createdAt: Date;
}
```

**Relationships:**
*   Is uploaded by one `User`.
*   Belongs to one `OnboardingTask`.

#### **API Specification**

##### **REST API Specification (OpenAPI 3.0)**

```yaml
openapi: 3.0.0
info:
  title: Employee Onboarding API
  version: 1.0.0
  description: API for the Employee Onboarding System.
servers:
  - url: /api/v1
    description: API Version 1

paths:
  /auth/login:
    post:
      summary: Authenticate a user
      description: Takes user credentials and returns a JWT token upon successful authentication.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
      responses:
        '200':
          description: Authentication successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
        '401':
          description: Unauthorized
          
  /onboarding/workflows:
    get:
      summary: Get all onboarding workflows (HR Admin)
      description: Returns a list of all onboarding workflows, intended for the HR Admin dashboard.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: A list of workflows.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OnboardingWorkflow'
components:
  schemas:
    OnboardingWorkflow:
      type: object
      properties:
        id:
          type: string
          format: uuid
        status:
          type: string
          enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
        # ... other properties from our data model
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

#### **Components**

##### **Component: Frontend Applications (Web & Mobile)**

**Responsibility:** This component is responsible for rendering the entire user interface and managing the user experience. Its duties include displaying data, capturing user input, managing local UI state (like open modals or form data), and communicating with the backend via the API Gateway.

**Key Interfaces:**
*   **User Interface (UI):** Renders the visual screens, components, and controls for both the New Hire and HR Admin portals.
*   **API Client:** A dedicated service layer that handles all communication with the backend via the API Gateway.

**Dependencies:**
*   Depends on the **API Gateway** for all data and business logic.
*   Depends on the shared **`packages/types`** for data model definitions.
*   Depends on the shared **`packages/ui`** for common, reusable UI components.

**Technology Stack:**
*   **Web:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Zustand.
*   **Mobile:** React Native, TypeScript.

##### **Component: API Gateway**

**Responsibility:** To act as the single, unified entry point for all incoming requests from the frontend applications (both web and mobile). It is responsible for routing requests to the appropriate downstream microservice. It will also handle critical cross-cutting concerns, including authenticating requests, enforcing rate limits, and logging all incoming traffic.

**Key Interfaces:**
*   **Public REST API:** Exposes the public-facing API endpoints (as defined in our OpenAPI specification) to the frontend clients.
*   **Service Router:** An internal routing map that directs each incoming request to the correct backend microservice (e.g., a request to `/api/v1/auth/login` is routed to the Auth Service).

**Dependencies:**
*   Depends on all backend microservices (Auth, Onboarding, Document, Notification) to fulfill requests.

**Technology Stack:**
*   **Production (GCP):** **Google Cloud API Gateway**.
*   **Local (Docker):** A lightweight Node.js-based gateway, such as **Express Gateway**.

##### **Component: Auth Service**

**Responsibility:** This is a specialized microservice responsible for all user authentication and identity management. Its sole purpose is to handle user registration, verify credentials for login, issue JSON Web Tokens (JWTs), and manage password-related flows (e.g., forgot/reset password). It is the single source of truth for user identity.

**Key Interfaces:**
*   **Internal REST API:** Exposes endpoints like `POST /register`, `POST /login`, and `POST /reset-password` to be called by the API Gateway.
*   **JWT Issuer:** Creates and signs the secure JWTs that are returned to the user upon successful login.

**Dependencies:**
*   Depends on the **PostgreSQL Database** to access the `Users` table for creating users and verifying credentials.

**Technology Stack:**
*   Node.js, NestJS, TypeScript, and a PostgreSQL client library (e.g., `pg`).

##### **Component: Onboarding Service**

**Responsibility:** This service is the brain of the operation. It is responsible for managing the entire onboarding lifecycle. This includes creating and tracking `OnboardingWorkflow`s, managing the state of individual `OnboardingTask`s, and orchestrating all interactions with external systems like Workday and Active Directory.

**Key Interfaces:**
*   **Internal REST API:** Exposes endpoints for managing workflows and tasks (e.g., `GET /workflows`, `POST /workflows`, `GET /workflows/{id}/tasks`) to be called by the API Gateway.

**Dependencies:**
*   Depends on the **PostgreSQL Database** to manage `OnboardingWorkflow` and `OnboardingTask` records.
*   Depends on the **Notification Service** to trigger emails for events like welcome messages and task reminders.
*   Depends on the **Document Service** to link uploaded documents to their corresponding tasks.
*   Depends on the external **Workday API** to fetch new hire data.
*   Depends on the external **Active Directory API** to provision new user accounts.

**Technology Stack:**
*   Node.js, NestJS, TypeScript, and a PostgreSQL client library.

##### **Component: Document Service**

**Responsibility:** This is a specialized microservice responsible for all aspects of file management. Its duties include securely receiving file uploads, streaming them to the permanent file storage backend (Google Cloud Storage for production), and creating and retrieving the corresponding `Document` metadata records in the database.

**Key Interfaces:**
*   **Internal REST API:** Exposes endpoints for document management (e.g., `POST /documents` to upload a new file, `GET /documents/{id}` to get a secure, temporary download link).

**Dependencies:**
*   Depends on the **PostgreSQL Database** to manage the `Document` metadata records.
*   Depends on the **Google Cloud Storage** service (for production) or the local filesystem (for development) to store the actual file bytes.

**Technology Stack:**
*   Node.js, NestJS, TypeScript, a PostgreSQL client library, and the Google Cloud Storage client library.

##### **Component: Notification Service**

**Responsibility:** This service is responsible for sending all user-facing communications, starting with email. It will manage email templates for different notification types (e.g., "Welcome Email," "Task Reminder") and will integrate with a third-party transactional email provider to ensure high deliverability.

**Key Interfaces:**
*   **Internal API:** Exposes a simple, asynchronous endpoint like `POST /send-notification`. Other services will call this endpoint to request that a notification be sent, without needing to know the details of how the email is constructed or delivered.

**Dependencies:**
*   Depends on an external **Transactional Email Provider** (e.g., SendGrid, Postmark, Amazon SES) to handle the actual sending of emails.

**Technology Stack:**
*   Node.js, NestJS, TypeScript, and the client library for the chosen email provider.

#### **External APIs**

##### **Workday API**

*   **Purpose:** To automatically fetch new hire data from the client's Human Resource Management System (HRMS) to initiate the onboarding process in our system. This is a read-only integration for the MVP.
*   **Documentation:** [Placeholder - Client to provide URL to their specific Workday API documentation]
*   **Base URL(s):** [Placeholder - Client to provide the base URL for their Workday tenant]
*   **Authentication:** Assumed to be **OAuth 2.0** or a similar token-based system. [To be confirmed during the technical spike].
*   **Rate Limits:** To be investigated during the technical spike. We must ensure our polling frequency does not exceed any API limits.

**Key Endpoints Used:**
*   `GET /users` (or a similar endpoint like `/reports/new_hires`): Will be used to retrieve a list of new hires created since the last check.

**Integration Notes:** This is a critical integration for automating the start of the workflow. The stability, performance, and quality of this API's documentation are a key project risk. A dedicated technical spike is planned to validate all assumptions about this integration before development begins.

##### **Active Directory API**

*   **Purpose:** To automatically provision a new user account in the client's IT system when a new hire successfully completes their onboarding workflow. This is a write-only integration for the MVP.
*   **Documentation:** [Placeholder - Client to provide URL or reference to their AD API documentation, likely the Microsoft Graph API]
*   **Base URL(s):** [Placeholder - Client to provide the endpoint for their Active Directory instance]
*   **Authentication:** Assumed to be **OAuth 2.0** using a service principal (service account) with the necessary permissions to create users. [To be confirmed during the technical spike].
*   **Rate Limits:** To be investigated during the technical spike.

**Key Endpoints Used:**
*   `POST /users`: Will be used to create a new user account, passing the required attributes (e.g., name, email, department) from our system.

**Integration Notes:** This integration is the critical final step in the automated workflow. The `Onboarding Service` will be responsible for calling this API. We must work closely with the client's IT team to get the required permissions and to understand the exact payload required to create a user account correctly. This will be a key focus of the technical spike.

#### **Core Workflows**

##### **Sequence Diagram: New Hire Onboarding**
```mermaid
sequenceDiagram
    participant NH as New Hire
    participant FE as Frontend (Web/Mobile)
    participant API_GW as API Gateway
    participant OnboardingSvc as Onboarding Service
    participant AuthSvc as Auth Service
    participant NotifSvc as Notification Service

    OnboardingSvc->>NotifSvc: Trigger Welcome Email
    NotifSvc-->>NH: Sends Email w/ Reg Link

    NH->>FE: Clicks Reg Link, Submits Password
    FE->>API_GW: POST /auth/register
    API_GW->>AuthSvc: register(userData)
    AuthSvc-->>API_GW: returns { jwt }
    API_GW-->>FE: returns { jwt }
    FE->>FE: Store JWT

    NH->>FE: Views Onboarding Dashboard
    FE->>API_GW: GET /onboarding/tasks
    API_GW->>OnboardingSvc: getTasks(userId)
    OnboardingSvc-->>API_GW: returns [tasks]
    API_GW-->>FE: returns [tasks]
    FE-->>NH: Displays Task List

    NH->>FE: Uploads a Document
    FE->>API_GW: POST /onboarding/documents
    API_GW->>OnboardingSvc: processDocument(file)
    OnboardingSvc-->>API_GW: returns { success: true }
    API_GW-->>FE: returns { success: true }
    FE-->>NH: Shows Task as Complete
```

#### **Database Schema**

```sql
-- Users Table: Stores login and profile information for all users.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('NEW_HIRE', 'HR_ADMIN')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Workflows Table: Tracks the overall process for each new hire.
CREATE TABLE onboarding_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    new_hire_id UUID NOT NULL REFERENCES users(id),
    initiated_by_id UUID NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED')),
    hire_start_date DATE NOT NULL,
    completion_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Onboarding Tasks Table: Stores individual tasks within a workflow.
CREATE TABLE onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES onboarding_workflows(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('DOCUMENT_UPLOAD', 'FORM_SUBMISSION', 'READ_AND_ACKNOWLEDGE')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'COMPLETED')),
    due_date DATE,
    completed_at TIMESTAMPTZ,
    task_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Documents Table: Stores metadata for uploaded files.
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uploader_id UUID NOT NULL REFERENCES users(id),
    onboarding_task_id UUID NOT NULL REFERENCES onboarding_tasks(id),
    original_file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size_in_bytes BIGINT NOT NULL,
    storage_path VARCHAR(1024) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_workflows_on_new_hire_id ON onboarding_workflows(new_hire_id);
CREATE INDEX idx_tasks_on_workflow_id ON onboarding_tasks(workflow_id);
```

#### **Frontend Architecture**

##### **Component Architecture**
*   **Component Organization:** We will use a feature-based directory structure. Code related to a specific feature (e.g., `onboarding`, `admin-dashboard`) will be co-located. Truly reusable, generic components (like a styled `Button` or `Card`) will live in a shared `packages/ui` directory within the monorepo.
    ```
    apps/web/src/features/
    ├── admin-dashboard/
    │   ├── components/
    │   └── useDashboardData.ts
    └── onboarding-checklist/
        ├── components/
        └── useOnboardingTasks.ts
    ```
*   **Component Template:** All components will be written as TypeScript functional components using React Hooks.

##### **State Management Architecture**
*   **State Management Solution:** We will use **Zustand**.
*   **State Structure:** We will create multiple small, independent "stores," each responsible for a specific domain of state (e.g., `useAuthStore` for user and token information, `useOnboardingStore` for tasks). This avoids a single, monolithic global state and makes the application easier to manage.
*   **State Management Patterns:** UI components will use hooks (`useAuthStore()`) to subscribe to state changes. Actions to modify state will be encapsulated within the stores themselves.

##### **Routing Architecture**
*   **Routing Solution:** We will use the built-in **App Router** from Next.js.
*   **Route Organization:** Routes will be defined by the directory structure within the `apps/web/src/app` directory, following Next.js conventions.
*   **Protected Route Pattern:** A middleware function (`middleware.ts`) will be used to protect routes. It will check for a valid JWT on incoming requests to protected pages and redirect to the login screen if the user is not authenticated.

##### **Frontend Services Layer**
*   **API Client Setup:** We will create a singleton `axios` instance that will be used for all API communication. This instance will be configured with an interceptor to automatically:
    1.  Add the JWT `Authorization` header to all outgoing requests.
    2.  Handle global 401 (Unauthorized) errors by redirecting the user to the login page.
*   **Service Example:** We will create dedicated service files (e.g., `onboarding.service.ts`) that encapsulate all API calls for a specific feature, keeping our UI components clean of data-fetching logic.

#### **Backend Architecture**

##### **Service Architecture (for each Microservice)**
*   **Organization:** We will use the standard, modular architecture provided by the **NestJS framework**. Each microservice will be organized into modules based on its primary resource (e.g., `UsersModule`, `WorkflowsModule`). Each module will contain:
    *   A **Controller:** To define API routes and handle incoming HTTP requests.
    *   A **Service:** To contain the core business logic.
    *   A **Repository:** To handle all communication with the database.
*   **Controller Template:** We will use standard NestJS controllers with decorators (`@Get()`, `@Post()`, etc.) to define routes and dependency injection to bring in the required services.

##### **Database Architecture**
*   **Schema Management:** The database schema will be managed through a dedicated migration tool like **`node-pg-migrate`**. The SQL schema we defined earlier will be the first migration file. This ensures all schema changes are version-controlled and repeatable.
*   **Data Access Layer:** We will implement the **Repository Pattern**. Each microservice will have repositories (e.g., `UsersRepository`, `WorkflowsRepository`) that encapsulate all database query logic. For type-safe query building, we will use a modern tool like **`Kysely`**. This abstracts the business logic from the database, making our code much easier to test and maintain.

##### **Authentication and Authorization**
*   **Authentication Flow:** The API Gateway will be responsible for validating the JWT on every request to a protected endpoint. It will act as a gatekeeper, checking for a valid token before forwarding the request to a backend microservice. The microservices themselves will be stateless and will trust the validated request from the gateway.
*   **Authorization (Permissions):** Within each NestJS microservice, we will use **Guards**. For example, a `RolesGuard` will be used to protect specific endpoints, ensuring that only users with the required role (e.g., `HR_ADMIN`) can access them. This provides a declarative and reusable way to handle permissions.

#### **Unified Project Structure**

```plaintext
employee-onboarding/
├── .github/                    # CI/CD workflows (e.g., GitHub Actions)
│   └── workflows/
│       └── ci.yaml
├── apps/                       # Runnable applications
│   ├── web/                    # The Next.js web application
│   │   └── ...
│   ├── mobile/                 # The React Native mobile application
│   │   └── ...
│   └── services/               # Backend microservices
│       ├── auth-service/
│       ├── onboarding-service/
│       ├── document-service/
│       └── notification-service/
├── packages/                   # Shared libraries and utilities
│   ├── ui/                     # Shared React components (for web & mobile)
│   ├── types/                  # Shared TypeScript types (data models, API schemas)
│   └── config/                 # Shared configurations (ESLint, TypeScript, etc.)
├── infrastructure/             # Infrastructure as Code (Terraform)
│   ├── gcp/
│   └── local/
├── docs/                       # Project documentation
│   ├── prd.md
│   ├── front-end-spec.md
│   └── architecture.md
├── .env.example                # Template for environment variables
├── package.json                # Root package.json for the monorepo
└── nx.json                     # Nx monorepo configuration file
```

#### **Development Workflow**

##### **Local Development Setup**

*   **Prerequisites:**
    ```bash
    # Ensure you have Node.js (v18+), pnpm, and Docker installed.
    # pnpm is a fast, disk space-efficient package manager for monorepos.
    node -v
    pnpm -v
    docker -v
    ```

*   **Initial Setup:**
    ```bash
    # 1. Clone the repository
    git clone <repository_url>
    cd employee-onboarding

    # 2. Install all dependencies for all apps and packages
    pnpm install

    # 3. Copy the environment variable template
    cp .env.example .env

    # 4. Start the local database and other services (e.g., Redis)
    # This will run the services defined in the local docker-compose.yml file.
    docker-compose up -d
    ```

*   **Development Commands (run from the root of the monorepo):**
    ```bash
    # Start all applications (web, mobile, all services) in development mode
    pnpm dev

    # Start only the web application
    pnpm dev:web

    # Start only a specific microservice (e.g., auth-service)
    pnpm dev --filter=auth-service

    # Run all tests across the entire project
    pnpm test

    # Run tests for a specific application (e.g., web)
    pnpm test:web
    ```

##### **Environment Configuration**

*   **Required Environment Variables (to be added to the `.env` file):**
    ```bash
    # Backend Environment Variables
    DATABASE_URL="postgresql://user:password@localhost:5432/onboarding_db"
    JWT_SECRET="a-very-secret-key-for-local-dev-only"
    # API keys for external services (to be provided by the client)
    WORKDAY_API_KEY="your-workday-api-key"
    AD_CLIENT_SECRET="your-ad-client-secret"

    # Frontend Environment Variables (for apps/web/.env.local)
    NEXT_PUBLIC_API_BASE_URL="http://localhost:3333/api/v1" # Assuming local API Gateway runs on 3333
    ```

#### **Deployment Architecture**

##### **Deployment Strategy**

*   **Frontend Deployment (Web App):**
    *   **Platform:** **Google Cloud Run**. This is a serverless platform perfect for hosting our Next.js application, as it automatically scales with traffic.
    *   **Build Command:** `pnpm build:web`
    *   **CDN/Edge:** **Google Cloud CDN** will be configured in front of Cloud Run to cache static assets and provide faster global delivery.

*   **Backend Deployment (Microservices):**
    *   **Platform:** **Google Kubernetes Engine (GKE)**. This provides a robust, scalable environment for running our containerized microservices.
    *   **Build Method:** In our CI/CD pipeline, each microservice will be built into a separate Docker image.
    *   **Deployment Method:** We will use Kubernetes manifest files (YAML) to define the deployments, services, and ingress rules for each microservice. These will be applied to the GKE cluster using `kubectl`.

##### **CI/CD Pipeline (GitHub Actions)**
```yaml
# This is a simplified representation of the CI/CD workflow
name: CI/CD Pipeline

on:
  push:
    branches:
      - main     # Pushing to main deploys to Production
      - develop  # Pushing to develop deploys to Staging

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      - name: Run all tests
        run: pnpm test

  deploy_staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      # ... steps to authenticate with GCP
      # ... steps to build and push Docker images to Google Container Registry
      # ... steps to apply Kubernetes manifests to the Staging GKE cluster
      # ... steps to deploy the frontend to the Staging Cloud Run environment

  deploy_production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      # ... steps to authenticate with GCP
      # ... steps to build and push Docker images to Google Container Registry
      # ... steps to apply Kubernetes manifests to the Production GKE cluster
      # ... steps to deploy the frontend to the Production Cloud Run environment
```

##### **Environments**
| Environment | Frontend URL | Backend URL | Purpose |
| :--- | :--- | :--- | :--- |
| Development | `http://localhost:3889` | `http://localhost:3333/api/v1` | For local development by the team. |
| Staging | `staging.onboarding.fpt.com` | `api.staging.onboarding.fpt.com` | For pre-production testing and UAT. |
| Production | `onboarding.fpt.com` | `api.onboarding.fpt.com` | The live environment for end-users. |

#### **Security and Performance**

##### **Security Requirements**

*   **Frontend Security:**
    *   **Content Security Policy (CSP):** A strict CSP will be implemented to mitigate cross-site scripting (XSS) and other injection attacks.
    *   **Secure Storage:** JWTs will be stored in secure, `HttpOnly` cookies to prevent them from being accessed by client-side scripts.

*   **Backend Security:**
    *   **Input Validation:** All incoming data from clients will be strictly validated using NestJS Validation Pipes to prevent common injection attacks.
    *   **Rate Limiting:** The API Gateway will be configured with rate limiting to protect against denial-of-service and brute-force attacks.
    *   **CORS Policy:** A strict Cross-Origin Resource Sharing (CORS) policy will be configured to ensure the API only accepts requests from our authorized frontend domains.

*   **Authentication Security:**
    *   **Token Strategy:** We will use short-lived access tokens (e.g., 15 minutes) and long-lived, securely stored refresh tokens to manage user sessions.
    *   **Password Policy:** The system will enforce a strong password policy (e.g., minimum length, complexity) during user registration.

##### **Performance Optimization**

*   **Frontend Performance:**
    *   **Bundle Size:** The initial JavaScript bundle size for the main page will be kept under 250KB. We will use modern techniques like code-splitting and tree-shaking.
    *   **Loading Strategy:** We will leverage Next.js features like Server-Side Rendering (SSR) for fast initial page loads and will lazy-load images and components that are not in the initial viewport.
    *   **Caching:** We will use browser caching for static assets and leverage the Google Cloud CDN to cache content at the edge, closer to our users.

*   **Backend Performance:**
    *   **Response Time Target:** The 95th percentile (P95) response time for all core API endpoints must be under 500ms.
    *   **Database Optimization:** We will use efficient connection pooling and ensure all database queries are optimized. Indexes will be used for all frequently queried columns.
    *   **Caching Strategy:** We will use **Redis** to cache frequently accessed, non-sensitive data (e.g., user permissions, configuration data) to reduce database load.

#### **Testing Strategy**

##### **Testing Pyramid**
We will follow the standard "Testing Pyramid" model. This means we will have a large base of fast, isolated unit tests, a smaller layer of integration tests that check how components work together, and a very small number of end-to-end tests that simulate full user journeys.

```
      ▲
     / \
    / E2E \
   /---------\
  / Integration \
 /---------------\
/  Unit & Component \
---------------------
```

##### **Test Organization**
*   **Frontend Tests:** Unit and component tests will be co-located with the source code (e.g., `Button.test.tsx` will live next to `Button.tsx`).
*   **Backend Tests:** Unit tests will be co-located with the services they test. Integration tests will live in a separate `test/` directory within each microservice.
*   **E2E Tests:** There will be a dedicated `apps/e2e` application in the monorepo to house all the Cypress end-to-end tests.

##### **Test Examples**

*   **Frontend Component Test (React Testing Library):**
    ```typescript
    // Example for a simple Button component
    it('should call the onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    ```

*   **Backend API Test (Jest & Supertest):**
    ```typescript
    // Example for a protected API endpoint
    it('GET /workflows should return 401 Unauthorized without a token', () => {
      return request(app.getHttpServer())
        .get('/onboarding/workflows')
        .expect(401);
    });
    ```

*   **E2E Test (Cypress):**
    ```typescript
    // Example for a user login flow
    it('should allow a user to log in and see the dashboard', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome').should('be.visible');
    });
    ```

#### **Coding Standards**

##### **Critical Fullstack Rules**

*   **Type Sharing:** Always define shared data structures (like API payloads and data models) in the `packages/types` library. Frontend and backend applications **must** import these types and not define their own duplicate versions.
*   **API Call Abstraction:** Frontend components **must not** make direct API calls (e.g., using `fetch` or `axios`). All API interactions must be handled through the dedicated services layer we defined in the Frontend Architecture.
*   **Environment Variables:** Code **must not** access environment variables directly via `process.env`. A dedicated, type-safe configuration module will be used to expose these variables to the application.
*   **Error Handling:** All backend API routes **must** use the global error handler middleware to ensure consistent error responses.
*   **Immutable State:** In the frontend, state **must never** be mutated directly. Always use the functions provided by the Zustand store to ensure predictable state updates.

##### **Naming Conventions**

| Element | Convention | Example |
| :--- | :--- | :--- |
| Components (React) | `PascalCase` | `UserProfile.tsx` |
| Custom Hooks (React) | `useCamelCase` | `useOnboardingTasks.ts` |
| API Routes (URL) | `kebab-case` | `/api/onboarding-workflows` |
| Database Tables | `snake_case` | `onboarding_workflows` |
| Service/Controller Files | `kebab-case.type.ts` | `onboarding.service.ts` |

#### **Error Handling Strategy**

##### **Error Flow**
```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant API_GW as API Gateway
    participant Service as Backend Service

    User->>FE: Performs an action (e.g., clicks Save)
    FE->>API_GW: Sends API Request (e.g., POST /data)
    API_GW->>Service: Forwards Request
    Service->>Service: Business logic fails (e.g., validation error)
    Service-->>API_GW: Throws standardized HttpException
    API_GW-->>FE: Forwards standardized error response
    FE->>FE: Catches error in API service layer
    FE-->>User: Displays user-friendly error message (e.g., a Toast notification)
```

##### **Error Response Format**
All API errors will return a JSON object with the following consistent structure. This will be defined in our shared `packages/types` library.
```typescript
export interface ApiError {
  statusCode: number;      // e.g., 400
  message: string;         // A user-friendly error message, e.g., "Email already exists."
  error: string;           // A technical error name, e.g., "Bad Request"
  timestamp: string;       // ISO 8601 timestamp of the error
  path: string;            // The path that was requested
  requestId?: string;     // A unique ID for tracing the request
}
```

##### **Frontend Error Handling**
In the frontend, our `axios` API client will be configured to globally handle these structured errors and display them to the user, for example, using a toast notification.
```typescript
// Simplified example in an API service file
async function updateUser(data) {
  try {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  } catch (error) {
    // The global interceptor will have already shown a toast with the error.message
    // We can log the detailed error here for debugging
    console.error('API Error:', error.response.data);
    // Re-throw so the UI component can stop a loading spinner, etc.
    throw error;
  }
}
```

##### **Backend Error Handling**
In the backend, we will implement a **Global Exception Filter** in NestJS. This filter will catch all unhandled exceptions and automatically format them into our standard `ApiError` response object before sending them to the client. This keeps our controller and service code clean of repetitive error-handling logic.

#### **Monitoring and Observability**

##### **Monitoring Stack**

*   **Frontend Monitoring:** We will use **Google Cloud Operations (Real User Monitoring)** to track the user experience on the frontend. This will be supplemented with **Sentry** for detailed frontend error tracking.
*   **Backend Monitoring:** For our production environment on GCP, we will use the integrated **Google Cloud Operations** suite (Metrics, Logging, Trace). For local development, we will use a **Prometheus & Grafana** stack within Docker Compose to visualize metrics.
*   **Error Tracking:** **Sentry** will be used as our centralized error tracking platform for both frontend and backend errors. It will provide detailed stack traces, context, and alerting for all exceptions.
*   **Performance Monitoring:** **Google Cloud Trace** will be used for distributed tracing to analyze backend performance bottlenecks. We will also integrate **Lighthouse** into our CI/CD pipeline to enforce performance budgets on the frontend.

##### **Key Metrics to Monitor**

*   **Frontend Metrics:**
    *   **Core Web Vitals (LCP, FID, CLS):** To measure the real-world user experience of our web app.
    *   **JavaScript Error Rate:** The percentage of user sessions that encounter a JavaScript error.
    *   **API Latency:** The time it takes for API calls to complete, as measured from the client-side.

*   **Backend Metrics:**
    *   **Request Rate & Error Rate (per service):** The number of requests per second and the percentage of those that result in a 5xx server error.
    *   **Latency (P95/P99 per service):** The 95th and 99th percentile response times for each microservice.
    *   **Database Performance:** Metrics like query latency and connection pool usage from Cloud SQL.
    *   **Resource Utilization:** CPU and Memory usage for each container running in GKE.
