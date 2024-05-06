import './DetailPage.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {PageCanvas} from './PageCanvas'

function DetailPage(){
    return (
        <PageCanvas name='3' time={2} detail={3} />
    );
}

export default DetailPage;
