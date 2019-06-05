import React, {Component} from 'react';

class FollowerCard extends Component {
    render() {
        return (
            <div className={'card'}>
                <img src={this.props.item.photo} alt={this.props.item.name} />
                <div className={'name-style'}>{this.props.item.name}</div>
                <div className={'handler-sytle'}>{this.props.item.handler}</div>
            </div>
        );
    }
}

export default FollowerCard;