import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Loader from "../components/Loader/Loader";
import { requestPostsBySearchTerm } from "../services/api";

import { PostsList } from "../App.styled";

function SearchPostsPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  console.log("location: ", location); // CTRL + SHIFT + L
  const searchInputRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("query"); // qwe | null

  useEffect(() => {
    if (!queryValue) return;

    const fetchPosts = async (queryValue) => {
      try {
        setIsLoading(true);

        const post = await requestPostsBySearchTerm(queryValue); // {id: ..., title: ..., body: ...,}

        setPosts([post]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts(queryValue);
  }, [queryValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchInputRef.current.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={searchInputRef} type="text" placeholder="Enter keyword" />
        <button type="submit">Search</button>
      </form>

      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      <PostsList>
        {posts !== null &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <Link state={{ from: location }} to={`/posts/${post.id}`}>
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

export default SearchPostsPage;
