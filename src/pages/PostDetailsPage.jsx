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

import { selectIsLoadingPosts, selectPostDetails, selectPostsError } from "../redux/selectors";
import {
  fetchPostDetails,
} from "../redux/postsSlice";

const PostCommentsPage = lazy(() => import("./PostCommentsPage"));

function PostDetailsPage() {
  const dispatch = useDispatch();
  const details = useSelector(selectPostDetails);
  const isLoading = useSelector(selectIsLoadingPosts);
  const error = useSelector(selectPostsError);
  
  const location = useLocation();
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    dispatch(fetchPostDetails(postId));
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
