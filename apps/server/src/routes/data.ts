import { Router } from "express";
import { fetchDynamicDataRequest } from "../services/data/fetch-data";

export const getDataRouter = Router();

getDataRouter.get("/fetch-data/:type", fetchDynamicDataRequest);
