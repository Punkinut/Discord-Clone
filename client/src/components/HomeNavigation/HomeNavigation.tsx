import React, { useEffect } from 'react';
import './navSide.scss';
import friend from '../../images/Friends.svg';
import discovery from '../../images/Discover-Icon.svg';
import StartConversation from './StartConversation';
import { NavLink, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { CHANGE_HOME_ROUTE } from '../../redux/actions';

function HomeNavigation() {
    const location = useLocation();
    const dispatch = useDispatch();

    const route = location?.pathname;
    useEffect(() => {
        dispatch({ type: CHANGE_HOME_ROUTE, route });
    }, [route, dispatch]);

    if (!Auth.loggedIn()) {
        return <></>
    }
    return (
        <section className='home-nav-container'>
            <StartConversation/>
            <NavLink to='/channels/@me' activeClassName='friends-active' className='friends-tab' style={{ marginTop: '8px'}}>
                <img className='friend-icon' src={friend} alt='Friend Icon'/>
                <p className='normal-font'>Friends</p>
            </NavLink>
            <NavLink to='/discovery' activeClassName='friends-active' className='friends-tab' style={{ marginTop: '3px'}}>
                <img className='discover-icon' src={discovery} alt='Friend Icon'/>
                <p className='normal-font'>Stage Discovery</p>
            </NavLink>
        </section>
    )
}

export default HomeNavigation
