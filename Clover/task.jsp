<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="model.User" %>
<%
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("signup.jsp?msg=Please login first");
        return;
    }
    String categoryParam = request.getParameter("category");
    String category = (categoryParam != null && !categoryParam.isEmpty()) ? categoryParam : "General";
    String userName = user.getName();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= category %> Tasks - Clover</title>
    <link rel="stylesheet" href="assets/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
<body>

    <!-- Header -->
    <header class="header thin-header">
        <div class="logo-title">
            <img src="assets/logo.png" alt="Clover Logo" class="clover-logo">
            <h1 class="app-name">Clover</h1>
        </div>
        <div class="header-right">
            <a href="signup.jsp" class="logout-btn">Logout</a>
            <p class="welcome-message">Welcome, <%= userName %></p>
        </div>
    </header>

    <!-- Add Task Button -->
    <button id="add-task-btn" class="circular-btn">+</button>

    <!-- Tasks Container -->
    <div class="tasks-container">
        <h2 class="category-title"><%= category %> Tasks</h2>
        <ul id="task-list"></ul>
    </div>

    <!-- Achievement Popup -->
    <div id="achievement-popup">✓ Task Completed!</div>

    <!-- External JS -->
    <script>
        // Pass JSP values to JS
        const category = "<%= category.replace("\\", "\\\\").replace("\"", "\\\"") %>";
    </script>
    <script src="assets/task.js"></script>

</body>
</html>

</body>
</html>