import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import translate from 'redux-polyglot/translate';

class HeaderLayoutPart extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={RRNavLink} to="/">Trading Strategy Tester</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* XAPI Symbols */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/xapi-symbols'>{this.props.p.tc('xapi.symbols.symbols')}</NavLink>
              </NavItem>
              {/* Alphavantage Symbols */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/alphavantage-symbols'>{this.props.p.tc('alphavantage.symbols.symbols')}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

HeaderLayoutPart.propTypes = {
}

export default translate(HeaderLayoutPart);