import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Loader from "../Components/Loader"
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";
const Dashboard = () => {
  // const [prompt, setPrompt] = useState("");
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
  }, [search,page]);
  const handlePagination = (newPage) => {
    const newPath =`/dashboard/?page=${newPage}&search=${search}`;
    navigate(newPath);
  };
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] flex flex-col  items-center h-screen ">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <Post key={post._id} posts={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
        <Pagination handlePagination={handlePagination} currentPage={page} />
      </div>
    </div>
  );
};

export default Dashboard;
