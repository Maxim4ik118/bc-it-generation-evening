import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader/Loader";

import { requestPosts } from "../services/api";

import { PostsList } from "../App.styled";

function PostsPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const posts = await requestPosts();

        setPosts(posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
