import {check} from 'meteor/check';

/* 카드 컬렉션 추가 */
Cards = new Mongo.Collection('cards');

Meteor.methods({

    /* 카드 등록 함수 */
    cardInsert: function (cardAttributes) {
        check(cardAttributes, {
            listIndex: String,
            cardName: String
        });
        return Cards.insert({
            listIndex: cardAttributes.listIndex,
            cardName: cardAttributes.cardName,
            userId: Meteor.user()._id,

            /* 댓글 수를 보여주기 위해 초기값 0을 넣는다. */
            commentsCount: 0
        });
    },

    /* 카드 삭제 함수 */
    cardDelete: function (cardIndex) {
        check(cardIndex, String);
        return Cards.remove(cardIndex);
    },

    /* 리스트에 등록된 카드 삭제 함수 */
    cardOfListDelete: function (listIndex) {
        check(listIndex, String);
        return Cards.remove({
            listIndex: listIndex
        });
    },

    /* 카드 수정 함수 */
    cardUpdate: function (cardAttributes) {
        check(cardAttributes, {
            cardIndex: String,
            cardName: String
        });
        return Cards.update(cardAttributes.cardIndex, {
            $set: { cardName: cardAttributes.cardName }
        });
    }
});