import {check} from 'meteor/check';

/* 댓글 컬렉션 추가 */
Comments = new Mongo.Collection('comments');

Meteor.methods({

    /* 댓글 등록 함수 */
    commentInsert: function (commentAttributes) {
        check(commentAttributes, {
            commentContent: String,
            cardIndex: String,
            listIndex: String
        });

        /* 댓글을 등록하면 카드의 댓글 수를 1증가한다. */
        Cards.update(commentAttributes.cardIndex, {$inc: {commentsCount: 1}});
        return Comments.insert({
            commentContent: commentAttributes.commentContent,
            cardIndex: commentAttributes.cardIndex,
            listIndex: commentAttributes.listIndex,
            userId: Meteor.user()._id,

            /* 댓글에 아이디를 보여주기 위해 이메일 주소를 가져온다. */
            userEmail: Meteor.user().emails[0].address
        });
    },

    /* 댓글 삭제 함수 */
    commentDelete: function (commentAttributes) {
        check(commentAttributes, {
            commentIndex: String,
            cardIndex: String
        });

        /* 댓글을 삭제하면 카드의 댓글 수를 1감소한다.  */
        Cards.update(commentAttributes.cardIndex, {$inc: {commentsCount: -1}});
        return Comments.remove({
            _id: commentAttributes.commentIndex
        });
    },

    /* 리스트에 등록된 댓글 삭제 함수 */
    commentOfListDelete: function (listIndex) {
        check(listIndex, String);
        return Comments.remove({
            listIndex: listIndex
        });
    },

    /* 카드에 등록된 댓글 삭제 함수 */
    commentOfCardDelete: function (cardIndex) {
        check(cardIndex, String);
        return Comments.remove({
            cardIndex: cardIndex
        });
    },

    /* 댓글 수정 함수 */
    commentUpdate: function (commentAttributes) {
        check(commentAttributes, {
            commentIndex: String,
            commentContent: String
        });
        return Comments.update(commentAttributes.commentIndex, {
            $set: { commentContent: commentAttributes.commentContent }
        });
    }
});