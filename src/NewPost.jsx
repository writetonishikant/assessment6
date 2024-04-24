import { useEffect, useState } from "react";
import axios from 'axios';

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    try {
      if (!newPost.title || !newPost.category || !newPost.description || !newPost.date) {
        setError("Please fill in all fields.");
        return;
      }

      const response = await axios.post('http://localhost:5000/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({
        title: "",
        category: "",
        description: "",
        date: "",
      });
      setError("");
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Error adding post. Please try again later.');
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post. Please try again later.');
    }
  };

  return (
    <>
      <h4 className="text-dark pb-2">Add New Posts</h4>
      <div className="row g-3">
        <div className="col-6">
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Title"
            className="form-control"
          />
        </div>
        <div className="col-6">
          <select
            value={newPost.category}
            onChange={(e) =>
              setNewPost({ ...newPost, category: e.target.value })
            }
            className="form-control"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Hotels">Hotels</option>
            <option value="Nature">Nature</option>
          </select>
        </div>
        <div className="col-6">
          <input
            type="textarea"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            placeholder="Description"
            className="form-control"
          />
        </div>
        <div className="col-6">
          <input
            type="date"
            value={newPost.date}
            onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <button onClick={addPost} className="btn btn-secondary">
            Add Post
          </button>
          {error && <p className="text-danger mt-2 mb-0">{error}</p>}
        </div>
      </div>
      {posts.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.description}</td>
                <td>{post.date}</td>
                <td>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts yet.</p>
      )}
    </>
  );
};

export default NewPost;
