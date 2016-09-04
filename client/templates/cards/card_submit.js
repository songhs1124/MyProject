Template.cardSubmit.events({
    'submit form': function (e, template) {

        /* 사용하지 않으면 submit시 브라우저가 새로고침 된다. */
        e.preventDefault();

        /* 이벤트를 호출한 요소를 가져오기 위해 사용 */
        var delegateTarget = e.delegateTarget;

        /* 작성한 카드 내용을 가져옴 */
        var cardName = template.$('.card-name').val();

        /* 카드 내용이 있을 경우에만 동작 */
        if (cardName) {

            /* 카드에 넣어줄 값 셋팅 */
            var card = {
                cardName: cardName,
                listIndex: template.data._id
            };

            /* 카드 추가 함수 호출 후 카드 내용과 등록창을 없애고 카드 등록 버튼을 보여준다. */
            Meteor.call('cardInsert', card, function () {
                template.$('.card-name').val('');
                $(delegateTarget).find('.add-card').css('display', 'block');
                template.$('.card-submit').css('display', 'none');
            });
        }
    },

    /* 닫기 버튼을 누르면 카드 내용과 등록창을 없애고 카드 등록 버튼을 보여준다. */
    'click .close-card': function (e, template) {
        var delegateTarget = e.delegateTarget;
        template.$('.card-name').val('');
        $(delegateTarget).find('.add-card').css('display', 'block');
        template.$('.card-submit').css('display', 'none');
    }
});