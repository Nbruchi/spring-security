import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

function Users() {
  document.title = "All users | User System";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="my-8 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-blue-400 font-bold my-4">All Users</h1>
      <DataTable columns={columns} data={users} />
    </section>
  );
}

export default Users;
