import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-4 fixed top-0 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl text-blue-400 font-bold">ToDoodle</div>
        <div className="flex gap-4">
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            SignUp
          </Link>
          <Link
            to="/signin"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}

