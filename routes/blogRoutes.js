const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

//blog route
router.get('/', blogController.blog_index);

//post
router.post('/', blogController.blog_create_post);

router.post('/search', blogController.blog_search)


router.get('/create', blogController.blog_create_get);


//get
router.get('/:id', blogController.blog_details);

//delete
router.delete('/:id', blogController.blog_delete);

//delete all
router.delete('/', blogController.blog_delete_all);
 


module.exports = router;