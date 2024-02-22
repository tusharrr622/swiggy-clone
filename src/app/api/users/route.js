import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()) {
        const users = await User.find();
        return Response.json(users);
    } else {
        return Response.json([]);
    }
}