package controller;

import dao.UserDAO;
import model.User;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class SignupServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);

        UserDAO dao = new UserDAO();
        if (dao.insertUser(user)) {
            response.sendRedirect("login.jsp?msg=Signup successful, please login");
        } else {
            response.sendRedirect("signup.jsp?msg=Error during signup");
        }
    }
}
