import React, { useState, useEffect, useContext } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { UserContext } from '../context/UserContext';
import Logo from '../images/insta.png'
function Login (){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext)
  const navigate= useNavigate()
  
  const handleChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value);
    else if (e.target.name === 'password') setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const data = { email, password };
    
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      let result = await response.json();
      // console.log("Success:", result);
      setUser(result)
      
      alert("Loged in successfully");
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    } 
    setEmail('');
  setPassword('');
};

  return (
    <div>
      
      

      
      
      <div className="h-screen pt-16 pb-16  justify-center flex bg-gray-200 ">
        
          <div className="bg-white w-[450px] h-[500px] rounded-l-3xl">
            <h1 className={`text-5xl  text-blue-500  mt-10 ml-14`}>InstaAmigo</h1>
            <h1 className={`text-md  text-gray-500  mt-5 ml-14`}>Log in to your account to continue</h1>
            <h1 className={`text-sm  text-gray-300  mt-5 ml-14`}>Welcome Back</h1>
            <form onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col items-left justify-center ">
                <div className="mt-2 ml-14">
                  {/* <MdEmail className="text-blue-950 text-2xl mt-11 mr-2" /> */}
                  <label className={`text-sm  text-gray-500  `}>Email Address</label>

                  <div className="mt-2">
                    <input autoComplete="off" onChange={handleChange} placeholder='Email' value={email} id="email" name="email" type="email" autocomplete="email" required className="border-2 bg-white border-gray-300 block w-[330px] h-10 rounded-full py-6 px-2 text-gray-900 shadow-sm " />
                  </div>
                </div>
                <div className="mt-2 ml-14">
                  {/* <RiLockPasswordFill className="text-blue-950 text-2xl mt-6 mr-2" /> */}
                  <label className={`text-sm  text-gray-500  `}>Password</label>
                  <div className="relative ml-[-10px] rounded-lg w-[330px] h-9 mx-auto mt-2 px-2">
                    <input
                    autoComplete="off"
                      type='password'
                      placeholder="Password"
                      className="border-2 bg-white border-gray-300 block w-[330px] h-10 rounded-full py-6 px-2 text-gray-900 shadow-sm "
                      onChange={handleChange} value={password} id="password" name="password" autocomplete="password" required
                    />
                    
                  </div>
                </div>
                <h1 className="text-slate-400 ml-56 mt-5 hover:text-slate-600">Forget Password</h1>
                <button className={`bg-blue-950 ml-14 w-[330px] text-white rounded-lg px-7 py-2  mt-4 border-2 border-blue-950 hover:bg-white hover:text-blue-950 hover:border-2 hover:border-blue-950`}>
                  Log in
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</a>
            </p>
            
          </div>
          <div className="bg-white w-[450px] h-[500px] rounded-r-3xl flex items-center justify-center">
  <img className='rounded-full' width={300} src={Logo} alt="Logo" />
</div>
        </div>
      {/* </div> */}
    </div >
  );
};

export default Login;
