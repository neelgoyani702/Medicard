const {
  authSignUp,
  authLogin,
} = require("../controllers/authController");

const AuthRoutes = (app) => {
  app.post("/signup",authSignUp);
  app.post("/login",authLogin);
};

module.exports = AuthRoutes;