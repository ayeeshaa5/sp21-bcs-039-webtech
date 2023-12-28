import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../images/insta.png'
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chngpassword, setChngPassword] = useState("");
  const [error,setError]=useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "chngpassword") setChngPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Hellooooo')
    if (password !== chngpassword) {
      alert("Password doesn't match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const data = { name, email, password};
    
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      console.log("Success:", result);
      alert("User added successfully");
      navigate("/");
    } catch (error) {
      // console.error("Error:", error);
      // setError(!error)
      alert('something went wrong')
    }
    
    setName("");
    setEmail("");
    setPassword("");
    
  };

  return (
    <div>
      
      <div className="h-screen pt-14 pb-16  justify-center flex  bg-gray-200 ">
        <div className=" bg-white w-[450px] h-[500px] rounded-l-3xl ">
          <h1 className={`text-3xl  text-blue-500  mt-5 font-bold ml-14 `}>
            Sign up
          </h1>
          <form className="space-y-1 pt-5 ml-14 ">
            <div className="justify-center ">
              <div>
                <label
                  for="name"
                  className={` block text-md font-medium  text-blue-500  `}
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={name}
                    id="name"
                    name="name"
                    type="name"
                    autocomplete="name"
                    required
                    className="block w-[330px] h-9 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className={` block text-md font-medium  text-blue-500  `}
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    className="block w-[330px] h-9 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            
            <div className="justify-center">
              <div>
                <label
                  for="password"
                  className={` block text-md font-medium  text-blue-500  `}
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    className="block w-[330px] h-9 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="chngpassword"
                  className={` block text-md font-medium  text-blue-500 `}
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={chngpassword}
                    id="chngpassword"
                    name="chngpassword"
                    type="password"
                    autocomplete="current-password"
                    required
                    className="block w-[330px] h-9 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-1 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            
            {/* {error && <p className=" text-red-600">Something went wrong. Try again.</p>} */}
            <div className="flex ">
              <button
                onClick={handleSubmit}
                
                className="flex  mt-4 justify-center w-[330px] rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?
            <a
              href="/LogIn"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
        <div className="bg-white w-[450px] h-[500px] rounded-r-3xl flex items-center justify-center">
  <img className='rounded-full' width={300} src={Logo} alt="Logo" />
</div>
      </div>
    </div>
  );
};

export default SignUp;
