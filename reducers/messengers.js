import React from 'react';
import {View, Image, Text} from 'react-native';
import * as Types from '../constants/MessengerActTypes';
import * as CHAT_BOT_TYPES from '../constants/ChatBotTypes';
import {findIndexById} from '../extentions/ArrayEx';

function messengersReducer(state = {}, action) {
  let index;
  switch (action.type) {
    case Types.MESSENGERS_REQUEST:
      return {loading: true};
    case Types.MESSENGERS_SUCCESS:
      const messengers = action.payload.data;
      const _messengers = [];
      for (let i = 0; i < messengers.length; i++) {
        messengers[i].message.content = formatContentMessage(
          messengers[i].message.type,
          messengers[i].message.content,
        );
        _messengers.push({
          _id: messengers[i]._id,
          user1: messengers[i].user1,
          user2: messengers[i].user2,
          messages: [messengers[i].message],
          check: messengers[i].check,
          date: messengers[i].date,
          fetchMessages: false,
        });
      }
      return {loading: false, messengers: _messengers};
    case Types.MESSENGERS_FAIL:
      return {loading: false, message: action.payload.message};
    case Types.SEND_MESSAGE_REQUEST:
      state.loading = true;
      state.message = '';
      return {...state};
    case Types.SEND_MESSAGE_SUCCESS:
      const {messenger} = action.payload.result;
      const {userId} = action.payload;

      messenger.message.content = formatContentMessage(
        messenger.message.type,
        messenger.message.content,
      );
      index = findIndexById(state.messengers, messenger._id);

      if (index > -1) {
        state.messengers[index].messages.push(messenger.message);
        state.messengers[index].date = messenger.date;
        state.messengers[index].check = false;
      } else {
        index = 0;
        state.messengers.unshift({
          _id: messenger._id,
          user1: messenger.user1,
          user2: messenger.user2,
          messages: [messenger.message],
          check: messenger.check,
          date: messenger.date,
          fetchMessages: false,
        });
      }

      let to = null;
      if (
        state.messengers[index].user1 &&
        state.messengers[index].user1._id !== userId
      ) {
        to = state.messengers[index].user1;
      } else if (
        state.messengers[index].user2 &&
        state.messengers[index].user2._id !== userId
      )
        to = state.messengers[index].user2;

      if (index > 0) {
        state.messengers.sort(function (a, b) {
          let c = new Date(a.date);
          let d = new Date(b.date);
          return d - c;
        });
        index = findIndexById(state.messengers, messenger._id);
      }

      state.index = index;
      state.action = Types.OPEN_DETAIL_MESSENGER;
      state.to = to;
      state.loading = false;
      return {...state};
    case Types.SEND_MESSAGE_FAIL:
      state.loading = false;
      state.indexReciver = -1;
      state.message = 'G???i tin nh???n th???t b???i!';
      return {...state};

    case Types.FETCH_MESSAGES_REQUEST:
      state.loading = true;
      return {...state};
    case Types.FETCH_MESSAGES_SUCCESS:
      const {messages, pagingInfo} = action.payload;
      const total = messages.length;
      if (total > 0) {
        index = findIndexById(state.messengers, messages[0].messengerId);
        if (index > -1) {
          //fetch l???n ?????u th?? start t???i ????? d??i hi???n c?? c???a tin nh???n fetch th?? th?? start 0
          for (
            let i =
              state.messengers[index].fetchMessages === true
                ? 0
                : state.messengers[index].messages.length;
            i < total;
            i++
          ) {
            messages[i].content = formatContentMessage(
              messages[i].type,
              messages[i].content,
            );
            state.messengers[index].messages.unshift(messages[i]);
          }
          state.messengers[index].pagingInfo = pagingInfo;
          state.messengers[index].fetchMessages = true;
        }
      }
      state.loading = false;
      return {...state};
    case Types.FETCH_MESSAGES_FAIL:
      state.loading = false;
      return {...state};
    case Types.CLEAR_MESSENGERS:
      return {loading: false};
    case Types.CLOSED_MESSAGE:
      state.action = '';
      state.index = -1;
      return {...state};
    case Types.CREATE_NEW_MESSAGE:
      state.action = action.type;
      return {...state};
    case Types.OPEN_DETAIL_MESSENGER:
      state.action = action.type;
      state.index = action.payload.index;
      state.to = action.payload.to;
      return {...state};
    case Types.MESSENGER_UPDATE_CHECK:
      const {messengerId} = action.payload;

      index = findIndexById(state.messengers, messengerId);
      if (index > -1) state.messengers[index].check = true;
      return {...state};
    default:
      return state;
  }
}

