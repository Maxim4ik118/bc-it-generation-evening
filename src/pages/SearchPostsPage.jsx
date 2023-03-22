import React, { useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader/Loader";

import { selectIsLoadingPosts, selectPosts, selectPostsError } from "../redux/selectors";
import { fetchPostsBySearchTerm } from "../redux/postsSlice";

import { PostsList } from "../App.styled";

function SearchPostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoadingPosts);
  const error = useSelector(selectPostsError);
  
  const location = useLocation();
  const searchInputRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("query"); // qwe | null

  useEffect(() => {
    if (!queryValue) return;

    dispatch(fetchPostsBySearchTerm(queryValue));
  }, [dispatch, queryValue]);

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
