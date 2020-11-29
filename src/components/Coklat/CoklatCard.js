import { useState } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import ResepBahan from './ResepBahan';

const CoklatCard = ({ id, nama, jumlah }) => {
    const [isShow, setIsShow] = useState(false);

    const showResepHandler = () => {
        setIsShow(!isShow);
    };

    return (
        <Auxiliary>
            <div
                onClick={showResepHandler}
                className='card col-sm-7 mx-auto text-center my-5 rounded shadow-sm py-2 bg-light'
            >
                <div className='card-body'>
                    <h5 className='card-title'>{nama}</h5>
                    <p className='card-text'>{jumlah}</p>
                </div>
            </div>
            {isShow ? <ResepBahan id={id} /> : null}
        </Auxiliary>
    );
};

export default CoklatCard;
