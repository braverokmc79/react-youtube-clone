const { User } = require("../models/User");
/** 인증 처리를 하는 곳 */
let auth = (req, res, next) => {

    //1.클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.w_auth;

    console.log("w_auth token : ", token);

    //2.토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        //3.유저가 없으면 인증 No !
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        //4.유저가 있으면 인증 Okey
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth };