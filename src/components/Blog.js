import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const BlogPage = ({ token, setToken }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await axios.get(`${BASE_URL}/blog`);
      setBlogPosts(res.data);
    };

    const fetchUserEmail = async () => {
      if (!token) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${BASE_URL}/blog/users/me`, config);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogPosts();
    fetchUserEmail();
  }, [token]);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
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
      {!token && (
        <>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {token && (
        <div>
          <span>{email}</span>
          <ul>
            <li>
              <button onClick={handleAddBlogPost}>Add Blog Post</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
      <ul>
        {blogPosts.map((blogPost) => (
          <li key={blogPost._id}>
            <Link to={`/blog/${blogPost._id}`}>{blogPost.title}</Link>
            <p>{blogPost.content.slice(0, 10)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
