import React from 'react'
import { useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");
    const params = useParams();


    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variable = {
            content: commentValue,
            writer: user.userData._id,
            postId: params.videoId,
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if (res.data.success) {
                    setCommentValue("");
                    props.refreshFunction(res.data.result);
                } else {
                    alert("커맨트를 저장하지 못했습니다.");
                }
            });
    }



    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&

                    <React.Fragment key={index}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} />
                        <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} />
                    </React.Fragment>

                )
            ))}


            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} >
                <textarea style={{ width: "100%", borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder='코멘트를 작성해 주세요.'
                >
                </textarea>
                <br />
                <Button style={{ width: '20%', height: '52px' }}
                    onClick={onSubmit}>댓글작성하기</Button>
            </form>
        </div>
    )


}

export default Comment;