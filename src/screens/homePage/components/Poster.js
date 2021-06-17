import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

class Poster extends Component {
    state = {
        nodes: [
            {
                id: 1, src: "http://slyder.vn/wp-content/uploads/2020/11/inbound2289293748899296511-1024x682.jpg",
                path: 'category-group',
                key: '6031db48fa94700f38064e24',
                title: 'Áo thun thời trang',
                description: 'Nổi bật - Năng động - Thời trang'
            },
            {
                id: 2, src: "https://res.cloudinary.com/trunk-club/image/upload/f_auto,q_auto/Blog/20039_SummerTrendsFT_Blog_Header.jpg",
                path: 'sale-off',
                key: 'a',
                title: 'Siêu Sale chào hè',
                description: 'Giảm giá cực sâu - Vui hè cực ngầu'
            },
            {
                id: 3, src: "https://www.elleman.vn/wp-content/uploads/2019/02/18/phu-kien-thoi-trang-nam-elle-man-mainline-menswear-feature.jpg",
                path: 'category-group',
                key: '60727e10f39072137c3b085c',
                title: 'Phụ kiện đẳng cấp',
                description: 'Nâng tầm thời trang'
            },
            {
                id: 4, src: "https://res.cloudinary.com/trunk-club/image/upload/f_auto,q_auto/Blog/Mens-denim-guide-body-types.jpg",
                path: 'detail',
                key:'60727d1df39072137c3b0857',
                title: 'Xu thế thời trang',
                description: 'Mới nhất - Đẹp nhất - Rẻ nhất'
            },]
    }

    render() {
        const { nodes } = this.state;
        const posters = nodes.map((node, index) => {
            return (
                <TouchableOpacity
                    onPress={()=>{this.props.navigate(node.path,node.key,node.title)}}
                >
                    <View style={styles.node} index={index}>
                        <Image style={styles.image} source={{ uri: node.src }} />
                        <View style={node.id % 2 === 1 ? styles.textContainerLeft : styles.textContainerRight}>
                            <Text style={styles.title}>{node.title}</Text>
                            <Text style={styles.description}>{node.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });
        return (
            <Swiper height={200} autoplay={true} autoplayTimeout={4}>
                {posters}
            </Swiper>
        );
    }

};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    node: {
        width: '100%',
        height: '100%'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    textContainerLeft: {
        position: 'absolute',
        left: '10%',
        top: '38%',
        alignItems: 'flex-start'

    },
    textContainerRight: {
        position: 'absolute',
        right: '10%',
        top: '38%',
        alignItems: 'flex-end'

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
        backgroundColor: '#0a64f2',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 15,
        paddingRight: 15
    },
    description: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
        backgroundColor: '#042d6e',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default Poster;