export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Recruiter access only" });
  }
  next();
};