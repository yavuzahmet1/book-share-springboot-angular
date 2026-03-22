# 📚 Book Share API

**Book Share API** is a modern, scalable **RESTful API** platform that allows users to manage, share, and lend books. Built with **Spring Boot 3**, the project follows industry best practices regarding security, database auditing, and interactive documentation.



## 🚀 Key Features

* **Secure Authentication:** Implements **Spring Security** with **JWT (JSON Web Token)** for stateless, token-based authentication.
* **JPA Auditing:** Automatically tracks record metadata (who created/modified a record and when) using `@CreatedBy`, `@LastModifiedDate`, and a custom `AuditorAware` implementation.
* **Rich Domain Model:** Fully mapped relational database involving Users, Books, Transaction Histories, and Feedbacks.
* **Interactive API Docs:** Integrated with **Swagger (OpenAPI)** for real-time testing of all endpoints.
* **Context-Path Management:** All API routes are prefixed with `/api/v1/` for versioning and organization.
* **Async Support:** Utilizes `@EnableAsync` for non-blocking operations like sending emails.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Spring Boot 3.5.11 |
| **Language** | Java 17 |
| **Database** | PostgreSQL |
| **Security** | Spring Security 6, JJWT |
| **Documentation** | SpringDoc OpenAPI (Swagger UI v2.8.5) |
| **Libraries** | Lombok, Maven, Dotenv, Hibernate (JPA) |

---

## 🏗️ Architecture & Database Schema

The system is built around four core entities:

1.  **User:** Implements `UserDetails` and `Principal`. Handles role-based access control (e.g., `USER`, `ADMIN`).
2.  **Book:** Stores book metadata. Linked to a **User** (Owner) via a **Many-to-One** relationship.
3.  **BookTransactionHistory:** Manages the lifecycle of book loans, including return status and approvals.
4.  **FeedBack:** Stores ratings and comments for books.



---

## ⚙️ Setup and Installation

### 1. Prerequisites
* **JDK 17** or higher
* **Maven 3.x**
* **PostgreSQL** (Local or via Docker)

### 2. Environment Variables (.env)
Create a `.env` file in the root directory and configure the following variables:


## 📖 API Documentation (Swagger)

Once the application is running, you can access the interactive Swagger UI to explore and test the endpoints:

🔗 Swagger UI: http://localhost:8088/api/v1/swagger-ui/index.html

## 📚 Book Share API

Book Share API is a comprehensive RESTful API platform developed with Spring Boot 3. It enables users to share their personal libraries, track book loans through a structured history system, and provide feedback on shared books. The project architecture prioritizes security (JWT), automated auditing, and clear domain separation.
🚀 Key Features

    Secure Authentication: Powered by Spring Security and JWT (JSON Web Token) for stateless, secure access.

    JPA Auditing: Automated tracking of record metadata (createdBy, updatedAt, etc.) via a custom AuditorAware implementation.

    Feature-Based Architecture: Clean separation of concerns (Book, History, Feedback, User).

    Interactive Documentation: Swagger (OpenAPI) support at /api/v1/swagger-ui/index.html with JWT authorization support.

    Audit-Ready Entities: All entities extend a common BaseEntity to ensure consistent data tracking.

    Async Operations: Ready for non-blocking tasks like email notifications.

## 🛠️ Tech Stack
Category : Technology

Framework	Spring Boot 3.5.11

Security	Spring Security 6, JJWT

Database	PostgreSQL

ORM	Spring Data JPA (Hibernate)

Documentation	SpringDoc OpenAPI (Swagger UI)

Utilities	Lombok, Maven, Dotenv

## 🏗️ Project Structure

The project follows a modular structure where each package represents a specific domain or configuration role:

book/: Core book management, entities, and business logic.

feedback/: User ratings and reviews for books.

history/: Tracking system for book loan transactions (borrowing/returning).

user/: User profiles, account details, and security roles.

role/: Definition of security roles and permissions.

security/: JWT filters, authentication providers, and SecurityFilterChain.

config/: Configuration for Beans, OpenAPI (Swagger), and JPA Auditing.

common/: Shared utilities and the audit-enabled BaseEntity.

```properties
POSTGRES_DB=book_share
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
JWT_SECRET_KEY=your_secure_32_character_long_secret_key
MAIL_USERNAME=your_smtp_username
MAIL_PASSWORD=your_smtp_password
FRONTEND_URL=http://localhost:4200