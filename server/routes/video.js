const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//STORAGE MULTER CONFIG
const storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, "uploads/");
    },

    filename: (req, file, callBack) => {
        callBack(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, callBack) => {
    // mime type 체크하여 원하는 타입만 필터링
    console.log("fileFilter... ");

    if (file.mimetype === 'video/mp4') {
        callBack(null, true);
    } else {
        callBack({ msg: 'mp4 파일만 업로드 가능합니다.' }, false);
    }
}


var upload = multer({ storage: storage, fileFilter: fileFilter }).single("file");


//mp4 파일 업로드 처리
router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.send({ success: false, err })
        } else {
            console.log("서버업로드파일내용 : ", req.file);
            req.file.success = true;
            return res.send(req.file);
        }
    })
});




router.post('/uploadVideo', (req, res) => {
    //비디오 정보들을 저장한다.
    const video = new Video(req.body);
    console.log("비디오 정보 저장 :", video);
    video.save((err, doc) => {
        console.log("err : ", err);
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })

});


//비디오를 DB 에서 가져와서 클라이언트에 보낸다.
//populate 사용해야지 모든 정보를 가져올수 있다.
router.get("/getVideos", (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos });
        });
});


//비디오 상세 화면
router.post('/getVideoDetail', (req, res) => {

    Video.findOne({ "_id": req.body.videoId })
        .populate("writer")
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videoDetail });
        });

});









// thumbnail 생성하기
router.post("/thumbnail", (req, res) => {
    //썸네일 생성하고  비디오 러닝타임도 가져오기
    let filePath = "";
    let fileDuration = "";
    let filename = "";

    //1.비디오 전체 정보 추출
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        // console.dir(metadata);
        // console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });


    //2.썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '));
            console.log("filenames : ", filenames);

            filePath = "uploads/thumbnails/" + filenames[0];
            filename = filenames[0];

        })
        .on('end', function () {
            console.log("1.Screenshots .on('filenames') filePath:", filePath);
            console.log("2.Screenshots .on('filenames') filename:", filename);
            console.log("3.Screenshots - ffprobe 변수값 fileDuration :", fileDuration);

            return res.send({ success: true, url: filePath, fileDuration: fileDuration, filename: filename })
        })
        .on('error', function (err) {
            console.error(err);
            return res.send({ success: false, err: err });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240', //'320x240'
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });


});



module.exports = router;