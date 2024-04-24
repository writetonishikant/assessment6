// PostList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts"); // Replace '/api/posts' with your actual endpoint
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h4 className="text-dark pb-2">Your Blog</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <React.Fragment>
          {posts.length === 0 ? (
            <div>
              <p>No posts available.</p>
              <Link to="/newpost">
                <button className="btn btn-secondary">Create New Post</button>
              </Link>
            </div>
          ) : (
            <div className="row">
              {posts.map((post) => (
                <div className="col-4" key={post.id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-title">{post.title}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {post.category}
                      </h6>
                      <p className="card-text">{post.description}</p>
                      <p className="card-text">
                        <small className="text-muted">Date: {post.date}</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default PostList;
