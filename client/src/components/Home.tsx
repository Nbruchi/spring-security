import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Home | User System";

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-4xl font-bold">👋 Hi and Welcome 👋!</h1>
      <p>This is my security application</p>
      <Link
        to="/login"
        className="bg-blue-400 py-4 px-16 text-white rounded-xl flex items-center justify-center my-10 hover:bg-blue-800 transition-colors duration-300"
      >
        Login
      </Link>
    </section>
  );
};

export default Home;
