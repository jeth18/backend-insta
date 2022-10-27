import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decode = jwt.decode(token.split(" ")[1]);
    const res = jwt.verify(token.split(" ")[1], "secret");
    console.log(decode, res);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "token no es válido" });
  }
};
