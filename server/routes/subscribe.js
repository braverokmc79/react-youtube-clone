const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');
const { Video } = require("../models/Video");

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


//구독하기
router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);
    subscribe.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true });
    });
});


//구독취소하기
router.post("/unSubscribe", (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


//구독 페이지
router.post("/getSubscriptionVideos", (req, res) => {

    //1.자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec((err, subscriberInfo) => {
            if (err) return res.status(400).json({ success: false, err });


            let subscribedUser = [];

            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
            });


            //2.찾은 사람들의 비디오를 가지고 온다.
            Video.find({ writer: { $in: subscribedUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos });
                })

        });

});



module.exports = router;