const isAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.redirect('/Login');
};

module.exports = isAuth;
