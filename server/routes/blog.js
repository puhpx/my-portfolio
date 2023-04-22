const router = require('express').Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.get('/blog', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'email');
    res.json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/blog', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: 'All fields are required' });

    const newBlogPost = new BlogPost({
      title,
      content,
      author: req.user.id,
    });

    const blogPost = await newBlogPost.save();
    res.json(blogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'email');
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

    const comments = await Comment.find({ blogPost: blogPost._id }).populate('author', 'email');
    res.json({ blogPost, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/blog/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: 'All fields are required' });

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedBlogPost)
      return res.status(404).json({ message: 'Blog post not found' });

    res.json(updatedBlogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/blog/:id', auth, async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

    if (blogPost.author.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(401).json({ message: 'Not authorized' });

    await blogPost.remove();
    res.json({ message: 'Blog post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/blog/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: 'Content is required' });

    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

    const newComment = new Comment({
      content,
      author: req.user.id,
      blogPost: blogPost._id,
    });

    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/blog/:id/comment', async (req, res) => {
  try {
    const comments = await Comment.find({ blogPost: req.params.id }).populate('author', 'email');
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/blog/:id/comment/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(401).json({ message: 'Not authorized' });

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

