import React, { useState } from 'react';
import './shop.css';
import chick4 from '../image/chick4.png';

function Shop (){

    return(
        <div>
            <div className="title">
                <h1>상점</h1>
            </div>

            <div className="chick4">
            <img src={chick4} className="chick4" />
            </div>
        </div>
    )


}

export default Shop;