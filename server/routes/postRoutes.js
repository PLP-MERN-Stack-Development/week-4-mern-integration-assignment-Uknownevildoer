import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  commentPost,
} from '../controllers/postController.js';

import upload from '../middleware/multer.js';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  createPost
);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/comments', commentPost);

export default router;
