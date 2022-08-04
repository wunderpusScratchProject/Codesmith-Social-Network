import React, { Component } from 'react';
import { SearchBar } from '../components/SearchBar.jsx';

export class NavBar extends Component {
  constructor({props}){
    super(props);
    this.props = props;
    this.clickFunction = this.clickFunction.bind(this);
  }

  clickFunction(focus) {
    this.props.setActive(focus);
  }

  render () {
    return (
      <nav className='navbar'>
        <span className='title'>smithy</span>
        <SearchBar 
          setActive={this.props.setActive} 
          searchValue={this.props.searchValue} 
          setSearchValue={this.props.setSearchValue}
        />
        <ul className='navbar-nav'>
          <NavItem>
            <DropDown clickFunction={this.clickFunction} />
          </NavItem>
        </ul>
      </nav>
    );
  }
}

const NavItem = (props) => {

  const [open, setOpen] = React.useState(false);

  return(
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}>
        ≡
      </a>
      { open && props.children }
    </li>
  );
}

const DropDown = ({ clickFunction }) => {
  return(
    <div className='dropdown'>
      <DropDownItem leftIcon='Ξ' rightIcon='➡' clickFunction={clickFunction} type='User'>
        My Profile
      </DropDownItem>
      <DropDownItem leftIcon='🤍' clickFunction={clickFunction} type='Residents'>
        Residents
      </DropDownItem>
      <DropDownItem leftIcon='🤍' clickFunction={clickFunction} type='Cohort'>
        Cohort
      </DropDownItem>
      <DropDownItem leftIcon='🤍' clickFunction={clickFunction} type='Organization'>
        Organization
      </DropDownItem>
    </div>
  );
}

const DropDownItem = ({ clickFunction, type, leftIcon, rightIcon, children }) => {

  return (
    <a href='#' onClick={() => clickFunction(type)} className='menu-item'>
      <span className='icon-button'>{leftIcon}</span>
      <span className='ddItem'>{children}</span>
      <span className='icon-right'>{rightIcon}</span>
    </a>
  )
}