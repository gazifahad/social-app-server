import express from 'express';
import { getPostsBySearch,getPosts,createPost,updatePost,likePost,deletePost} from '../controllers/post.js'
import auth from '../middleware/auth.js';
const router =express.Router();
router.get('/search',  getPostsBySearch)
router.get('/', getPosts)
router.post('/',auth, createPost)
router.patch('/:id',auth, updatePost)
router.patch('/:id/likePost',auth,likePost)
router.delete('/:id',auth,deletePost)
export default router;