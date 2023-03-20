import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../components";
import {
  fetchComments,
} from "../redux/postsSlice";

import { CommentsList } from "../App.styled";

function PostCommentsPage() {
  const comments = useSelector((state) => state.postsData.comments);
  const isLoading = useSelector((state) => state.postsData.isLoading);
  const error = useSelector((state) => state.postsData.error);
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    if (postId === null) return;

    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      {comments !== null && (
        <CommentsList>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <h3>UserName: {comment.name}</h3>
                <p>
                  <b>Email:</b> {comment.email}
                </p>
                <p>
                  <b>Body:</b> {comment.body}
                </p>
              </li>
            );
          })}
        </CommentsList>
      )}
    </div>
  );
}

export default PostCommentsPage;
