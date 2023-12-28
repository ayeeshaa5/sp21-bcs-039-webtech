import React from "react";
import { ImCross } from "react-icons/im";
import Navbar from '../Components/Navbar';
const EditPost = () => {
  const [cat, setCat] = React.useState("");
  const [cats, setCats] = React.useState([]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  return (
    <div>
      
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Edit a Post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2"
          />
          <input type="file" className="" />
          <p>or</p>
          <textarea
            className="px-4 py-2 h-56 "
            placeholder="Write your post "
          />
          <div className="flex flex-col ">
            <div className="flex items-center space-x-4 md:space-x-8 mb-5">
            <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold mb-5">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
