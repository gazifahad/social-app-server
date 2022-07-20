import express from 'express';
import { getPostsBySearch,getPosts,getPost,createPost,updatePost,likePost,deletePost} from '../controllers/post.js'
import auth from '../middleware/auth.js';
const router = express.Router();
router.get('/search',  getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/',auth, createPost)
router.patch('/:id',auth, updatePost)
router.patch('/:id/likePost',auth,likePost)
router.delete('/:id',auth,deletePost)
export default router;