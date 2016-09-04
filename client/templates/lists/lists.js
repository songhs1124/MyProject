Template.lists.helpers({

    /* 리스트 목록을 가져오기 위해 사용 */
    lists: function () {
        return Lists.find();
    }
});

Template.lists.rendered = function () {

    /* 드래그 앤 드랍 효과를 주기위해 jquery-ui package 사용 */
    this.$('.lists').sortable()
};

Template.lists.events({

    /* 리스트 등록 버튼 클릭 시 리스트 등록 버튼을 숨기고 리스트를 등록하는 템플릿을 보여준다. */
    'click .add-list': function () {
        $('.add-list').css('display', 'none');
        $('.list-submit-panel').css('display', 'inline-block');
    }
});