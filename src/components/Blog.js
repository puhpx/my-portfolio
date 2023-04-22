import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await axios.get('/api/blog');
      setBlogPosts(res.data);
    };
    fetchBlogPosts();
  }, []);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // Remove the auth token from the local storage
    localStorage.removeItem('authToken');

    // Set isLoggedIn to false
    setIsLoggedIn(false);
  };

  const handleAddBlogPost = () => {
    navigate("/add-blog-post");
  };

  return (
    <div>
      <h1>Blog Page</h1>
      <input
        type="text"
        placeholder="Search for a blog post..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!isLoggedIn && (
        <>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button onClick={handleAddBlogPost}>Add Blog Post</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <ul>
        {blogPosts.map((blogPost) => (
          <li key={blogPost._id}>
            <Link to={`/blog/${blogPost._id}`}>{blogPost.title}</Link>
            <p>{blogPost.content.slice(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
