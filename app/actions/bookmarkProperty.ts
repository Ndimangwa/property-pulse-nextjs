'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(
  propertyId: number | string
): Promise<{
  message: string;
  isBookmarked: boolean;
}> {
    await connectDB();
    const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("You must be logged in to bookmark a property.");
  }

  const user = await User.findById(sessionUser.userId);

  if (!user) {
    throw new Error("User not found.");
  }

  let message;
  let isBookmarked = user.bookmarks.includes(propertyId);

  if (isBookmarked) {
    // Remove bookmark
    user.bookmarks.pull(propertyId);
    //Update Results
    message = "Bookmark Removed";
    isBookmarked = false;                                                                                                                                                                                                                                                                                                                                                                                                                     
  } else {
    // Add bookmark
    user.bookmarks.push(propertyId);
    //Update Results
    message = "Bookmark Added";
    isBookmarked = true;
  }
  //Now saving
  await user.save();
  revalidatePath('/properties/saved', 'page');
  //Now return
  return {
    message,
    isBookmarked
  };
}

export default bookmarkProperty;
