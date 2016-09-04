import {check} from 'meteor/check';

/* 리스트 컬렉션 추가 */
Lists = new Mongo.Collection('lists');

Meteor.methods({

    /* 리스트 등록 함수 */
    listInsert: function (listName) {
        check(listName, String);
        return Lists.insert({
            listName: listName,
            userId: Meteor.user()._id
        });
    },

    /* 리스트 삭제 함수 */
    listDelete: function (listIndex) {
        check(listIndex, String);
        return Lists.remove(listIndex)
    },

    /* 리스트 수정 함수 */
    listUpdate: function (listAttributes) {
        check(listAttributes, {
            listIndex: String,
            listName: String
        });
        return Lists.update(listAttributes.listIndex, {
            $set: { listName: listAttributes.listName }
        });
    }
});