const jwt = require("jsonwebtoken");
const createError = require('http-errors')
const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];

    //   let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    let decoded = jwt.verify(token, 'dsfasdfsdaf');
      console.log(decoded);
      next()
    } else {
        next(createError(400, 'server need token'))
    }
  } catch (error) {
      console.log(error.name);
    // console.log(error);
    if(error && error.name === 'JsonWebTokenError'){
        next(createError(400, 'token invalid'))
    }else if(error && error.name === 'TokenExpiredError'){
        next(createError(400, 'token expired'))
    }else{
        next(createError(400, 'Token not active'))
    }
  }
};
module.exports = {
  protect,
};
