import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { Loader } from "../components";
import { setDetails, setError, setIsLoading } from "../redux/postsSlice";
// import Loader from "../components/Loader/Loader";
import { requestPostDetails } from "../services/api";
// import PostCommentsPage from "./PostCommentsPage";

const PostCommentsPage = lazy(() => import("./PostCommentsPage"));

function PostDetailsPage() {
  const details = useSelector((state) => state.postsData.postDetails);
  const isLoading = useSelector((state) => state.postsData.isLoading);
  const error = useSelector((state) => state.postsData.error);
  const dispatch = useDispatch();
  const location = useLocation();

  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const fetchPostDetails = async (postId) => {
      try {
        dispatch(setIsLoading(true));

        const details = await requestPostDetails(postId);

        dispatch(setDetails(details));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchPostDetails(postId);
  }, [dispatch, postId]);

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
