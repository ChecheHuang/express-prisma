import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import { ExpressControllerType } from "../types";
import "dotenv/config";
import moment from "moment";

export const register: ExpressControllerType = async (req, res, next) => {
  const { name, password, email, avatar } = req.body;

  try {
    const existingUser = await prisma.users.findFirst({
      where: {
        user_name: name,
      },
    });
    if (existingUser) {
      return res.error("已經註冊過了");
    }

    await prisma.users.create({
      data: {
        user_name: name,
        user_password: await bcrypt.hash(password, 10),
        user_email: email,
        user_avatar: avatar,
      },
    });

    res.success();
  } catch (error: any) {
    next(error);
  }
};

export const login: ExpressControllerType = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        user_name: name,
      },
    });
    if (!user) {
      return res.error("查無此帳號");
    }
    const result = await bcrypt.compare(password, user.user_password);
    if (!result) {
      return res.error("密碼錯誤");
    }
    const token = jwt.sign(
      {
        user_id: user.id,
        name,
        time: moment().format("YYYY/MM/DD HH:mm:ss"),
      },
      process.env.TOKEN_SECRET as string
    );
    res.data({ user, token }).send();
  } catch (error: any) {
    next(error);
  }
};

export const getUserInfo: ExpressControllerType = async (req, res, next) => {
  try {
    const name = req.user?.name;
    const user = await prisma.users.findFirst({
      where: {
        user_name: name,
      },
      select: {
        id: true,
        user_name: true,
        user_email: true,
        user_avatar: true,
      },
    });
    if (!user) {
      return res.error("查無此帳號");
    }
    return res.data(user).send();
  } catch (err) {
    next(err);
  }
};
