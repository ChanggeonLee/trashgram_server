module.exports = (app, passport) => {

  // app.get('/auth', (req, res, next) => {
    
  //   res.json('signin');
  // });
  
  // facebook login
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {
      var info = {
        flag:'login'
      }
      res.json(flag);
    }
  );

  // logout
  app.get('/signout', (req, res) => {
    var info = {
      flag:'logout',
    }
    req.logout();
    req.flash('success', '로그아웃 성공~');
    res.json(info);
  });
};