import React from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");
    const user = useSelector(state => state.user);
    const params = useParams();

    const onClickRplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem("userId")} commentId={props.comment._id} />
        , <span onClick={onClickRplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]



    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: params.videoId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if (res.data.success) {
                    setCommentValue("");
                    setOpenReply(false);
                    props.refreshFunction(res.data.result);
                } else {
                    alert("커맨트를 저장하지 못했습니다.");
                }
            });
    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name} />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                    <textarea style={{ width: "100%", borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder='코멘트를 작성해 주세요.'
                    >
                    </textarea>
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}
                    >댓글작성하기</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment