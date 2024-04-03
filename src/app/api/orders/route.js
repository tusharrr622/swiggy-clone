import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { UserInfo } from "@/models/UserInfo";


export async function GET(req) {
   await mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Order.findById(_id));
    }

    if (userEmail) {
        return Response.json(await Order.find({ userEmail }));
    }
}