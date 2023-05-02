import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../AddBlogPost.css';

const AddBlogPost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ]
  };

  const editorFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'size', 'color', 'background',
    'link'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const blogPostData = {
      title,
      content,
    };

    try {
      await axios.post(`${BASE_URL}/blog`, blogPostData, config);
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div className="add-blog-post-container">
      <h1>Add Blog Post</h1>
      <p>Enter the details of your new blog post.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="content">Content:</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={editorModules}
          formats={editorFormats}
          className="content-editor"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlogPost;
