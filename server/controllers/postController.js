import Post from '../models/Post.js';
import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

// GET /api/posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:id
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// POST /api/posts
export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, content, category, author } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const post = await Post.create({ title, content, category, image, author });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  const { title, content, category } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

// POST /api/posts/:id/comments
export const commentPost = async (req, res, next) => {
  const { user, text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user, text, date: new Date() });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
