// data.jsx

export const user = {
    id: 1,
    username: 'dummy_user',
    fullName: 'Dummy User',
    email: 'dummy.user@example.com',
    bio: 'This is a dummy user account for the social media app.',
    profileImage: 'https://example.com/dummy_user_profile.jpg',
    posts: [
      {
        id: 1,
        caption: 'Hello, world!',
        imageUrl: 'https://example.com/post1.jpg',
        likes: 15,
        comments: [
          {
            id: 1,
            userId: 2,
            username: 'another_user',
            text: 'Nice post!',
          },
          // More comments...
        ],
      },
      // More posts...
    ],
    followers: [
      {
        id: 2,
        username: 'follower1',
        fullName: 'Follower One',
        profileImage: 'https://example.com/follower1_profile.jpg',
      },
      // More followers...
    ],
    following: [
      {
        id: 3,
        username: 'following1',
        fullName: 'Following One',
        profileImage: 'https://example.com/following1_profile.jpg',
      },
      // More following...
    ],
  };
  
  export default user;
  