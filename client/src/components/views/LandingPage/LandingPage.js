import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
                <div style={{ float: 'right' }}>유튜브 클론 시리즈</div>
            </div>

        </>
    )
}

export default LandingPage