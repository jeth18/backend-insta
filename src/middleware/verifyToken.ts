import { getAuth } from "firebase-admin/auth";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decode = token.split(" ")[1];
    getAuth()
      .verifyIdToken(decode)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;
        next();
      })
      .catch((error) => {
        // Handle error
        console.log("Error => " + error);
        res.status(401).send({
          error: "Expired token",
        });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
