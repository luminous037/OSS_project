import './DetailPage.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {PageCanvas} from './PageCanvas'

function DetailPage(){
    //데이터 받아오고 해당 내용을 파라미터에 추가
    return (
        <PageCanvas name='3' time={2} detail={3} />
    );
}

export default DetailPage;
