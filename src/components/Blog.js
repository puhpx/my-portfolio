import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import "../App.css";

const BlogPage = ({ token, setToken }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blog`);
        setBlogPosts(res.data);
        setFilteredBlogPosts(res.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (token) {
        try {
          const config = { headers: { "x-auth-token": token } };
          const res = await axios.get(`${ BASE_URL }/user`, config);
          setUserEmail(res.data.email);
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      }
    };
    fetchUserEmail();
  }, [token]);

  useEffect(() => {
    const searchBlogPosts = () => {
      if (searchTerm.length > 2) {
        const regex = new RegExp(searchTerm, 'gi');
        const filtered = blogPosts.filter(post => post.title.match(regex) || post.content.match(regex));
        setFilteredBlogPosts(filtered);
      } else {
        setFilteredBlogPosts(blogPosts);
      }
    };
    searchBlogPosts();
  }, [searchTerm, blogPosts]);

  const highlightSearchTerm = (text) => {
    if (searchTerm.length > 2) {
      const regex = new RegExp(searchTerm, 'gi');
      return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    return text;
  };

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

  const formatSummary = (content) => {
    return content.replace(/<br\/>/g, ' ').slice(0, 250);
  };

  return (
    <div className="blog-container">
      <h1>My Blog</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a blog post..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="blog-actions">
          {!token && (
            <>
              <button className="btn" onClick={handleSignUp}>
                Sign Up
              </button>
              <button className="btn" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
          {token && (
            <div>
              <span>{userEmail}</span>
              <ul>
                <li>
                  <button className="btn" onClick={handleAddBlogPost}>
                    Add Blog Post
                  </button>
                </li>
                <li>
                  <button className="btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="blog-grid">
          {filteredBlogPosts.map((blogPost) => (
            <div key={blogPost._id} className="blog-card">
              <Link to={`/blog/${blogPost._id}`} className="blog-title" dangerouslySetInnerHTML={{__html: highlightSearchTerm(blogPost.title)}}></Link>
              <p className="blog-content" dangerouslySetInnerHTML={{__html: highlightSearchTerm(formatSummary(blogPost.content.slice(0, 250))) + '...'}}></p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default BlogPage;