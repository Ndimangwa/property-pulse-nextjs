'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(
  propertyId: number | string
): Promise<{
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

  const isBookmarked = user.bookmarks.includes(propertyId);
  //now return
  return {
    isBookmarked
  };
}

export default checkBookmarkStatus;
