import { Request, Response } from "express";
import { responsePlate } from "../../utils";
import { dynamicDataSchema, zodErrorMessage } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const fetchDynamicDataRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { success, error, data } = dynamicDataSchema.safeParse({
      type: req.params.type,
    });

    if (!success) {
      return responsePlate({
        res,
        message: "invalid data",
        status: 411,
        data: zodErrorMessage({ error }),
      });
    }

    const { type } = data;

    if (type === "deals") {
      const deals = await db.query.deals.findMany({
        where: eq(schema.deals.isAcive, true),
      });

      if (deals.length === 0) {
        return responsePlate({
          res,
          message: "no deals found",
          status: 400,
        });
      }

      return responsePlate({
        res,
        message: "deals found",
        status: 200,
        data: {
          deals,
        },
      });
    } else if (type === "orders") {
      const orders = await db.query.orders.findMany();

      if (orders.length === 0) {
        return responsePlate({
          res,
          message: "no orders found",
          status: 400,
        });
      }

      return responsePlate({
        res,
        message: "orders found",
        status: 200,
        data: {
          orders,
        },
      });
    } else if (type === "payments") {
      const payments = await db.query.payments.findMany();

      if (payments.length === 0) {
        return responsePlate({
          res,
          message: "no payments found",
          status: 400,
        });
      }

      return responsePlate({
        res,
        message: "payments found",
        status: 200,
        data: {
          payments,
        },
      });
    }
    return responsePlate({
      res,
      message: "invalid paramters",
      status: 400,
    });
  } catch (e) {
    console.log("error in fetchDynamicDataRequest ", e);
    return responsePlate({
      res,
      message: "internal server error",
      status: 500,
    });
  }
};
