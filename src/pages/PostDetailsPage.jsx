import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { Loader } from "../components";
// import Loader from "../components/Loader/Loader";
import { requestPostDetails } from "../services/api";
// import PostCommentsPage from "./PostCommentsPage";

const PostCommentsPage = lazy(() => import("./PostCommentsPage"));

function PostDetailsPage() {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

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

  const backLinkHref = location.state?.from ?? "/posts";

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <h1>PostDetails</h1>
      <Link to={backLinkHref}>Go back</Link>
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
      <NavLink state={{ from: location.state?.from }} to="comments">
        Comments
      </NavLink>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<PostCommentsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default PostDetailsPage;
