import { Link } from "react-router-dom";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 flex h-16 items-center justify-between w-full">
          <Link to="/" className="text-white font-bold text-lg">
            Flea market
          </Link>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
      </div>
    </nav>
  );
};

export default NavBar;
