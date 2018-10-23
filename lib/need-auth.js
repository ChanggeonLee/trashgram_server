// 로그인을 확인 할수 있는 모듈
module.exports = function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json('nologin');
  }
}