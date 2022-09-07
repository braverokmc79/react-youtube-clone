import React, { useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';


function VideoDetailPage() {

    const { videoId } = useParams();
    const [VideoDetail, setVideoDetail] = useState([]);
    const variable = { videoId: videoId };


    useEffect(() => {
        //console.log("비디오 디테일");
        Axios.post(`/api/video/getVideoDetail/`, variable)
            .then(res => {
                if (res.data.success) {
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오는데 실패했습니다.");
                }

            });

    }, []);

    const movePage = (id) => {
        console.log("페이지 이동 :" + id);
        Axios.post(`/api/video/getVideoDetail/`, { videoId: id })
            .then(res => {
                if (res.data.success) {
                    // console.log("res.data.videoDetail : ", res.data.videoDetail);
                    setVideoDetail(res.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오는데 실패했습니다.");
                }

            });
    }

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: "100%", maxHeight: 600 }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />


                        <List.Item
                            actions={[<Subscribe userTo={VideoDetail.writer} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* comments */}
                    </div>
                </Col >

                <Col lg={6} xs={24} style={{ marginTop: 50 }}>
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