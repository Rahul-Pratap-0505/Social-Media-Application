import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userId,
        tags: tags,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Delhi",
    body: "Hi Friends,I am going to Delhi for my vacations , Hope to enjoy a lot. Peace Out ",
    reactions: 2,
    userID: "user-9",
    tags: ["Vacation", "Delhi", "Enjoying"],
  },

  {
    id: "2",
    title: "Pass Ho gye Bhai",
    body: "4 saal ki masti k baad bhi ho gye hain pass .Hard to believe ",
    reactions: 15,
    userID: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
];
export default PostListProvider;
