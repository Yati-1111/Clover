## 📝 Clover To-Do List

**Clover** is a simple yet effective To-Do List web application designed to help users manage their tasks efficiently. It provides core task management features (add, edit, delete) and includes a crucial **deadline feature** to keep track of important due dates.

### ✨ Features

  * **Task Management:**
      * **Add** new tasks to your list.
      * **Edit** existing task descriptions.
      * **Delete** completed or unnecessary tasks.
  * **Deadline Feature:** Assign a specific **date deadline** to each task.
  * **User Authentication:** Secure **login** and **signup** functionality.
  * **Pretty UI:** A clean, modern, and user-friendly interface powered by custom **CSS**.

### 💻 Tech Stack

This project is built using a robust and traditional Java web application stack:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript | Provides the structure, styling, and interactive client-side logic for a smooth user experience. |
| **Backend Logic** | Java Servlets | Handles requests, business logic, and interaction with the DAO layer. |
| **Presentation Layer** | JSP (JavaServer Pages) | Dynamically generates the HTML content for the user interface. |
| **Data Access** | JDBC via DAO Pattern | Manages the connection to the database and performs CRUD operations. |
| **Database** | MySQL | Used to persist user credentials and application data (e.g., tasks and their deadlines). |

### 📂 Project Structure

The application follows a standard Model-View-Controller (MVC)-like pattern for clear separation of concerns, typical for a Java web application deployed on a server like **Apache Tomcat**.

```
Clover/                          <-- Project root (inside Tomcat webapps)
├── assets/                      <-- Static resources
│   ├── logo.png
│   ├── style.css
│   └── task.js
├── src/                         <-- Source code (Java)
│   ├── controller/              <-- Servlets (e.g., LoginServlet.java)
│   ├── dao/                     <-- Data Access Objects (e.g., UserDAO.java)
│   ├── model/                   <-- Data Model (e.g., User.java)
│   └── utils/                   <-- Utility classes (e.g., DBConnection.java)
├── WEB-INF/
│   ├── classes/                 <-- Compiled Java classes
│   ├── lib/                     <-- External JARs (e.g., MySQL connector)
│   └── web.xml                  <-- Deployment Descriptor
├── login.jsp                    <-- Login page
├── signup.jsp                   <-- Signup page
├── task.jsp                     <-- Main To-Do List interface
└── welcome.jsp                  <-- Post-login welcome page (or main app view)
```

### ⚙️ Setup and Installation

To run this project locally, you will need to set up a Java development environment:

1.  **Prerequisites:**
      * Java Development Kit (JDK)
      * An IDE (e.g., IntelliJ IDEA, Eclipse)
      * A Servlet Container (e.g., Apache Tomcat)
      * MySQL Database server
2.  **Database Setup:**
      * Create a MySQL database (e.g., `clover_db`).
      * Create a `user` table and a `tasks` table.
      * Ensure your **MySQL Connector JAR** is placed in the `WEB-INF/lib` directory.
3.  **Configuration:**
      * Update the database connection details (URL, username, password) in `src/utils/DBConnection.java` to match your local MySQL setup.
4.  **Deployment:**
      * Compile the Java source files (`.java`) into class files (`.class`) and place them in `WEB-INF/classes/`.
      * Deploy the `Clover/` directory as a web application (WAR file or context folder) to your Tomcat server's `webapps` folder.
5.  **Access:**
      * Start your Tomcat server and access the application in your browser, typically at `http://localhost:8080/Clover/login.jsp`.
