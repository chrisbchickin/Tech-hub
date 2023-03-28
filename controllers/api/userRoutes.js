const router = require('express').Router();
const { User } = require('../../models');

const checkPassword = (userPass, reqPass) => {
  const boolean = userPass === reqPass;
  return boolean;
}

router.get('/', async (req, res) => {
    try {
        let allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData, { test:'test' });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    const dbPassword = userData.dataValues.password;
    const reqPassword = req.body.password;

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await checkPassword(dbPassword, reqPassword);
      
      
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!'});
    });

  } catch (err) {
    res.status(400).json(err);
    console.log(err);
    console.log('there was an error');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;