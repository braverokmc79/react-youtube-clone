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
                        console.log("내가 이미 그 좋아요를 눌렀는지 : ", like.userId);
                        if (like.userId === props.userId) {
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
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked');
                        }
                    });
                } else {
                    alert("DisLikes 에 정보를 가져오지 못했습니다.");
                }

            });

    }, [])







    const onLike = () => {
        //console.log(" variable : ", variable);

        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction("liked");

                        if (DislikeAction !== null) {
                            setDislikeAction(null);
                            setDislikes(Dislikes - 1);
                        }
                    } else {
                        alert("Like 를 올리지 못하였습니다.")
                    }
                })
        } else {

            Axios.post('/api/like/unLike', variable)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);
                    } else {
                        alert("Like를 내리지 못하였습니다.");
                    }
                })

        }
    }

    const onDislike = () => {

        if (DislikeAction !== null) {
            Axios.post("/api/like/unDislike", variable)
                .then(res => {
                    if (res.data.success) {
                        setDislikes(Dislikes - 1);
                        setDislikeAction(null);
                    } else {
                        alert("dislike 를 지우지 못하였습니다.");
                    }

                })

        } else {
            Axios.post("/api/like/upDislike", variable)
                .then(res => {
                    if (res.data.success) {
                        setDislikes(Dislikes + 1);
                        setDislikeAction("disliked");

                        if (LikeAction !== null) {
                            setLikeAction(null);
                            setLikes(Likes - 1);
                        }
                    } else {
                        alert("DisLike 를 올리지 못하였습니다.")
                    }
                })

        }
    }

    return (
        <div>
            <span className="comment-basic-like" >
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction === "liked" ? 'filled' : 'outlined'} onClick={onLike} />
                </Tooltip>
                <span style={{ padding: 8, cursor: "auto" }}>{Likes}</span>
            </span>&nbsp;&nbsp;

            <span className="comment-basic-like">
                <Tooltip title="DisLike">
                    <Icon type="dislike" theme={DislikeAction === "disliked" ? 'filled' : 'outlined'} onClick={onDislike} />
                </Tooltip>
                <span style={{ padding: 8, cursor: "auto" }}>{Dislikes}</span>
            </span>&nbsp;&nbsp;

        </div>
    )
}

export default LikeDislikes