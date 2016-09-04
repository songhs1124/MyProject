/* 리스트 publish */
Meteor.publish('lists', function () {
    return Lists.find();
});

/* 카드 publish */
Meteor.publish('cards', function () {
    return Cards.find();
});

/* 댓글 publish */
Meteor.publish('comments', function () {
    return Comments.find();
});