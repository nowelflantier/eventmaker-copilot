"use client";
import Setup from "@components/Setup";
import Feed from "@components/Feed";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();


  useEffect(() => {
    {!session && router.push('/')}
  }, [])
  
  return <Feed />;
};

export default Dashboard;
