import React from 'react';
import ReactDOM from 'react-dom';

const Fixture = (props) => {

  return (
    <td className={props.css_class + ' fixture-cell'}>{props.fixture}</td>
  );
}

export default Fixture;
