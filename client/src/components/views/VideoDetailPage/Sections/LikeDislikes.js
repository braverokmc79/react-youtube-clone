/* eslint-disable array-callback-return */
import React, { useEffect } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';
import { useState } from 'react';



function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);


    let variable = "";
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }


    useEffect(() => {

        Axios.post("/api/like/getLikes", variable)
            .then(res => {
                if (res.data.success) {

                    //얼마나 많은 좋아요를 받았는지
                    setLikes(res.data.likes.length)

                    //내가 이미 그 좋아요를 눌렀는지
                    res.data.likes.map(like => {
                        if (like.useId === props.userId) {
                            setLikeAction('liked');
                        }
                    });

                } else {
                    alert("Likes 에 정보를 가져오지 못했습니다.");
                }

            });

        Axios.post("/api/like/getDisLikes", variable)
            .then(res => {
                if (res.data.success) {

                    //얼마나 많은 싫어요를 받았는지
                    setDislikes(res.data.dislikes.length);

                    //내가 이미 싫어요를 눌렀는지
                    res.data.dislikes.map(dislike => {
                        if (dislike.useId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    });

                } else {
                    alert("DisLikes 에 정보를 가져오지 못했습니다.");
                }

            });

    }, [])


    return (
        <div>
            <span className="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction === "liked" ? 'filled' : 'outlined'} />
                </Tooltip>
                <span style={{ padding: 8, cursor: "auto" }}>{Likes}</span>
            </span>

            <span className="comment-basic-like">
                <Tooltip title="DisLike">
                    <Icon type="dislike" theme={DislikeAction === "disliked" ? 'filled' : 'outlined'} />
                </Tooltip>
                <span style={{ padding: 8, cursor: "auto" }}>{Dislikes}</span>
            </span>

        </div >
    )
}

export default LikeDislikes