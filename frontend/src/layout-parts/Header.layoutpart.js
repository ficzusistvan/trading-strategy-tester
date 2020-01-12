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
              {/* Data source */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/data-source'>{this.props.p.tc('common.select_data_source')}</NavLink>
              </NavItem>
              {/* Symbol */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/symbol'>{this.props.p.tc('common.select_symbol')}</NavLink>
              </NavItem>
              {/* Period */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/period'>{this.props.p.tc('common.select_period')}</NavLink>
              </NavItem>
              {/* Strategy */}
              <NavItem>
                <NavLink tag={RRNavLink} to='/strategy'>{this.props.p.tc('common.select_strategy')}</NavLink>
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