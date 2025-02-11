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
      <h1>List of Users</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id_user}>
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </ul>
    </div>
  );
}
