import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExpressControllerType } from "../types";
declare global {
  namespace Express {
    interface Request {
      user?: TokenType;
    }
  }
}
type TokenType = {
  user_id: number;
  name: string;
  time: string;
};
const getTokenFromHeader = (req: Request): string => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1] || "";
    return token;
  } catch (error) {
    return "";
  }
};

const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET || "", (err, decoded) => {
      if (err) {
        reject({
          status: "error",
          message: "Token 驗證失敗。請重新登入。",
        });
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
};

const tokenMiddleware: ExpressControllerType = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  try {
    const decoded = await verifyToken(token);
    req.user = decoded as TokenType;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export default tokenMiddleware;
