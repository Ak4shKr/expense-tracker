import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  const token = req.header("authorization");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .send({ success: false, message: "Failed to authenticate user." });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "Please LogIN." });
  }
};
