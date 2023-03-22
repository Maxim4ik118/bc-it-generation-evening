import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader/Loader";

import { fetchPosts } from "../redux/postsSlice";

import { PostsList } from "../App.styled";
import { selectIsLoadingPosts, selectPosts, selectPostsError } from "../redux/selectors";

function PostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoadingPosts);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts());
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
