"use client"
import { useUser } from "@/hooks/useUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const {user, loading} = useUser();
  if (loading) return <h1>loading...</h1>
  if (!user) redirect("/sign-in")
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
