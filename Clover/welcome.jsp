<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="model.User" %>
<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("signup.jsp?msg=Please login first");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Clover Homepage</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

    <!-- Header -->
    <header class="header">
        <div class="logo-title">
            <img src="assets/logo.png" alt="Clover Logo" class="clover-logo">
            <h1 class="app-name">Clover</h1>
        </div>
        <div class="header-right">
            <p class="welcome-message">Welcome, <%= user.getName() %></p>
            <a href="signup.jsp" class="logout-btn">Logout</a>
        </div>
    </header>

    <!-- Cards Section -->
    <main class="cards-container">
        <a href="task.jsp?category=Work" class="category-card">
            <h3>Work</h3>
            <p>Add and manage your work tasks here.</p>
        </a>
            
        <a href="task.jsp?category=Personal" class="category-card">
            <h3>Personal</h3>
            <p>Your personal goals and reminders.</p>
        </a>
        <a href="task.jsp?category=Groceries" class="category-card">
            <h3>Groceries</h3>
            <p>Keep track of your shopping list.</p>
        </a>
        <a href="task.jsp?category=Travel" class="category-card">
            <h3>Travel</h3>
            <p>Plan and organize travel essentials.</p>
        </a>
    </main>

    <!-- Footer -->
    <footer>
        &copy; 2025 Clover. All rights reserved.
    </footer>

</body>
</html>
