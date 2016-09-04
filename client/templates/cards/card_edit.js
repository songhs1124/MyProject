Template.cardEdit.helpers({

    /* cardName 값을 가져오기 위해 사용 */
    card: function () {
        var cardIndex = Session.get('cardIndex');
        return Cards.findOne(cardIndex);
    }
});