import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";


import NextCors from "nextjs-cors";
import { Order } from "@/models/Order";


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