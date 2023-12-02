import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { FriendsCard, Loading, PostCard, ProfileCard } from '../components';
import { posts } from '../assets/data';
import { TextInput } from '../components';

import { NoProfile } from '../assets';
import { Link } from 'react-router-dom';
import { CustomButton } from '../components';
import {proffession} from "../assets/data";
import { BsPersonFillAdd } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { BiImages } from 'react-icons/bi';
import { BiSolidVideo } from 'react-icons/bi';

const Profile = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  const [errMsg, setErrMsg] = useState("");
    const {register, handlesubmit, formState:{errors},} =useForm();
    const [file, setFile] = useState(null);
  
  const {userInfo, setUserInfo} = useState(user);
  // const {posts}=useSelector((state)=>state.posts);

  const [posting, setPosting] = useState(false);
  const[loading,setLoading]=useState(false);
  const handleDelete=()=>{}
  const handleLikePost=()=>{}
  const handlePostSubmit = async(data)=>{}
  return <>
  
  <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <TopBar/>
            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
                {/* LEFT */}
                <div className='hidden w-1/3 lg:w-1/4 h-full 
                md:flex flex-col gap-6 overflow-y-auto'>
                    <ProfileCard  user={userInfo}/> 
                    <div className='block lg:hidden'>
                    <FriendsCard friends={userInfo ?. friends}/>
                    </div>
                </div>
                <div className='flex-1 h-full px-4 flex flex-col gap-6 
                overflow-y-auto rounded-lg '>

                    <form 
    onSubmit={handlePostSubmit}
    className='bg-primary px-6 rounded-lg'>
    <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
        <img src={user?.profileUrl ?? NoProfile} 
            alt='User Image'
            className='w-14 h-14 rounded-full object-cover' />
        <TextInput
            styles='w-full rounded-full py-5 '
            placeholder='What is on your mind?'
            name='description'
            register={register('description',{
                required:'write something about post',
            })}
            error={errors.description ? errors.description.message : ''}
        />
    </div>
    {
        errMsg?.message && (
            <span
                role='alert'
                className={`text-sm ${
                    errMsg?.status === 'failed'
                        ? "text-[#f64949fe]"
                        : "text-[#2ba150fe]"
                } mt-0.5`}>
                {errMsg?.message}
            </span>
        )
    }
</form>
<div className='flex items-center justify-between py-4 '>
    <label htmlFor="imgUpload"
    className='flex items-center gap-1 text-base text-ascent-1 hover:text-ascent-1 cursor-pointer '>
        <input
            type="file"
            id='imgUpload'
            className='hidden'
            accept='.jpg, .png, .jpeg'
            onChange={(e) => setFile(e.target.files[0])}
            data-max-size='5120'
            />
            <BiImages />
            <span>Photo</span>


    </label>

    <label htmlFor="videoUpload"
    className='flex items-center gap-1 text-base text-ascent-1 hover:text-ascent-1 cursor-pointer '>
        <input
            type="file"
            id='videoUpload'
            className='hidden'
            accept='.mp4, .wav'
            onChange={(e) => setFile(e.target.files[0])}
            data-max-size='5120'
            />
            <BiSolidVideo />
            <span>Video</span>


    </label>
<div>
{posting ?(
    <Loading/>
    // <p>Loading...</p>
):(<CustomButton
type='submit'
title='Post'
containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
/>)}  
</div>  
    {/* <label
    className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
    htmlFor='vgiUpload'>
        <input
            type="file"
            id='vgiUpload'
            className='hidden'
            accept='.mp4, .mkv, .avi, .mov, .gif'
            onChange={(e) => setFile(e.target.files[0])}
            data-max-size='5120'
            />
            <BiFiletypeGif />
            <span>  GIF</span>
    </label> */}

</div>
{loading ?(<Loading/>):posts?.length>0?(
    posts?.map((post)=>(
        <PostCard key={post?._id} post={post}
        user={user}
        deletePost={()=>{}}
        likePost={()=>{}}
        />
        
    ))
): (
    <div className='w-full flex h-full items-center justify-center'>
        <p className='text-lg text-ascent-2'>No Post yet</p>
    </div>

)}
                     </div> 
                {/* right */}
                <div className='hidden w-1/4 h-full lg:flex flex-col
                gap-8 overflow-y-auto'>
                    <FriendsCard friends={userInfo ?. friends}/>
                </div>
                
                </div>
                <div className='flex-1 h-full bg-primary rounded-lg overflow-y-auto flex flex-col gap-6 px-4'>
                {loading ?(<Loading/>):posts?.length>0?(
    posts?.map((post)=>(
        <PostCard key={post?._id} post={post}
        user={user}
        deletePost={handleDelete}
        likePost={handleLikePost}
        />
        
    ))
): (
    <div className='w-full flex h-full items-center justify-center'>
        <p className='text-lg text-ascent-2'>No Post yet</p>
    </div>

)}
                  </div>
   </div>
      </>
}

export default Profile