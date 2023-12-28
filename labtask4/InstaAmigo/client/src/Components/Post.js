import React from "react";

function Post({ posts }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
        <div className="p-6">
          <div className="flex text-sm font-semibold text-gray-500 mb-2">
            <p>{posts.name}</p>
            <div className="flex space-x-2 ml-auto">
              <p>{new Date(posts.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <img
            src={posts.photo}
            alt="post image"
            className="w-full h-auto object-cover mb-4"
            style={{ maxHeight: "300px" }} 
          />
          <h1 className="text-xl lg:text-2xl font-bold text-blue-500 mb-4">{posts.title}</h1>
          <p className="text-sm lg:text-base">{posts.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
