const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");


/*1.인증확인 처리
role 1 어드민  role 2 특정 부서 어드민
rele 0 -> 일반유저 ,  role 0 이 아니면 관리자.
*/
router.post("/auth", auth, (req, res) => {

    //auth 미들웨어 통해 인증 처리되었으면 Authentication 가 True 이다.
    //따라서, 다음과 같이 유저 정보를 반환 처리한다.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
    })
});


/*2. 회원등록 처리*/
router.post("/register", (req, res) => {
    const user = new User(req.body);
    console.log("저장할 user :", user);

    //몽고 DB 에 설정된 save  사용한다. 이때  models/User.js  에서 userSchema.pre('save') 호출하면서
    //저장 처리를 진행 한다.
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });

});



/**3. 로그인처리 */
router.post("/login", (req, res) => {
    //1)요청한 이메일을 DB 에서 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });


        //2)요청한 이메일이 DB에 있다면 비밀번호가 맞는지 비교
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

            //3)비밀번호까지 같다면 Token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //4)토큰을 쿠키에 저장한다.
                res.cookie("w_authExp", user.tokenExp);
                res.cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });

    });
});


/*4. 로그아웃 처리*/
router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



module.exports = router;