import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { ListGroup } from 'react-bootstrap';
import FollowerCard from './FollowerCard';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        this.fetchFollowers = this.fetchFollowers.bind(this);

    }

    componentDidMount() {
        this.fetchFollowers();
    }

    fetchFollowers() {
        const user = sessionStorage.getItem('user');
        this.props.getFollowers(user);
    }

    render() {
        let textToDispay;
        let followers = this.props.followers;
        // for(var i=0; i<=30; i++){
        //     followers.push({name: "Ramya", handler: "Ramya90397920", photo: "http://pbs.twimg.com/profile_images/1136203686886006784/nCrxUWLk_normal.jpg"});
        // }
        if (!followers.length) {
            textToDispay = (
                <div>
                    <strong>No followers for now!</strong>
                </div>
            );
        } else {
            textToDispay = (
                <ListGroup>
                    {followers.map((item, index) => {
                        return <FollowerCard key={index} item={item}></FollowerCard>
                    })
                    }
                </ListGroup>
            );
        }


        return !this.props.isAuthenticated ?
            <Redirect to={{ pathname: '/login' }} /> : (
                <div>
                    {textToDispay}
                </div>
            );
    }
};


const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        user: state.login.user,
        isAuthenticated: state.login.isAuthenticated,
        followers: state.profile.followers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFollowers: (data) => dispatch({ type: 'GET_USER_FOLLOWERS', data })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);