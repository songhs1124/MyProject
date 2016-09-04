Template.commentEdit.events({
    'submit form': function (e, template) {

        /* 사용하지 않으면 submit시 브라우저가 새로고침 된다. */
        e.preventDefault();

        /* 이벤트를 호출한 요소를 가져오기 위해 사용 */
        var delegateTarget = e.delegateTarget;

        /* 작성한 댓글 내용을 가져옴 */
        var commentContent = template.$('.comment-content').val();

        /* 댓글 내용이 있을 경우에만 동작 */
        if (commentContent) {

            /* 댓글에 넣어줄 값 셋팅 */
            var comment = {
                commentIndex: this._id,
                commentContent: commentContent
            };

            /* 댓글 수정 함수 호출 후 댓글 수정창을 없애고 댓글 내용을 보여준다. */
            Meteor.call('commentUpdate', comment, function () {
                $(delegateTarget).find('.comment-body').css('display', 'block');
                template.$('.comment-edit').css('display', 'none');
            });
        }
    }
});