import { Request, Response } from "express";
import { responsePlate } from "../../utils";
import { dynamicDataSchema, zodErrorMessage } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const fetchDynamicDataRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    console.log("these are the queries from the client");
    console.log(req.query);

    const { success, error, data } = dynamicDataSchema.safeParse({
      type: req.query.type,
      orderId: req.query.orderId,
    });

    if (!success) {
      return responsePlate({
        res,
        message: "invalid data",
        status: 411,
        data: zodErrorMessage({ error }),
      });
    }

    const { type, orderId } = data;

    if (type === "deals") {
      const deals = await db.query.deals.findMany({
        where: eq(schema.deals.isAcive, true),
      });

      if (deals.length === 0) {
        return responsePlate({
          res,
          message: "no data found",
          status: 404,
        });
      }

      return responsePlate({
        res,
        message: "data found",
        status: 200,
        data: {
          deals,
        },
      });
    } else if (type === "orders") {
      const orders = await db.query.orders.findMany({
        where: eq(schema.orders.userId, userId),
      });

      if (orders.length === 0) {
        return responsePlate({
          res,
          message: "no data found",
          status: 404,
        });
      }

      return responsePlate({
        res,
        message: "data found",
        status: 200,
        data: {
          orders,
        },
      });
    } else if (type === "payments") {
      if (!orderId) {
        return responsePlate({
          res,
          message: "order Id is required",
          status: 411,
        });
      }

      const payments = await db.query.payments.findMany({
        where: eq(schema.payments.orderId, orderId),
      });

      if (payments.length === 0) {
        return responsePlate({
          res,
          message: "no data found",
          status: 404,
        });
      }

      return responsePlate({
        res,
        message: "data found",
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
