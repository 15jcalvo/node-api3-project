const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method)
  console.log(req.url)
  console.log(Date.now())
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const possibleUser = await Users.getById(req.params.id)
    if (possibleUser) {
      req.user = possibleUser
      next()
    } else {
      next({ status: 404, message: "user not found" })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
