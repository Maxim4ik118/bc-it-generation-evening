import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";

import Loader from "../components/Loader/Loader";
import { requestPostDetails } from "../services/api";
import PostCommentsPage from "./PostCommentsPage";

function PostDetailsPage() {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if(!postId) return;

    const fetchPostDetails = async (postId) => {
      try {
        setIsLoading(true);

        const details = await requestPostDetails(postId);

        setDetails(details);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails(postId);
  }, [postId]);
  
  

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <h1>PostDetails</h1>
      <br />
      Current postId: {postId}
      {Boolean(details) && (
        <div>
          <p>
            <b>Title:</b> {details.title}
          </p>
          <p>
            <b>Body:</b> {details.body}
          </p>
        </div>
      )}

      <NavLink to="comments">Comments</NavLink>

      <Routes>
        <Route path="comments" element={<PostCommentsPage />} />
      </Routes>
    </div>
  );
}

export default PostDetailsPage;
