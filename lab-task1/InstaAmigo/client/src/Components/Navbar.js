import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import SideNav from "./SideNav";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const [side, setSide] = useState(false);
  const [posts, setPosts] = useState([]);
  const [prompt, setPrompt] = useState("");
  const { search } = useLocation();

  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const path = useLocation().pathname;

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get("http://localhost:4000/api/post/"+search);
      // console.log(res.data)
      setPosts(res.data);
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    } catch (err) {
      console.log(err);
      setLoader(true)
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);

  const goProfile=()=>{
    navigate("/profile/"+user._id)
  }

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 border-b-2 h-24 sticky">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <span className=" text-5xl  dark:text-white text-blue-500 p-3">
              InstaAmigo
            </span>
          </div>

          <div className="sticky flex px-2 w-[400px]  space-x-0 border-2 rounded-lg">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer mt-3"
          >
            <BsSearch className="text-blue-500" />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none py-2 px-2 w-96 "
            placeholder="Search a post"
            type="text"
          />
        </div>

          <div
            className="hidden w-full md:block md:w-auto pr-10 py-3"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
                    <li
                      className="block px-3 rounded-full py-1 cursor-pointer text-gray-400 hover:bg-gray-200 text-2xl"
                      onClick={goProfile}
                    >
                      <CgProfile/> 
                    </li>
              

              
              
                    <li
                      className="block px-3 rounded-full py-1 cursor-pointer text-gray-400 hover:bg-gray-200 border-2 "
                      onClick={handleLogout}
                    >
                      Log Out
                    </li>
                  
              
            </ul>
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
