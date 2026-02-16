"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PROPERTY_REACT_TOAST } from "./applicationConstants";

export default function SuccessToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasShown = useRef(false); // prevents duplicate firing

    const createdSuccessful = PROPERTY_REACT_TOAST.MESSAGES.CREATED_SUCCESSFUL;
    const updatedSuccessful = PROPERTY_REACT_TOAST.MESSAGES.UPDATED_SUCCESSFUL;

    useEffect(() => {
        if (hasShown.current) return;

        const toastMessages: Record<string, string> = {
            [createdSuccessful]: "Property created successfully!",
            [updatedSuccessful]: "Property updated successfully!",
        };

        const toastKey = searchParams.get(PROPERTY_REACT_TOAST.ACTION_NAME);

        if (toastKey && toastMessages[toastKey]) {
            hasShown.current = true; // mark as shown

            toast.success(toastMessages[toastKey]);

            // Remove query param safely
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete(PROPERTY_REACT_TOAST.ACTION_NAME);

            const queryString = newParams.toString();

            router.replace(
                `${window.location.pathname}${queryString ? `?${queryString}` : ""
                }`,
                { scroll: false }
            );
        }
    }, [searchParams, router]);

    return null;
}
