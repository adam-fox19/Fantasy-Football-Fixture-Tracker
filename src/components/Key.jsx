import React from 'react';
import ReactDOM from 'react-dom';

const Key = () => {
  return (
    <div className='key key-wrapper'>
      <span className='key-title'>Key:</span>
      <div className='key-colours'>
        <div className='key-box very-easy'></div>
        <div className='key-box easy'></div>
        <div className='key-box average'></div>
        <div className='key-box hard'></div>
        <div className='key-box very-hard'></div>
        <span className='key-tag key-tag-easy'>Easiest</span>
        <span className='key-tag key-tag-hard'>Hardest</span>
      </div>
      <div className='key-colours key-colours-blank-double'>
        <div className='key-box blank'></div>
        <div className='key-box'></div>
        <div className='key-box'></div>
        <div className='key-box'></div>
        <div className='key-box double'></div>
        <span className='key-tag key-tag-blank'>Blank</span>
        <span className='key-tag key-tag-hard'>Double</span>
      </div>
    </div>
  );
}

export default Key;
