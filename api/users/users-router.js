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

router.post('/', logger, validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try { const { id, name } = req.body
  const newUser = await Users.insert({ id, name })
  res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', logger, validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try { const { id, name } = req.body
  const updatedUser = await Users.update({ id, name })
  res.status(200).json(updatedUser)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try{
    const deletedUser = await Users.remove(req.params.id)
    res.json(deletedUser)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
    const posts = await Users.getUserPosts(req.params.id)
    if (posts.length > 0) {
      res.status(200).json(posts)
    } 
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try { const { id, postedBy, text } = req.body
  const newPost = await Posts.insert({ id, postedBy, text })
  res.status(201).json(newPost)
  } catch(err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router
