const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');


//======================================
//      Comment
//======================================

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        Comment.find({ '_id': doc._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return result.json({ success: false, err });
                res.status(200).json({ success: true, result });
            })


    });

});


//댓글 목록 가져오기
router.post("/getComments", (req, res) => {

    Comment.find({ 'postId': req.body.videoId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return result.json({ success: false, err });
            res.status(200).json({ success: true, comments });
        })

});



module.exports = router;