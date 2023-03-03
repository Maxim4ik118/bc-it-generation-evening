import React, { useContext, useEffect, useState } from "react";

import Details from "./components/Details/Details";

import { requestPostComments, requestPosts } from "./services/api";
import Loader from "./components/Loader/Loader";

import "./App.css";
import { CommentsList, ListsContainer, PostsList } from "./App.styled";
import { DetailsContext } from "./context/DetailsContext";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList from "./components/ProductList/ProductList";

// const productsData = [
//   {
//     id: "3", // "3" !== "2" - true
//     title: "Tacos With Lime M",
//     price: 5.85,
//     discount: 15,
//   },
//   {
//     id: "1", // "1" !== "2" - true
//     title: "Tacos With Lime XXL",
//     price: 10.99,
//     discount: 30,
//   },
//   {
//     id: "2", // "2" !== "2" - false
//     title: "Tacos With Lime XL",
//     price: 6.99,
//     discount: false,
//   },
// ];

/* 

Компонент перемальовується(рендериться) коли:
1. В ньому змінився стейт(setState)
2. В нього прийшли нові пропси

*/

const App = () => {
 const [selectedPostId, setSelectedPostId] = useState(null);

  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showDetails, setShowDetails } = useContext(DetailsContext);


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

  useEffect(() => {
    if (selectedPostId === null) return;

    const fetchPostComments = async (postId) => {
      try {
        setIsLoading(true);
        const comments = await requestPostComments(postId);

        setComments(comments);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostComments(selectedPostId);
  }, [selectedPostId]);

  const handleSelectPostId = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setComments(null);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <button onClick={() => setShowDetails((prev) => !prev)}>
        Toggle details
      </button>
      {showDetails && (
        <Details text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, numquam!" />
      )}

      <ProductForm />
      <ProductList />


      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... {error}</p>}
      <ListsContainer>
        <PostsList>
          {posts !== null &&
            posts.map((post) => {
              return (
                <li
                  key={post.id}
                  onClick={() => handleSelectPostId(post.id)}
                  className={selectedPostId === post.id ? "selected" : ""}
                >
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
                </li>
              );
            })}
        </PostsList>
        {comments !== null && (
          <CommentsList>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <h3>{comment.name}</h3>
                  <p>
                    <b>Email: </b> {comment.email}
                  </p>
                  <p>
                    <b>Body: </b>
                    <i>{comment.body}</i>
                  </p>
                </li>
              );
            })}
          </CommentsList>
        )}
      </ListsContainer>
    </div>
  );
};

export default App;
