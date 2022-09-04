const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcd!!!333";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

});

//1. 토큰을 복호화 한후 유저를 찾는다. 사용법 :  //https://www.npmjs.com/package/jsonwebtoken
userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    //decoded + SECRET_KEY = tokne 생성 => 아이디와 생성된 토큰으로 몽고DB 함수 findOne() 으로 유저를 조회 처리후, 유저가 존재하면 유저정보를 콜백반환처리
    //user._id+'abcd!!!333'= tokne 생성
    jwt.verify(token, SECRET_KEY, function (err, decoded) { //여기서 decoded 는 user._id 이다.

        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return callback(err);
            callback(null, user);
        });

    });
}


//2.DB에 저장하기 전에 실행한다.
userSchema.pre('save', function (next) {
    const user = this;

    //비밀번호가 변환될때만 다음을 실행하며, 비밀번호가 아닌것은 next()
    if (user.isModified('password')) {

        //비밀번호를 암호와 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
})



/*3.로그인 처리시 comparePassword 커스텀 함수 생성  (userSchema.methods+함수명)  */
userSchema.methods.comparePassword = function (plainPassword, callback) {
    //plainPassword 비밀번호가 12345 일때,   this.password 는 암호화된 비밀번호 $2b$10$LK86g2vaPNMHVLkj69hO7uzodTXATNMezdKnWymKi8QoTX9pE3bey
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        else return callback(null, isMatch);
    });
}


/*4.로그인 처리 - 토큰 발행 - jsonwebtoken 사용법 :  //https://www.npmjs.com/package/jsonwebtoken  */
userSchema.methods.generateToken = function (cb) {
    const user = this;

    //jwt.sign({ foo: 'bar' }, 'shhhhh');  shhhhh 는 임이 문자이다. jwt.sign 을 이용해서 token 을 생성한다.
    const token = jwt.sign(user._id.toHexString(), SECRET_KEY);

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    });
}



const User = mongoose.model('User', userSchema);

module.exports = { User }
