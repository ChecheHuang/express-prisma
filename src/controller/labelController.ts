import { ExpressControllerType } from "../types";
import prisma from "../utils/prisma";
export const index: ExpressControllerType = async (req, res, next) => {
  try {
    const labels = await prisma.labels.findMany({
      select: {
        id: true,
        label_name: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.data(labels).send();
  } catch (error: any) {
    next(error);
  }
};
export const create: ExpressControllerType = async (req, res, next) => {
  try {
    const { label_name } = req.body;
    if (!label_name) {
      return res.error("標籤不能為空");
    }
    const existingLabel = await prisma.labels.findUnique({
      where: {
        label_name,
      },
    });
    if (existingLabel) {
      return res.error("標籤重複");
    }
    await prisma.labels.create({
      data: {
        label_name,
      },
    });

    return res.message("新增成功").send();
  } catch (error: any) {
    next(error);
  }
};
export const destroy: ExpressControllerType = async (req, res, next) => {
  try {
    const { label_id } = req.body;
    await prisma.labels.delete({
      where: {
        id: label_id,
      },
    });
    return res.success("刪除成功");
  } catch (error: any) {
    next(error);
  }
};
