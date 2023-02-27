import React from "react";

import ProductList from "./components/ProductList/ProductList";
import Details from "./components/Details/Details";
import ProductForm from "./components/ProductForm/ProductForm";

import "./App.css";
import { requestPostComments, requestPosts } from "./services/api";
import { CommentsList, ListsContainer, PostsList } from "./App.styled";
import Loader from "./components/Loader/Loader";

const productsData = [
  {
    id: "3", // "3" !== "2" - true
    title: "Tacos With Lime M",
    price: 5.85,
    discount: 15,
  },
  {
    id: "1", // "1" !== "2" - true
    title: "Tacos With Lime XXL",
    price: 10.99,
    discount: 30,
  },
  {
    id: "2", // "2" !== "2" - false
    title: "Tacos With Lime XL",
    price: 6.99,
    discount: false,
  },
];

/* 

Компонент перемальовується(рендериться) коли:
1. В ньому змінився стейт(setState)
2. В нього прийшли нові пропси

*/

class App extends React.Component {
  state = {
    pressedKey: "",
    // products: JSON.parse(localStorage.getItem('products')) ?? [],
    showDetails: false,
    selectedPostId: null,
    // page: 1,
    // query: "",

    posts: null,
    comments: null,
    isLoading: false,
    error: null,
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };
  handleSetSearchQuery = (searchTerm) => {
    this.setState({ query: searchTerm });
  };

  componentDidMount() {
    const fetchPosts = async () => {
      try {
        this.setState({ isLoading: true });
        const posts = await requestPosts();

        this.setState({ posts });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    };

    fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.selectedPostId !== this.state.selectedPostId &&
      this.state.selectedPostId !== null
    ) {
      const fetchPostComments = async (postId) => {
        try {
          this.setState({ isLoading: true });
          const comments = await requestPostComments(postId);

          this.setState({ comments });
        } catch (error) {
          this.setState({ error: error.message });
        } finally {
          this.setState({ isLoading: false });
        }
      };

      fetchPostComments(this.state.selectedPostId);
    }

    // if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
    //   // Ваш запит на сервер за додатковими картинками
    // }
  }

  handlePressKey = (key) => {
    this.setState({ pressedKey: key });
  };

  handleToggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  handleSelectPostId = (postId) => {
    if (this.state.selectedPostId === postId) {
      this.setState({ selectedPostId: null, comments: null });
    } else {
      this.setState({ selectedPostId: postId });
    }
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleToggleDetails}>Toggle details</button>
        {this.state.showDetails && (
          <Details
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, numquam!"
            pressedKey={this.state.pressedKey}
            handlePressKey={this.handlePressKey}
          />
        )}

        {this.state.isLoading && <Loader />}
        {this.state.error !== null && (
          <p>Oops, some error occured... {this.state.error}</p>
        )}
        <ListsContainer>
          <PostsList>
            {this.state.posts !== null &&
              this.state.posts.map((post) => {
                return (
                  <li
                    key={post.id}
                    onClick={() => this.handleSelectPostId(post.id)}
                    className={
                      this.state.selectedPostId === post.id ? "selected" : ""
                    }
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
          {this.state.comments !== null && (
            <CommentsList>
              {this.state.comments.map((comment) => {
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
  }
}

export default App;
