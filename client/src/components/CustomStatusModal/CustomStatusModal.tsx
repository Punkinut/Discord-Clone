import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { TOGGLE_CUSTOM_STATUS } from '../../redux/actions';
import Wumpus from '../../images/Status-Wumpus.svg'
import './statusModal.scss'

function CustomStatusModal() {
    const dispatch = useDispatch();
    const hideModal = (e) => {
        if(e.target === e.currentTarget) {
            dispatch({ type: TOGGLE_CUSTOM_STATUS, showModal: false});
         }
    };
    const { customStatusModal  } = useSelector((state: RootStateOrAny) => state);
    return (
        <div onClick={hideModal} className={'modal-container ' + (customStatusModal ? 'show' : 'hide')}>
            <section className='password-send custom-send'>
                <section className='head-wumpus-container'>
                    <img className='staty-wumpus' src={Wumpus} alt='Happy Wumpus'/>
                    <p className='set-status-title normal-font f500'>Set a custom a status</p>
                </section>
            </section>
        </div>
    )
}

export default CustomStatusModal
