import { Link } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <div className="space-x-10">
      <Link
        to="/register"
        className="text-white font-semibold hover:text-blue-300"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="text-white font-semibold hover:text-blue-300"
      >
        Login
      </Link>
    </div>
  );
};

export default AnonymousMenu;
