/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useState } from 'react';
import Axios from 'axios';

function SideVideo(props) {

    const [SideVideos, setSideVideos] = useState([]);


    useEffect(() => {
        Axios.get("/api/video/getVideos")
            .then(res => {
                if (res.data.success) {
                    // console.log("SideVideos :", res.data);
                    setSideVideos(res.data.videos);
                } else {
                    alert("비디오 가져오기를 실패 했습니다.");
                }
            });

    }, []);




    const renderSideVideo =
        SideVideos.map((video, index) => {

            var minutes = Math.floor(video.duration / 60);
            var seconds = Math.floor(video.duration - minutes * 60);

            return (
                <div
                    key={index}

                    style={{
                        display: 'flex',
                        marginBottom: "1rem",
                        padding: '0 2rem',
                        flexWrap: 'wrap'
                    }}>
                    <div style={{ width: '50%', marginBottom: '1rem', padding: '0 2rem' }}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            props.movePage(`${video._id}`)
                        }} >
                            <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                        </a>
                    </div>

                    <div style={{ width: '50%' }}>
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                props.movePage(`${video._id}`)
                            }}
                            style={{ color: 'gray' }}>
                            <span style={{ fontSize: '1rem', color: 'black' }} >{video.title}</span><br />
                            <span>{video.writer.name}</span><br />
                            <span>{video.views}</span><br />
                            <span>{minutes} : {seconds}</span>

                        </a>
                    </div>

                    <div>

                    </div>
                </div >
            )
        });



    return <React.Fragment >
        {renderSideVideo}
    </React.Fragment>

}

export default SideVideo