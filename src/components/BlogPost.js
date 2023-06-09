import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import mongoose from 'mongoose';
import "../App.css";
import "../BlogPost.css";

const BlogPost = ({ token }) => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      const res = await axios.get(`${BASE_URL}/blog/${id}`);
      setBlogPost(res.data.blogPost);
      setComments(res.data.comments);
    };
    fetchBlogPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author = token ? blogPost.author._id : new mongoose.Types.ObjectId();
    const res = await axios.post(`${BASE_URL}/blog/${id}/comment`, { content, author });
    setComments([...comments, res.data]);
    setContent('');
  };

  const handleDelete = async (commentId) => {
    await axios.delete(`${BASE_URL}/blog/${id}/comment/${commentId}`);
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  return (
    <div className="blogpost-container">
      {blogPost ? (
        <>
          <h1>{blogPost.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          <h2>Comments</h2>
          <div className="comments-container">
            {comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <p>{comment.content}</p>
                <small>Posted by {token ? comment.author.email : comment.author}</small>
                {token && (
                  <button className="delete-button" onClick={() => handleDelete(comment._id)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={content}
              className="comment-input"
              onChange={(e) => setContent(e.target.value)}
            />
            <button>Post Comment</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPost;