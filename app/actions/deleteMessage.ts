'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(
  messageId: number | string
) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("You must be logged in to bookmark a property.");
  }
  const {userId} = sessionUser;
  //Handling message
  const message: any = await Message.findById(messageId);
  if (! message)  throw new Error('Message Not Found');

  //Verify Ownership
  if (message.recipient.toString() !== userId) throw new Error('Un-Authorized');
  
  //Finalizing
  await message.deleteOne();
  revalidatePath('/', 'layout'); 
}

export default deleteMessage;
