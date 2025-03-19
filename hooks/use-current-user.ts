"use client";

import { useSession } from "next-auth/react";
import { User } from "next-auth";

export const useCurrentUser = (): User | undefined => {
  const { data: session, status } = useSession();
  
  // Return the user when session exists and is authenticated
  if (status === "authenticated" && session?.user) {
    return session.user;
  }
  
  return undefined;
};