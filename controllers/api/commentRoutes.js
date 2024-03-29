const router = require('express').Router();
const { Comment } = require('../../models');
// get all comments
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});
// create comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});
// update comment
router.put('/:comment_id', async (req, res) => {
    try {
      const updatedComment = await Comment.update(
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.comment_id,
          },
        }
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(400).json(error);
      console.log(error); 
    }
  });
// delete comment
router.delete('/:id', async (req, res) => {
  try {
    const CommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!CommentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(CommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
