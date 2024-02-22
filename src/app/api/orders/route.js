import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { UserInfo } from "@/models/UserInfo";


export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const url = new URL(req.url);

    const _id = url.searchParams.get('_id');

    const userInfo = await UserInfo.findOne({ email: userEmail });

    if (_id) {
        return Response.json(await Order.findById(_id))
    }

    if (userInfo && userInfo.admin) { 
        return Response.json(await Order.find())
    }

    if (userEmail) {
        return Response.json(await Order.find({ userEmail }));
    }
}