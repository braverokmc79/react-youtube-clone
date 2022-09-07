import React, { useEffect } from 'react'
import Axios from 'axios';
import { useState } from 'react';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const variable = { userTo: props.userTo }
        Axios.post("/api/subscribe/subscribeNumber", variable)
            .then(res => {
                if (res.data.success) {
                    setSubscribeNumber(res.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                }

            });


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




    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#cc0000'}`, borderRadius: '4px',
                    color: "#fff", padding: "10px 16px", border: "none",
                    fontWeight: 500, fontSize: "1rem", textTransform: 'uppercase',
                    cursor: "pointer"
                }}
            >
                {SubscribeNumber}  {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe