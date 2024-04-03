import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { UserInfo } from "@/models/UserInfo";
import NextCors from "nextjs-cors";


export async function GET(req,res) {
    await mongoose.connect(process.env.MONGO_URL);

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

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