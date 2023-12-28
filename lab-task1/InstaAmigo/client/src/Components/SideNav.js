import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="z-10 flex flex-col items-center absolute  md:right-32  p-4 space-y-4">
      <ul class="font-medium flex flex-col  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {user ? (
          <li class="block text-black px-4 py-2 text-sm font-bold">
            {user.name}
          </li>
        ) : null}
        <li>
          {user ? (
            <a
              href="/"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
              aria-current="page"
            >
              Dashboard
            </a>
          ) : (
            <a
              href="/"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
              aria-current="page"
            >
              Home
            </a>
          )}
        </li>
        <li>
          {user ? (
            <a
              href="#"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
            >
              My Blogs
            </a>
          ) : (
            <a
              href="#"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
            >
              Blogs
            </a>
          )}
        </li>
        <li>
          {user ? (
            <a
              href="#"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
            >
              Write
            </a>
          ) : (
            <a
              href="#"
              class="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500 "
            >
              About Us
            </a>
          )}
        </li>

        <li>
          {user ? null : (
            <a
              href="#"
              className="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500"
            >
              Contact Us
            </a>
          )}
        </li>
        <li>
          {user ? (
            <a
              href="#"
              className="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500"
            >
              My Profile
            </a>
          ) : (
            <a
              href="#"
              className="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500"
            >
              Contact Us
            </a>
          )}
        </li>
        <li>
          {user ? (
            <a
              href="#"
              className="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500"
              onClick={handleLogout}
            >
              Log Out
            </a>
          ) : (
            <a
              href="#"
              className="block py-2 pl-1 pr-4 text-gray-500 relative hover:text-blue-500 hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:via-purple-500 hover:after:to-pink-500"
            >
              Log In
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
