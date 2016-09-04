Template.listSubmit.events({
    'submit form': function (e, template) {

        /* 사용하지 않으면 submit시 브라우저가 새로고침 된다. */
        e.preventDefault();

        /* 작성한 리스트 내용을 가져옴 */
        var listName = $('.list-name').val();

        /* 리스트 내용이 있을 경우에만 동작 */
        if (listName) {

            /* 리스트 추가 함수 호출 후 리스트 내용과 등록창을 없애고 리스트 등록 버튼을 보여준다. */
            Meteor.call('listInsert', listName, function () {
                $('.list-name').val('');
                $('.add-list').css('display', 'inline-block');
                $('.list-submit-panel').css('display', 'none');
            });
        }
    },

    /* 닫기 버튼을 누르면 리스트 내용과 등록창을 없애고 리스트 등록 버튼을 보여준다. */
    'click .close-list-submit': function (e) {
        $('.list-name').val('');
        $('.add-list').css('display', 'inline-block');
        $('.list-submit-panel').css('display', 'none');
    }
});