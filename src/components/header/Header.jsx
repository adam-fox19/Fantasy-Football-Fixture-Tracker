import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import HeaderTitle from './HeaderTitle.jsx';
import HeaderLink from './HeaderLink.jsx';

import ContactContent from './popovers/content/ContactContent.jsx';
import AboutContent from './popovers/content/AboutContent.jsx';
import TableTypeContent from './popovers/content/TableTypeContent.jsx';
import DataContent from './popovers/content/DataContent.jsx';

const Header = () => {

  const [popOvers, setPopOvers] = useState({
    aboutPopOver: false,
    tableTypePopOver: false,
    dataPopOver: false,
    contactPopOver: false
  })

  // ----------------------------------------------------------------------------
  // callbacks passed to Header Link components, each sets state of child popover
  // ----------------------------------------------------------------------------


  const set_about_popover = (dataFromChild) => {
    if (dataFromChild) {
      setPopOvers({
        aboutPopOver: true,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: false
      })
    } else {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: false
      })
    }
  }

  const set_table_type_popover = (dataFromChild) => {
    if (dataFromChild) {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: true,
        dataPopOver: false,
        contactPopOver: false
      })
    } else {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: false
      })
    }
  }

  const set_data_popover = (dataFromChild) => {
    if (dataFromChild) {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: true,
        contactPopOver: false
      })
    } else {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: false
      })
    }
  }

  const set_contact_popover = (dataFromChild) => {
    if (dataFromChild) {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: true
      })
    } else {
      setPopOvers({
        aboutPopOver: false,
        tableTypePopOver: false,
        dataPopOver: false,
        contactPopOver: false
      })
    }
  }



  return (
      <nav className='navbar navbar-expand-sm'>
        <ul className='navbar-nav flex-row nav-fill w-100'>
          <HeaderLink
            linkText='About'
            screen='nav-desktop'
            set_pop_overs={set_about_popover}
            popOvers={popOvers}
            popOverKey={'aboutPopOver'}
            popOverClass={'about-popover'}
            popOverType={popOvers.aboutPopOver}
            content={<AboutContent
                       set_own_popover={set_about_popover}
                       set_table_type_popover={set_table_type_popover}
                       set_data_popover={set_data_popover}
                     />}
          />
          <HeaderLink
            linkText='Tracker types'
            screen='nav-desktop'
            set_pop_overs={set_table_type_popover}
            popOvers={popOvers}
            popOverKey={'tableTypePopOver'}
            popOverClass={'table-type-popover'}
            popOverType={popOvers.tableTypePopOver}
            content={<TableTypeContent
                       screen='nav-desktop'
                     />}
          />
          <HeaderTitle />
          <HeaderLink
            linkText='Data'
            screen='nav-desktop'
            set_pop_overs={set_data_popover}
            popOvers={popOvers}
            popOverKey={'dataPopOver'}
            popOverClass={'data-popover'}
            popOverType={popOvers.dataPopOver}
            content={<DataContent />}
          />
          <HeaderLink
            linkText='Contact'
            screen='nav-desktop'
            set_pop_overs={set_contact_popover}
            popOvers={popOvers}
            popOverKey={'contactPopOver'}
            popOverClass={'contact-popover'}
            popOverType={popOvers.contactPopOver}
            content={<ContactContent/>}
          />
        </ul>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navDropdownContent'
          aria-controls='navDropdownContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <i className='fas fa-bars fa-1x'></i>
        </button>
        <div className='collapse navbar-collapse' id='navDropdownContent'>
          <ul className='navbar-nav nav-dropdown-list'>
            <HeaderLink
              linkText='About'
              screen='nav-mobile'
              popOvers={popOvers}
              set_pop_overs={set_about_popover}
              popOverType={popOvers.aboutPopOver}
              popOverClass={'about-popover'}
              content={<AboutContent
                         set_own_popover={set_about_popover}
                         set_table_type_popover={set_table_type_popover}
                         set_data_popover={set_data_popover}
                       />}
            />
            <HeaderLink
              linkText='Tracker types'
              screen='nav-mobile'
              set_pop_overs={set_table_type_popover}
              popOvers={popOvers}
              popOverKey={'tableTypePopOver'}
              popOverClass={'table-type-popover'}
              popOverType={popOvers.tableTypePopOver}
              content={<TableTypeContent
                         screen='nav-mobile'
                       />}
            />
            <HeaderLink
              linkText='Data'
              screen='nav-mobile'
              set_pop_overs={set_data_popover}
              popOvers={popOvers}
              popOverKey={'dataPopOver'}
              popOverClass={'data-popover'}
              popOverType={popOvers.dataPopOver}
              content={<DataContent />}
            />
            <HeaderLink
              linkText='Contact'
              screen='nav-mobile'
              set_pop_overs={set_contact_popover}
              popOvers={popOvers}
              popOverKey={'contactPopOver'}
              popOverClass={'contact-popover'}
              popOverType={popOvers.contactPopOver}
              content={<ContactContent/>}
            />
          </ul>
        </div>
      </nav>
  );
}

export default Header;
