'use server';

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

async function addMessage(formData: FormData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        throw new Error("UserID is required");
    }
    
    const {userId} = sessionUser;
    const recepient = formData.get('recepient');
    if (userId === recepient)	{
        return {error: 'You can not send message to yourself'};
    }
    const newMessage = new Message({
        sender: senderId,
	recepient,
	property: formData.get('property'),
	name: formData.get('name'),
	email: formData.get('email'),
	phone: formData.get('phone'),
	body: formData.get('body')
    });

    await newMessage.save();
    return { submitted: true };
 }

export default addMessage;
