Template.card.helpers({

    /* 댓글이 있으면 true 반환 */
    isNotZero() {
        return this.commentsCount > 0;
    }
});

Template.card.events({

    /* modal을 보여주면서 modal에 값을 전달해 주기 위해 session에 값 저장 */
    'click .card-item': function (e) {
        Session.set('cardIndex', this._id);
        Session.set('listIndex', this.listIndex);
        Session.set('userId', this.userId);
        Modal.show('cardModal');
    }
});

