const router = require('express').Router();
const { Post, Comment } = require('../../models');
// get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});
// update post
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
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});
// delete post
router.delete('/:id', async (req, res) => {
  try {
    // Get all of the comments for the post.
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    // Delete all of the comments.
    await Promise.all(comments.map((comment) => comment.destroy()));

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
