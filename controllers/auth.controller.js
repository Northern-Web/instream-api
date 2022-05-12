const config = require("./../config/config.js");
const {User}   = require("./../models/user.model");
var jwt      = require("jsonwebtoken");
var bcrypt   = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    name:     req.body.name,
    email:    req.body.email,
    company:  req.body.company,
    password: bcrypt.hashSync(req.body.password, 8),
    country:  req.body.country,
    isActive: true
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 500,
        "status": "Error",
        "message": err
      });
    }

    return res.status(201).json({
      "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
      "code": 201,
      "status": "Success",
      "message": "User was registered successfully!"
    });
  });
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
    if (err) {
      return res.status(500).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 500,
        "status": "Error",
        "message": err
      });
    }

    if (!user) {
      return res.status(404).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 404,
        "status": "Error",
        "message": "User not found."
      });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
        "code": 401,
        "status": "Error",
        "accessToken": null,
        "message": "Incorrect email or password!"
      });
    }

    var token = jwt.sign({ id: user.id, },
    global.gConfig.jwt_secret, {
      expiresIn: 86400 // 24 hours
    });

    return res.status(200).json({
      "api": `${global.gConfig.app_desc} v.${global.gConfig.app_ver}`,
      "code": 200,
      "status": "Success",
      "accessToken": token,
      "message": "Successful login!"
    });

  })
}
