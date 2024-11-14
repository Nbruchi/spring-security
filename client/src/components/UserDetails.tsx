// src/components/UserDetails.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { User } from "../../Types";

function UserDetails() {
  document.title = "Profile | User System";
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(`${BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <section className="w-full p-10 flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold text-blue-400 my-4">
        User Details
      </h1>

      <article></article>
    </section>
  );
}

export default UserDetails;
