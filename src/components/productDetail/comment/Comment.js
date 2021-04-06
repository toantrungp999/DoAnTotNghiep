import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import Reply from './Reply';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentId: '',
            user: '',
            content: '',
            reply: '',
            isEdit: false,
            isReply: false,
            oldContent: '',
        }
    }

    componentDidMount() {
        const { commentId, content, user, date } = this.props;
        this.setState({
            commentId, content, user, date, oldContent: content
        });
    }

    onDelete = () => {
        let { commentId } = this.state;
        this.props.onDeleteComment({ commentId, productId: this.props.productId });
    }

    onShowReplyForm = () => {
        this.setState({ isReply: !this.state.isReply });
    }

    onShowEditForm = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
        if (this.state.isEdit) {
            this.setState({
                content: this.state.oldContent
            })
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });

    };

    onEditComent = () => {
        let { commentId, content } = this.state;
        content = content.trim();
        if (content) {
            this.props.onUpdateComment({ commentId, productId: this.props.productId, content });
            this.setState({
                isEdit: !this.state.isEdit,
            });
        }
    }

    onCreateReply = () => {
        let { commentId, reply } = this.state;
        reply = reply.trim();
        if (reply)
            this.props.onCreateCommentReply({ commentId, reply });
        this.onShowReplyForm();
        this.setState({ reply: '' })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps) {
            const { replies } = nextProps;
            this.setState({
                replies
            });
        }
    }

    render() {
        var isUser = this.props.userInfo && this.state.user._id === this.props.userInfo._id;
        var elementReplies = this.state.replies ? this.state.replies.map((reply, index) => {
            return <Reply commentId={this.state.commentId} key={reply._id} reply={reply} index={index} userInfo={this.props.userInfo} onDeleteCommentReply={this.props.onDeleteCommentReply} onUpdateCommentReply={this.props.onUpdateCommentReply} />
        }) : null;
        return (
            !this.state.isEdit && !this.props.UpdateReplyLoading && !this.props.updateLoading ?
                <View style={styles.row}>
                    <View style={styles.img}>
                        <Image source={{ uri: this.state.user.image }} style={styles.avartar} />
                    </View>
                    <View style={styles.contentArea}>
                        <View style={styles.content}>
                            <Text style={styles.text}>{this.state.content}</Text>
                        </View>
                        {isUser && <View style={styles.areaAction}><Text style={styles.textAction}>Phản hổi</Text><Text style={styles.textAction}>Xóa</Text></View>}
                        <View style={styles.areaAction}>
                            {elementReplies}
                        </View>
                    </View>
                </View> : <View></View>
        );
    }
}