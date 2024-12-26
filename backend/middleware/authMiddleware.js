const isLoggedInUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "User Unauthorized" });
  }
};

module.exports = { isLoggedInUser };
