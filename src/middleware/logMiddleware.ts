import { Request, Response, NextFunction } from "express";
import "dotenv/config";
const port = process.env.PORT || 3000;
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date();
  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  const hours = String(start.getHours()).padStart(2, "0");
  const minutes = String(start.getMinutes()).padStart(2, "0");
  const seconds = String(start.getSeconds()).padStart(2, "0");
  console.log(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}     ${req.method} http://localhost:${port}${req.url} `
  );
  res.on("finish", () => {
    const end = new Date();
    const duration = end.getTime() - start.getTime(); 
    console.log(`計時${duration}毫秒`);
  });
  next();
};

export default logMiddleware;
