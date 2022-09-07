const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');


//======================================
//      Subscribe
//======================================

//구독자 수 가져오기
router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        });

});


//접속유저 구독상태 가져오기
router.post("/subscribed", (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            console.log("접속유저 구독상태 가져오기");
            let result = false;
            if (subscribe.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, subscribed: result });
        });

});


module.exports = router;