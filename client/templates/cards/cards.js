Template.cards.helpers({

    /* 카드 목록을 가져오기 위해 사용 */
    cards: function () {
        return Cards.find({listIndex: this._id});
    }
});

Template.cards.rendered = function () {

    /* 드래그 앤 드랍 효과를 주기위해 jquery-ui package 사용 */
    this.$('.cards').sortable();
};