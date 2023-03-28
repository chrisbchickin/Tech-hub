const router = require('express').Router();
const { Post, Comment } = require('../../models');
// get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({ 
      include: [
        {
          model: Comment,
        }
      ]
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
})
// get one post
router.put('/:post_id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.post_id,
        },
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json(error);
    console.log(error); 
  }
});
// create post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});
// delete post
router.delete('/:id', async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
