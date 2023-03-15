import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader/Loader";

import { requestPosts } from "../services/api";
import { setError, setIsLoading, setPosts } from "../redux/postsSlice";

import { PostsList } from "../App.styled";

function PostsPage() {
  const posts = useSelector((state) => state.postsData.posts);
  const isLoading = useSelector((state) => state.postsData.isLoading);
  const error = useSelector((state) => state.postsData.error);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(setIsLoading(true));

        const posts = await requestPosts();

        dispatch(setPosts(posts));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      <PostsList>
        {posts !== null &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  {/* /posts/[id] */}
                  <h3>{post.title}</h3>
                  <p>
                    <b>Body:</b> {post.body}
                  </p>
                  <p>
                    <b>PostId:</b>
                    {post.id}
                  </p>
                  <p>
                    <b>UserID:</b>
                    {post.userId}
                  </p>
                </Link>
              </li>
            );
          })}
      </PostsList>
    </div>
  );
}

export default PostsPage;
