const { User } = require("./../models/user.model");
const jwt = require("jsonwebtoken");

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  user.delete(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "User was successfully deleted."
    });
  });
};

exports.patch = async (req, res, next) => {
  const id   = req.params.id;
  const data = req.body;

  User.findOneAndUpdate({ _id: id }, data).then(() => {
    return res.status(200).json({
      "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
      "code": 200,
      "status": "Success",
      "message": "User was successfully updated."
    });
  });
};

exports.find = async (req, res, next) => {
  var options = {};
  var query   = {};

  options.limit = parseInt(req.query.limit) || 50;
  options.skip  = parseInt(req.query.skip)  || 0;

  if (req.query.orderBy) {
    options.sort = req.query.orderBy;
  }

  if (req.query.order) {
    if (req.query.order == "desc") {
      options.sort = "-" + req.query.orderBy;
    }
  }

  if (req.query.id) {
    query["_id"] = req.query.id;
  }

  if (req.query.name) {
    query["name"] = req.query.name;
  }

  if (req.query.email) {
    query["email"] = req.query.email;
  }

  if (req.query.company) {
    query["company"] = req.query.company;
  }

  if (req.query.country) {
    query["country"] = req.query.country;
  }

  if (req.query.isActive) {
    query["isActive"] = req.query.isActive;
  }


  User.find(query)
  .setOptions(options)
  .exec(function (err, users) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 500,
        "status": "Server Error",
        "message": "A problem occured when fetching users."
      });
    } else {
      return res.status(200).json({
        "api": `${process.env.APP_DESC} v.${process.env.APP_VER}`,
        "code": 200,
        "status": "Success",
        "filters": options,
        "documents": users.length,
        "data": users
      });
    }
  })

};
