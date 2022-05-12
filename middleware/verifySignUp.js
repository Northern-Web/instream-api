const { User } = require("./../models/user.model");

checkDuplicateSignUp = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    if (user) {
      res.status(400).send({message: "Unable to sign up."});
      return;
    }
    next();
  });
}

const verifySignUp = {
  checkDuplicateSignUp
};
module.exports = verifySignUp;
