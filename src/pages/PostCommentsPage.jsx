import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsList } from "../App.styled";
import Loader from "../components/Loader/Loader";
import { requestPostComments } from "../services/api";

function PostCommentsPage() {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (postId === null) return;

    const fetchComments = async (postId) => {
      try {
        setIsLoading(true);
  
        const comments = await requestPostComments(postId);
  
        setComments(comments);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments(postId);
  }, [postId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      {comments !== null && (
        <CommentsList>
          {comments.map(comment => {
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
