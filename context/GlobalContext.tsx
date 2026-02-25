'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

/* Context Type */
type GlobalContextType = {
  unreadMessageCount: number;
  setUnreadMessageCount: React.Dispatch<React.SetStateAction<number>>;
};

/* Create Context */
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

/* Provider */
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const {data: session} = useSession();
  
  useEffect(() => {
    if (session && session.user)  {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadMessageCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadMessageCount,
        setUnreadMessageCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

/* Custom Hook */
export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }

  return context;
}