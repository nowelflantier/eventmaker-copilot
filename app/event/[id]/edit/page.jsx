"use client";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditEventPage = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  return <div>EditEventPage</div>;
};

export default EditEventPage;
