import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { UserInfo } from "@/models/UserInfo";


export async function GET(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');

        const userInfo = await UserInfo.findOne({ email: userEmail });

        if (_id) {
            const order = await Order.findById(_id);
            if (order) {
                return Response.json(order);
            } else {
                return Response.status(404).json({ message: 'Order not found' });
            }
        }

        if (userInfo && userInfo.admin) {
            const orders = await Order.find();
            return Response.json(orders);
        }

        if (userEmail) {
            const userOrders = await Order.find({ userEmail });
            return Response.json(userOrders);
        }

        return Response.status(403).json({ message: 'Unauthorized' });
    } catch (error) {
        console.error(error);
        return Response.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await mongoose.disconnect();
    }
}