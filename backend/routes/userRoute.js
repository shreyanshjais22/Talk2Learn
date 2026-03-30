import express from "express";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  searchUsers,  
} from "../controllers/userControllers.js";
import { auth } from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.use(auth);

userRoute.get("/", getRecommendedUsers);
userRoute.get("/friends", getMyFriends);
userRoute.post("/friend-request/:id", sendFriendRequest);
userRoute.put("/friend-request/:id/accept", acceptFriendRequest);
userRoute.get("/friend-requests", getFriendRequests);
userRoute.get("/outgoing-friend-requests", getOutgoingFriendReqs);
userRoute.get("/search", searchUsers);

export default userRoute;
