"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "../utils/services/api"; // Sesuaikan path
import '@ant-design/v5-patch-for-react-19';


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke /auth/login
    router.push("/auth/login");
  }, [router]);
  
}
