import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await axios.get('/api/blog');
      setBlogPosts(res.data);
    };
    fetchBlogPosts();
  }, []);

  return (
    <div>
      <h1>Blog Page</h1>
      <p>This is my blog page.</p>
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
