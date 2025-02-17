"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../utils/services/api"; // Sesuaikan path

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      if (data?.success) {
        setUsers(data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Selamat datang di fsm
      </h1>
    </div>
  );
}
