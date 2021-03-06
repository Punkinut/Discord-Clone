import React from 'react'

function StatusIcon({id, status, onlineUsers}) {
    let realStatus = status;
    if (onlineUsers) {
        var ownerData = onlineUsers?.filter(function(user) {
            return user.userId === id;
        });
        if (ownerData[0] !== undefined) {
            realStatus = ownerData[0]?.status;
        }
    }

    if (realStatus === 'online') {
        return (
            <section className= 'online real-status minor-adjustment'></section>
        )
    } else if (realStatus === 'idle' || realStatus === 'realIdle') {
        return (
            <section className='idle real-status minor-adjustment'>
                <section className='idle-section'></section>
            </section>
        )
    } else if (realStatus === 'do-not-disturb' || realStatus === 'realDisturb') {
        return (
            <section className='do-not-disturb real-status minor-adjustment'>
                <section></section>
            </section>
        )
    } else {
        return (
            <section className='invisible real-status request-status'>
                <section className='hole-dot'></section>
            </section>
        )
    }
}

export default StatusIcon
