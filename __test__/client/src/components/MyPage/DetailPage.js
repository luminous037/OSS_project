import './DetailPage.css';
import { useLocation } from 'react-router-dom'; // useParams 추가
import {PageCanvas} from './PageCanvas'

function DetailPage(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // 쿼리 파라미터로부터 id 값을 가져옴

    return(
        <PageCanvas id={id} />
    );
}

export default DetailPage;
