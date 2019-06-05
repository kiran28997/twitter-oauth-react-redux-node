import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from "react-redux";
import {logout} from '../../actions/Header';

class Header extends React.Component {

    render() {

        let navNotAuth = (
            <Nav pullRight>
                <LinkContainer to="/login">
                    <NavItem eventKey={1}>Login</NavItem>
                </LinkContainer>
            </Nav>
        );

        let authNav = '';
        let userName = '';
        let title = '';

        if(this.props.isAuthenticated){
            userName = this.props.user.displayName;
            authNav = (<Nav pullRight>
                        <LinkContainer to="/profile">
                            <NavItem eventKey={1}>
                                <img className="user-icon" src={this.props.user.photo} alt={this.props.user.displayName} />
                                {userName}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <NavItem eventKey={2}>Logout</NavItem>
                        </LinkContainer>
                       </Nav>);
            title = 'Followers';
        } else {
            userName = '';
            authNav = navNotAuth;
            title = 'Twitter React Reduc App';
        }

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">{title}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                        {authNav}
                </Navbar.Collapse>
            </Navbar>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        user: state.login.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);