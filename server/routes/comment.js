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

        Comment.find({ 'postId': comment.postId })
            //.populate("writer")
            .exec((err, result) => {
                if (err) return result.json({ success: false, err });
                res.status(200).json({ success: true, result });
            })


    });

});



module.exports = router;