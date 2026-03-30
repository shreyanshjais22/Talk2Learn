import express from "express";
import {auth} from "../middleware/auth.js";
import { getStreamToken } from "../controllers/chatControllers.js";

const chatRoute = express.Router();

chatRoute.get("/token", auth, getStreamToken);

export default chatRoute;