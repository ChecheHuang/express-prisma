import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      response: ResponseBuilder;
      success: (message?: string, data?: unknown, status?: number) => void;
      error: (message?: string, data?: unknown, status?: number) => void;
      data: (data: unknown) => ResponseBuilder;
      message: (message: string) => ResponseBuilder;
    }
  }
}


class ResponseBuilder {
  private statusCode: number;
  private body: any;
  private res: Response;

  constructor(res: Response) {
    this.statusCode = 200;
    this.body = {
      status: "success",
    };
    this.res = res;
  }

  public status(statusCode: number): ResponseBuilder {
    this.statusCode = statusCode;
    return this;
  }

  public data(data: any): ResponseBuilder {
    this.body.data = data;
    return this;
  }

  public message(message: string): ResponseBuilder {
    this.body.message = message;
    return this;
  }

  public send(): Response {
    return this.res.status(this.statusCode).json(this.body);
  }
}
export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const response = new ResponseBuilder(res);

  res.success = (message?: string, data?: any, status: number = 200): void => {
    res.status(status).json({
      status: "success",
      message,
      data,
    });
  };

  res.error = (message?: string, data?: any, status: number = 500): void => {
    res.status(status).json({
      status: "error",
      message,
      data,
    });
  };

  res.data = (data: any): ResponseBuilder => {
    response.data(data);
    return response;
  };

  res.message = (message: string): ResponseBuilder => {
    response.message(message);
    return response;
  };

  res.response = response;

  next();
}
