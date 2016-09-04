Template.login.helpers({

    /* session의 에러 메시지를 가져와 반환한다. */
    loginErrorMessage: function () {
        return Session.get('loginErrorMessage');
    }
});

Template.login.events({
    'submit form': function (e) {

        /* 사용하지 않으면 submit시 브라우저가 새로고침 된다. */
        e.preventDefault();

        /* 입력한 이메일과 비밀번호를 내용을 가져온다. */
        var email = $('.login-email').val();
        var password = $('.login-password').val();

        /* Meteor의 로그인 함수에 아이디와 비밀번호를 넘겨준다. */
        Meteor.loginWithPassword(email, password, function (error) {

            /* error가 발생하면 error.message를 session에 넣어준다. */
            if (error)
                Session.set('loginErrorMessage', error.message);

            /* error가 없으면 router의 lists를 호출 */
            else
                Router.go('lists');
        });
    },

    /* 뒤로가기 버튼 클릭하면 전 페이지 이동 */
    'click .back': function () {
        window.history.back();
    }
});