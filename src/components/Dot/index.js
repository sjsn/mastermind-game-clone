import React from 'react';

import './Dot.css';

const Dot = ({ color, onClick, size, hide }) => {
    return (
        <div className={`dot ${size ? size : ''}${hide ? ' hide' : ''}`} style={{ backgroundColor: color }} onClick={onClick} />
    )
};

export default Dot;