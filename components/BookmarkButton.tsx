'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type BookmarkButtonProps = {
    property: {
        _id: number | string;
    }
};

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
    const { _id: propertyId } = property;

    const [isBookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const handleClick = async () => {
        if (!userId) {
            toast.error('You are not signed in, you can not bookmark');
            return;
        }
        bookmarkProperty(propertyId).then((res) => {
            if (res.error) {
                toast.error(res.error);
                return;
            }
            toast.success(res.message);
            setBookmarked(res.isBookmarked);
        });
    }
    useEffect(() => {
        if (! userId)   {
            setLoading(false);
            return;
        }
        checkBookmarkStatus(propertyId).then((res) => {
            if (res.error) {
                toast.error(res.error);
                setLoading(false);
                return;
            }
            setBookmarked(res.isBookmarked);
        });
        setLoading(false);
    }, [propertyId, userId, checkBookmarkStatus]);
    if (loading) return (<p className="text-center">Loading...</p>);
    return isBookmarked ? (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleClick}
        >
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleClick}
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    );
}

export default BookmarkButton;