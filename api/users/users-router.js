const express = require('express');
const Users = require('./users-model');
const Posts =  require('../posts/posts-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try { const { id, name } = req.body
  const newUser = Users.insert({ id, name })
  res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try { const { id, name } = req.body
  const updatedUser = Users.update({ id, name })
  res.status(200).json(updatedUser)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', logger, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', logger, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router
