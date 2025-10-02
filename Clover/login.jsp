<%@ page language="java" contentType="text/html; charset=UTF-8" %>
    <html>

    <head>
        <link rel="stylesheet" type="text/css" href="assets/style.css">
        <title>Login</title>
        <style>
            body {
                font-family: Arial;
                background: #f9f9f9;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            form {
                background: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 300px;
            }

            input {
                width: 100%;
                margin: 10px 0;
                padding: 8px;
            }

            button {
                width: 100%;
                padding: 10px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
            }
        </style>
    </head>

    <body>
        <form action="LoginServlet" method="post">
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p style="color:red;">
                <%= request.getParameter("msg") !=null ? request.getParameter("msg") : "" %>
            </p>
            <p class="switch-page">
                New user? <a href="signup.jsp">Sign up</a>
            </p>

        </form>
    </body>

    </html>