import React, { Component } from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    static propTypes = {
        avatar: PropTypes.string,
        articleId: PropTypes.string,
        confirmInput: PropTypes.func,
    }

    changeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    confirmReply = () => {
        const data = {
            content: this.state.value,
            articleId: this.props.articleId,
        };
        this.props.confirmInput(data);
    }

    clearInput = () => {
        this.setState({
            value: '',
        });
    }

    render() {
        const { avatar } = this.props;
        const { TextArea } = Input;
        return (
            <section className="c-reply">
                <div className="c-reply__avatar">
                    <img src={avatar} alt=""/>
                </div>
                <div className="c-reply__input">
                    <TextArea rows={2} value={this.state.value} onChange={this.changeInput} />
                    <div className="c-reply__confirm">
                        <Button type="primary" size="small" onClick={this.confirmReply}>评论</Button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reply;
