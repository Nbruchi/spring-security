import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BASE_URL, useAuth } from "../utils";
import axios from "axios";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.log("User already logged out");
      navigate("/");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/auth/signout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("secretKey");
      localStorage.removeItem("expiryTime");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="flex px-16 py-4 static top-0 left-0 w-full bg-blue-400 text-white items-center justify-between">
      <Link to="/users">
        <img src="/logo.png" alt="logo" className="w-32 object-contain" />
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          to="/users"
          className="text-xl hover:text-orange-500 transition-colors duration-300"
        >
          Users
        </Link>
        <Link
          to="/users/me"
          className="text-xl hover:text-orange-500 transition-colors duration-300"
        >
          User Profile
        </Link>
        <Button
          className="bg-white text-blue-400 hover:bg-blue-100 mx-10"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </nav>
    </header>
  );
};

export default Header;
