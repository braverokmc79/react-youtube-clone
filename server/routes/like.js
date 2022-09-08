const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');


//======================================
//      Like
//======================================

router.post("/getLikes", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
});




router.post("/getDisLikes", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
});


//좋아요 증가처리
router.post("/upLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable)

    //1.Like collection 에다가 클릭 정보를 넣는다.
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });

        //2. 만약에 Dislike 가 이미 클릭이 되었다면, Dislike을 1 줄여준다.
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })

    })

});


//좋아요 취소처리
router.post("/unLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true })
        })

});



//싫어요 감소 처리
router.post("/unDislike", (req, res) => {


    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true })
        });

});



//싫어요 증가 처리
router.post("/upDislike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const dislike = new Dislike(variable)

    //1.Dislike collection 에다가 클릭 정보를 넣는다.
    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });

        //2. 만약에 Like 가 이미 클릭이 되었다면, Like 1 줄여준다.
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })

    })

});




module.exports = router;