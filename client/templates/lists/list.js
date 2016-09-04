Template.list.helpers({

    /* 리스트에 등록된 userId와 로그인 사용자와 비교하여 동일 id면 true 반환 */
    isOwner() {
        return this.userId === Meteor.userId();
    }
});

Template.list.events({

    /* 카드 등록 버튼 클릭 시 카드 등록 버튼을 숨기고 카드를 등록하는 템플릿을 보여준다. */
    'click .add-card': function (e, template) {
        template.$('.add-card').css('display', 'none');
        template.$('.card-submit').css('display', 'block');
    },

    /* 리스트 삭제 버튼 클릭 시 해당 리스트와 리스트의 카드, 댓글 들을 모두 삭제한다. */
    'click .del-list': function () {
        Meteor.call('listDelete', this._id);
        Meteor.call('cardOfListDelete', this._id);
        Meteor.call('commentOfListDelete', this._id);
    },

    /* 리스트 내용 클릭 시 해당 리스트를 수정할 수 있게 리스트 수정 템플릿 호출 */
    'click .list-title': function (e, template) {

        /* 리스트에 등록된 userId와 로그인 사용자가 같으면 수정된다. */
        if (this.userId === Meteor.userId()) {
            template.$('.list-title').css('display', 'none');
            template.$('.list-edit').css('display', 'inline-block');
            template.$('.list-edit').focus();
        }
    },

    /* 리스트 수정창에서 포커스 아웃하거나 리스트 내용에서 마우스를 누르게 되면 리스트 수정 함수를 호출한다. */
    'focusout .list-edit, mousedown .list-content': function (e, template) {
        var listName = template.$('.list-edit').val();
        if (listName) {
            var list = {
                listIndex: this._id,
                listName: listName
            };
            Meteor.call('listUpdate', list, function () {
                template.$('.list-title').css('display', 'inline-block');
                template.$('.list-edit').css('display', 'none');
            });
        }
    }
});