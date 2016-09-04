Template.comment.helpers({

    /* 댓글에 등록된 userId와 로그인 사용자와 비교하여 동일 id면 true 반환 */
    isOwner() {
        return this.userId === Meteor.userId();
    }
});

Template.comment.events({

    /* 댓글 수정 버튼 클릭 시 댓글 내용을 숨기고 댓글을 수정하는 템플릿을 보여준다. */
    'click .edit-comment':function(e, template){
        template.$('.comment-body').css('display', 'none');
        template.$('.comment-edit').css('display', 'block');
    },

    /* 댓글 삭제버튼 클릭 시 해당 댓글을 삭제   */
    'click .del-comment':function () {

        /* 카드의 댓글 수를 수정해 주기 위해 card.js에서 넣어준 cardIndex 값을 가져온다. */
        var cardIndex = Session.get('cardIndex');
        var comment = {
            commentIndex: this._id,
            cardIndex: cardIndex
        }
        /* 댓글 삭제 함수 호출 */
        Meteor.call('commentDelete', comment);
    }
});