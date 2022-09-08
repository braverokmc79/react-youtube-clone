import React, { useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import { useSelector } from 'react-redux';
import Comment from './Sections/Comment';


function VideoDetailPage() {

    const user = useSelector(state => state.user);

    const { videoId } = useParams();
    const [VideoDetail, setVideoDetail] = useState([]);
    const variable = { videoId: videoId };
    const [Comments, setComments] = useState("");

    useEffect(() => {
        //console.log("비디오 디테일");
        Axios.post(`/api/video/getVideoDetail`, variable)
            .then(res => {
                if (res.data.success) {
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오는데 실패했습니다.");
                }

            });

        //댓글 목록 가져오기
        Axios.post("/api/comment/getComments", variable)
            .then(res => {
                if (res.data.success) {
                    // console.log("res.data.comments   :", res.data.comments);
                    setComments(res.data.comments);
                } else {
                    alert("댓글 목록을 가져오는데 실패 하였습니다.");
                }
            });

    }, []);

    const movePage = (id) => {
        //console.log("페이지 이동 :" + id);
        Axios.post(`/api/video/getVideoDetail`, { videoId: id })
            .then(res => {
                if (res.data.success) {
                    // console.log("res.data.videoDetail : ", res.data.videoDetail);
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오는데 실패했습니다.");
                }

            });

        //댓글 목록 가져오기
        Axios.post("/api/comment/getComments", { videoId: id })
            .then(res => {
                if (res.data.success) {
                    console.log("res.data.comments   :", res.data.comments);
                    setComments(res.data.comments);
                } else {
                    alert("댓글 목록을 가져오는데 실패 하였습니다.");
                }
            });
    }

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }


    if (VideoDetail.writer) {

        const subscribeButton = user.userData && user.userData.isAuth && VideoDetail.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem("userId")} />;


        return (
            <Row gutter={[16, 16]}>
                <Col lg={15} md={13} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: "100%", maxHeight: 600 }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />


                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* comments */}
                        <Comment commentLists={Comments} refreshFunction={refreshFunction} />
                    </div>
                </Col >

                <Col lg={9} md={11} xs={24} style={{ marginTop: 50 }}>
                    <SideVideo movePage={movePage} />
                </Col>

            </Row >
        )

    } else {
        return (
            <div>..Loading</div>
        )
    }
}

export default VideoDetailPage