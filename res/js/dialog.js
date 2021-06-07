window.onload = function(){
    /* s: naver login */

    /* e: naver login */
    /* s: kakao login */
    
    /* e: kakao login */
    /* s: google login */
    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }
    function init() {
        gapi.load('auth2', function() {
            gapi.auth2.init();
            options = new gapi.auth2.SigninOptionsBuilder();
            options.setPrompt('select_account');
            // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
            options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
            gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
        })
    }
    
    function onSignIn(googleUser) {
        var access_token = googleUser.getAuthResponse().access_token
        $.ajax({
            // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
            url: 'https://people.googleapis.com/v1/people/me'
            , data: {personFields:'birthdays', key:'AIzaSyAZDBJHv35DRlQotWKyGGwqWD4GIYvgbFo', 'access_token': access_token}
            , method:'GET'
        })
        .done(function(e){
            // get profile
            var profile = googleUser.getBasicProfile();
            console.log(profile)
        })
        .fail(function(e){
            console.log(e);
        })
    }
    function onSignInFailure(t){		
        console.log(t);
    }
    /* e: google login */
}
$(function(){
    $('.input').focus(function(){
        $(this).parent().addClass('active');
    });
    $('input').blur(function(){
        $(this).parent().removeClass('active');
    });
    $('form').submit(function(e){
        e.preventDefault();
        checkInputs();
    })
    $('input').keyup(checkInputs);
});
function checkInputs(){
    const email = $('#email');
    const emailVal = $('#email').val().trim();

    if(emailVal === ''){
        // show error
        // add error class
        setErrorFor(email, '이메일 주소를 입력해 주십시오.');
    } else if(!isEmail(emailVal)){
        setErrorFor(email, '이메일 형식에 맞게 입력해 주십시오.');
    } else {
        setSuccessFor(email);
    }
}
function setErrorFor(input, message){
    const txtField = input.parent();
    const msgError = input.next();
    // add error msg
    msgError.text(message);
    // add error class
    txtField.addClass('error');
}
function setSuccessFor(input){
    const txtField = input.parent();
    const msgError = input.next();
    txtField.removeClass('error');
    msgError.remove();
}
function isEmail(email) {
    var pattern = /[!@#$%^&*()_\+\=\-\[\]\"\']/
    return  pattern .test(email);
}