export {messengersReducer};

function formatContentMessage(type, content) {
  let listData = [];
  let msg = '';
  switch (type) {
    case CHAT_BOT_TYPES.ASK_BRANDS:
      msg = 'C???a h??ng ch??ng t??i hi???n ??ang kinh doanh c??c h??ng sau: ';
      listData = content
        ? content.map((data, index) => {
            return (
              <Text style={{fontWeight: 'bold'}} key={data._id}>
                {data.name} ,
              </Text>
            );
          })
        : null;
      listData.push(<Text key={listData.length}>...</Text>);
      break;
    case CHAT_BOT_TYPES.ASK_CATEGORIES:
      msg = 'C???a h??ng ch??ng t??i hi???n ??ang kinh doanh c??c lo???i s???n ph???m sau: ';
      listData = content
        ? content.map((data, index) => {
            return <Text key={data._id}>{data.name}, </Text>;
          })
        : null;
      listData.push(<Text key={listData.length}>...</Text>);
      break;
    case CHAT_BOT_TYPES.ASK_BEST_VIEW:
      msg = `S???n ph???m c?? t??n: ${content.name}`;
      listData.push(
        <View
          key={listData.length}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 100, height: 100, margin: 15}}
            source={{uri: content.images[0]}}
          />
        </View>,
      );
      listData.push(
        <Text key={listData.length}>
          {' '}
          c?? h??n {content.numberVisit} l?????t ???? truy c???p.
        </Text>,
      );
      break;
    case CHAT_BOT_TYPES.ASK_BEST_RATE:
      msg = `S???n ph???m c?? t??n: ${content.name}`;
      listData.push(
        <View
          key={listData.length}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 100, height: 100, margin: 15}}
            source={{uri: content.images[0]}}
          />
        </View>,
      );
      listData.push(
        <Text key={listData.length}>
          {' '}
          c?? h??n {content.numberRate} l?????t ????nh gi?? v???i s??? ??i???m trung b??nh l??{' '}
          {content.avgRate}.
        </Text>,
      );
      break;
    case CHAT_BOT_TYPES.ASK_BEST_SELL:
      msg = `S???n ph???m c?? t??n: ${content.name}`;
      listData.push(
        <View
          key={listData.length}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 100, height: 100, margin: 15}}
            source={{uri: content.images[0]}}
          />
        </View>,
      );
      listData.push(
        <Text key={listData.length}>
          {' '}
          c?? h??n {content.numberBuy} l?????t mua h??ng.
        </Text>,
      );
      break;
    case CHAT_BOT_TYPES.ASK_PRODUCT:
      msg = `S???n ph???m c?? t??n: ${content?.product?.name || type}`;
      let msgTmp = '';
      if (content.quantityOptions) {
        for (let i = 0; i < content.quantityOptions.length - 1; i++) {
          msgTmp += `m??u ${content.quantityOptions[i].color} v?? size ${content.quantityOptions[i].size} c?? s??? l?????ng hi???n c??: ${content.quantityOptions[i].quantity}, `;
        }
      }
      if (content.quantityOptions.length - 1 >= 0)
        msgTmp += `m??u ${
          content.quantityOptions[content.quantityOptions.length - 1].color
        } v?? size ${
          content.quantityOptions[content.quantityOptions.length - 1].size
        } c?? s??? l?????ng hi???n c??: ${
          content.quantityOptions[content.quantityOptions.length - 1].quantity
        }`;
      content?.product && content.product
        ? listData.push(
            <View
              key={listData.length}
              style={{
                flexDirection: 'row',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 100, height: 100, margin: 15}}
                source={{uri: content.product.images[0]}}
              />
            </View>,
          )
        : null;
      listData.push(
        <Text key={listData.length}>
          {msgTmp}
          {content.infoMore}
        </Text>,
      );
      break;
    case CHAT_BOT_TYPES.ASK_LOW_DELIVERY:
      break;
    case CHAT_BOT_TYPES.ASK_HOW_TO_BUY:
      msg =
        '????? ?????t h??ng qu?? kh??ch c???n (c???p nh???t ????? th??ng tin c?? nh??n n???u ch??a c???p nh???t. Sau ???? truy c???p v??o s???n ph???m v?? nh???n mua h??ng. N???u mu???n mua s???n ph???m ???? c?? s???n ph???m trong v?? nh???n mua h??ng';
      break;
    default:
      msg = content;
      break;
  }
  return {msg, listData};
}
