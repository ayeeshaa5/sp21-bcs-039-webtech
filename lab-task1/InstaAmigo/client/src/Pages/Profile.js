import React from 'react'
import ProfileImg from '../prop.png'
import { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [info,setInfo] = useState([])
  const path = useLocation().pathname;
  
  const fetchUser = async () => {
    
    setLoader(true)
    try {
      const res = await axios.get("http://localhost:4000/api/user/"+user._id);
      // console.log(res.data)
      setInfo(res.data);
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
  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get("http://localhost:4000/api/post/user/"+user._id);
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
    console.log("hello",user)
    fetchUser();
    fetchPosts();
  },[]);
  return (
    <div>
      
        <div className='px-8  mt-8 flex h-96'>
            <div className='flex px-[150px] space-y-4  w-full '>
                <div className=' w-1/4'>
                <img src={ProfileImg} alt="" className='rounded-full w-48 h-48'/></div>
                <div className='w-2/4 ml-20'>
                <h1 className='text-xl flex font-bold mb-4 '>{info.name}</h1>
                <p >{info.email}</p>
                {/* <p>Designation</p>
                <p>NUmber of Posts</p> */}

                </div>
                <div className='w-1/4 px-10'>
                <button className='bg-slate-300 text-sm p-1 rounded-md border-gray-300 text-black hover:text-white font-semibold'>Edit Profile</button>
                </div>
            </div>
        </div>
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <Post key={post._id} posts={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>
  )
}

export default Profile