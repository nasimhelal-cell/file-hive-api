function loggedInUser(req, res, next) {
  req.user = {
    id: "nasim",
    email: "nasimhelal123@gmail.com",
  };
  next();
}

module.exports = loggedInUser;
