import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7h",
  });
};
