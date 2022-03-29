const checkSession = async (req, res, next) => {
  if (!req.session.loggedin) {
    return res.redirect("/login");
  }
  next();
};

const checkLogin = async (req, res, next) => {
  res.body= {token}
  if(token){
    next()
  }
return res.redirect("/login")
}


exports.checkSession = checkSession;
