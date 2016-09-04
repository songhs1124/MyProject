Router.configure({

    /* 메인 layout 템플릿 설정 */
    layoutTemplate: 'layout',

    /* 로딩 템플릿 설정 */
    loadingTemplate: 'loading',

    /* iron router 데이터 기다리기 */
    waitOn: function () {

        /* data 구독 */
        Meteor.subscribe('lists');
        Meteor.subscribe('cards');
        Meteor.subscribe('comments');
    }
});

/* 루트 페이지 매핑 */
Router.route('/', {
    name: 'lists'
});

/* 로그인페이지 매핑 */
Router.route('/login', {
    name: 'login'
});

/* 사용자 등록 페이지 매핑 */
Router.route('/register', {
    name: 'register'
});

/* 로그인 체크 함수 */
var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('main');
        }
    } else {
        this.next();
    }
};

/* lists 템플릿 호출전에 로그인 체크 */
Router.onBeforeAction(requireLogin, {only: 'lists'});