import React, { useEffect } from 'react'
import Axios from 'axios';
import { useState } from 'react';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    const getSubscribeNumber = () => {
        const variable = { userTo: props.userTo }
        Axios.post("/api/subscribe/subscribeNumber", variable)
            .then(res => {
                if (res.data.success) {
                    setSubscribeNumber(res.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                }
            });
    }

    useEffect(() => {

        getSubscribeNumber();

        const subscribeVariable = { userTo: props.userTo, userFrom: localStorage.getItem("userId") };

        Axios.post("/api/subscribe/subscribed", subscribeVariable)
            .then(res => {
                if (res.data.success) {
                    setSubscribed(res.data.subscribed);
                } else {
                    alert("정보를 받아오지 못했습니다.");
                }
            });


    }, []);


    const onSubscribe = () => {

        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }


        if (Subscribed) {
            //이미 구독 중이라면
            Axios.post("/api/subscribe/unSubscribe", subscribeVariable)
                .then(res => {
                    if (res.data.success) {
                        getSubscribeNumber();
                        setSubscribed(!Subscribed);
                    } else {
                        alert("구독 취소하는데 실패 했습니다.");
                    }
                });

        } else {
            Axios.post("/api/subscribe/subscribe", subscribeVariable)
                .then(res => {
                    if (res.data.success) {
                        getSubscribeNumber();
                        setSubscribed(!Subscribed);
                    } else {
                        alert("구독 하는데 실패 했습니다.");
                    }
                });

        }
    }



    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#cc0000'}`, borderRadius: '4px',
                    color: "#fff", padding: "10px 16px", border: "none",
                    fontWeight: 500, fontSize: "1rem", textTransform: 'uppercase',
                    cursor: "pointer"
                }}

                onClick={onSubscribe}
            >
                {SubscribeNumber}  {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe