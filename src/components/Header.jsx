import React from "react";
import '/home/user/pw/personal-web/src/styles/header.css';

const Header= function(){
    return(
        <header className="header">
            <div className="left_buttons">
                <button className = "button button_1">rerokai</button>
                <button className = "button button_2">my prj</button>
            </div>
                <button className= "right_buttons">
                    <svg className="night" width="25" height="25" viewBox="0 0 25 25" fill="none" >
                        <path d="M0.75 12.1587C0.75 18.5277 6.06339 23.6908 12.6178 23.6908C17.6636 23.6908 21.9739 20.6309 23.6908 16.3165C22.331 16.9372 
                        20.8127 17.2841 19.211 17.2841C13.3849 17.2841 8.66186 12.6946 8.66186 7.03331C8.66186 4.66561 9.48796 2.48541 
                        10.8754 0.75C5.14701 1.56898 0.75 6.36487 0.75 12.1587Z" stroke="#20310F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </button>
        </header> 


    )
}

export default Header;