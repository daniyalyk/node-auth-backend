import { verify } from "jsonwebtoken";

export const checkAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, "hello");
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorizae or token expire" });
  }
};

