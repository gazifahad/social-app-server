import express from 'express';
import { getPostsBySearch,getPosts,getPost,createPost,updatePost,likePost,commentPost,deletePost} from '../controllers/post.js'
// 6:53
import auth from '../middleware/auth.js';
const router = express.Router();
router.get('/search',  getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/',auth, createPost)
router.patch('/:id',auth, updatePost)
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)
router.delete('/:id',auth,deletePost)
export default router;