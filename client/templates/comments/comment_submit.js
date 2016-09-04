Template.commentSubmit.events({
    'submit form': function (e, template) {

        /* 사용하지 않으면 submit시 브라우저가 새로고침 된다. */
        e.preventDefault();

        /* 작성한 댓글 내용을 가져옴 */
        var commentContent = template.$('.comment-content').val();

        /* cardIndex와 listIndex 값을 넣기 위해 card.js에서 넣어준 세션값을 가져옴 */
        var cardIndex = Session.get('cardIndex');
        var listIndex = Session.get('listIndex');

        /* 댓글 내용이 있을 경우에만 동작 */
        if (commentContent) {

            /* 댓글에 넣어줄 값 셋팅 */
            var comment = {
                commentContent: commentContent,
                cardIndex: cardIndex,
                listIndex: listIndex
            };

            /* 댓글 추가 함수 호출 후 입력창의 댓글 내용을 없앤다. */
            Meteor.call('commentInsert', comment, function () {
                template.$('.comment-content').val('');
            });
        }
    }
});