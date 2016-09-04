Template.cardModal.helpers({

    /* card.js에서 넣어준 userId를 가져와 현재 로그인 사용자와 비교하여 동일 id면 true 반환 */
    isOwner() {
        var userId = Session.get('userId');
        return userId === Meteor.userId();
    },

    /* cardName 값을 가져오기 위해 사용 */
    card: function () {
        var cardIndex = Session.get('cardIndex');
        return Cards.findOne(cardIndex);
    },

    /* comment 값을 가져오기 위해 사용 */
    comments: function () {
        var cardIndex = Session.get('cardIndex');
        return Comments.find({cardIndex: cardIndex});
    }
});

Template.cardModal.events({

    /* 카드 삭제 버튼 클릭 시 해당 카드와 카드의 댓글들을 모두 삭제하고 modal을 숨긴다. */
    'click .del-card': function (e, template) {

        /* 카드를 삭제 하기 위해 card.js에서 넣어준 cardIndex 값을 가져온다. */
        var cardIndex = Session.get('cardIndex');

        /* 카드 삭제 함수 호출 */
        Meteor.call('cardDelete', cardIndex);

        /* 카드의 댓글 삭제 함수 호출 */
        Meteor.call('commentOfCardDelete', cardIndex);
        Modal.hide('cardModal');
    },

    /* 닫기 버튼을 누르면 modal을 숨긴다. */
    'click .close-card-modal': function (e, template) {
        Modal.hide('cardModal');
    },

    /* 카드 내용 클릭 시 해당 카드를 수정할 수 있게 카드 수정 템플릿 호출 */
    'click .card-title': function (e, template) {

        /*/!* 카드에 등록된 userId와 로그인 사용자가 같으면 수정된다. *!/
        if (this.userId === Meteor.userId()) {*/
            template.$('.card-title').css('display', 'none');
            template.$('.card-edit').css('display', 'inline-block');
            template.$('.card-edit').focus();
        /*}*/
    },

    /* 카드 수정창에서 포커스 아웃하거나 카드 내용에서 마우스를 누르게 되면 카드 수정 함수를 호출한다. */
    'focusout .card-edit, mousedown .card-modal': function (e, template) {

        /* 카드를 수정 하기 위해 card.js에서 넣어준 cardIndex 값을 가져온다. */
        var cardIndex = Session.get('cardIndex');
        var cardName = template.$('.card-edit').val();
        if (cardName) {
            var card = {
                cardIndex: cardIndex,
                cardName: cardName
            };
            Meteor.call('cardUpdate', card, function () {
                template.$('.card-title').css('display', 'inline-block');
                template.$('.card-edit').css('display', 'none');
            });
        }
    }
});