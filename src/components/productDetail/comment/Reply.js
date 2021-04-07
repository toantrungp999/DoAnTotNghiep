import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { TextInput } from 'react-native-paper';

export default class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyId: '',
            content: '',
            user: {},
            data: '',
            isEdit: false
        }
    }

    componentDidMount() {
        const { _id, content, user, date } = this.props.reply;
        console.log(this.props.reply);
        this.setState({
            replyId: _id, content, user, date
        });
    }

    onDelete = () => {
        let { replyId } = this.state;
        this.props.onDeleteCommentReply({ replyId, commentId: this.props.commentId });
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    onUpdateCommentReply = () => {
        let { replyId, content } = this.state;
        content = content.trim();
        if (content) {
            this.props.onUpdateCommentReply({ commentId: this.props.commentId, replyId, content });
            this.setState({ isEdit: false });
        }
    }

    render() {
        var isUser = this.props.userInfo && this.state.user._id === this.props.userInfo._id;
        return (
            !this.state.isEdit ?
                <View style={styles.row}>
                    <View style={styles.img}>
                        <Image source={{ uri: this.state.user.image }} style={styles.avartarReply} />
                    </View>
                    <View style={styles.contentArea}>
                        <View style={styles.content}>
                            <Text style={styles.name}>{this.state.user.name && this.state.user.name}</Text>
                            <Text style={styles.text}>{this.state.content}</Text>
                        </View>
                        {isUser && <View style={styles.areaAction}>
                            <TouchableOpacity onPress={() => this.setState({ isEdit: true })}><Text style={styles.textAction}>Chỉnh sửa</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ isEdit: true })}><Text style={styles.textAction}>Phản hồi</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this.prepareToDelete}><Text style={styles.textAction}>Xóa</Text></TouchableOpacity></View>}
                    </View>
                </View> :
                <View>
                    <View style={styles.row}>
                        <View style={styles.editComent}>
                            <TextInput
                                value={this.state.content}
                                style={styles.input}
                                underlineColor="transparent"
                                onChangeText={(text) => this.onChange('content', text)}
                            />
                        </View>
                        <View style={styles.viewEditAction}>
                            <TouchableOpacity onPress={this.onUpdateCommentReply}><Text style={styles.textAction}>Lưu</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowEdit}>
                        <TouchableOpacity onPress={() => this.setState({ isEdit: false, content: this.state.oldContent })}><Text style={styles.textAction}>Hủy</Text></TouchableOpacity>
                    </View>
                </View>
        );
    }
}