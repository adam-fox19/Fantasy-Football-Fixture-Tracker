import React from 'react';
import ReactDOM from 'react-dom';
import PopOver from './popovers/PopOver.jsx';

const HeaderLink = (props) => {

  /* Popovers cause majority of page to be blurred/filtered when active
     functions below add & remove filter class to necessary elements           */
  const addFilters = () => {
    document.querySelector('table').classList.add('custom-filter');
    document.querySelector('.key').classList.add('custom-filter');
  }

  const removeFilters = () => {
    document.querySelector('table').classList.remove('custom-filter');
    document.querySelector('.key').classList.remove('custom-filter');
  }
  // toggles popover & passes state back to Header component
  const handleClick = () => {

    if (!props.popOverType) {
      setTimeout(() => {
        props.set_pop_overs(true);
        addFilters();
      }, 100);
    } else {
      props.set_pop_overs(false);
      removeFilters();
    }
  }

  return (
    <li className={'nav-item ' + props.screen}>
      <a className='nav-link'
         href='#'
         onClick={handleClick}
         >{props.linkText}</a>
      <PopOver
        popOverType={props.popOverType}
        set_pop_overs={props.set_pop_overs}
        popOverClass={props.popOverClass}
        content={props.content}
        popOvers={props.popOvers}
        popOverKey={props.popOverKey}
        removeFilters={removeFilters}
        />
    </li>
  );
}

export default HeaderLink;
