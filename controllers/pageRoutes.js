const router = require('express').Router();
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username',],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ]
                },
            ],
        });
        

        const post = postData.get({ plain: true });

        const isPersonalPost = req.session.user_id === postData.user_id;
        //res.json({ ...post, logged_in: req.session.logged_in })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            sessUser_id: req.session.user_id,
            isPersonalPost: isPersonalPost
        });
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
})

router.get('/login', async (req, res) => {
    try {
        res.render('login', { logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });
        const myPosts = userPosts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { myPosts, logged_in: req.session.logged_in });
        //res.status(200).json(myPosts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});



module.exports = router;