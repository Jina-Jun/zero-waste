$(function(){
    // search bar - focused
    $('.search_inp').focus(function(){
        $('.placeholder').css('display', 'none');
        $('header').addClass('active');
        $('.dropdown').css('display', 'block');
        selTags();
        // add recent
        $('.search_bar button').click(function(){
            addRecent();
            $('#ui-id-1').css('display', 'none');
        });
        $('.search_inp').keyup(function(e){
            if(e.keyCode === 13){
                addRecent();
                $('#ui-id-1').css('display', 'none');
            }
            if(e.keyCode === 27){
                inpBlur();
            }
        });
        $('header').click(function(){
            $('.search_inp').focus();
        });
        // delete all tags
        delAllTags();
    });
    // searh matching
    var list = [
        '제로', '제로웨이스트', '제로페이', '제로콜라', '제로플라스틱', '플라스틱', '플라스틱프리',
        '재사용', '용기내', '분리배출', '리사이클링', '재활용', '업사이클링', '리필', '리필스테이션', '리폼'
    ]
    $('.search_inp').autocomplete({
        source: list
    });
    // search bar - unfocused
    $('section').click(function(){
        inpBlur();
    });
    // modal login
    $('.btn_login').click(function(){
        $('.modal_login').css('display', 'block');
    });
    $('.popup .i.close').click(function(){
        $('.modal_login').css('display', 'none');
    });
    $('.popup input').focus(function(){
        $(this).parent().addClass('active');
    });
    $('.popup input').blur(function(){
        $(this).parent().removeClass('active');
    });
    $('.popup form').submit(function(e){
        e.preventDefault();
        checkInputs();
    })
    $('input').keyup(checkInputs);
});
function inpBlur(){
    $('.placeholder').css('display', 'block');
        $('header').removeClass('active');
        $('input').val('');
        $('#ui-id-1, .dropdown').css('display', 'none');
        $('.search_inp').blur();
        $('.recent .tag').removeClass('sel b');
        $('.suggest .tag').removeClass('sel');
        $('.recent .tag').addClass('s');
        return;
}
function delAllTags(){
    $('.del_all').click(function(){
        $('.recent .tag').remove();
        $('.search_inp').focus();
    });
}
function addRecent(){
    if($('.search_inp').val() === '') return;
    $('.recent').append(`<span class="tag s">${$('.search_inp').val()}</span>`);
    $('.search_inp').val('').focus();
    if($('.recent span').length > 5)
        $('.recent span:first-child').remove();
    $('.recent .tag').removeClass('sel b');
    $('.suggest .tag').removeClass('sel');
    $('.recent .tag').addClass('s');
    selTags();
};
function selTags(){
    $('.dropdown .tag').mouseenter(function(){
        $(this).addClass('hover');
    })
    $('.dropdown .tag').on('mouseleave click', function(){
        $(this).removeClass('hover');
    })
    $('.dropdown .tag').on('click mouseup', function(){
        const inputText = $(this).text();
        if($(this).parent().hasClass('recent')){
            $('.search_inp').val(inputText);
            $('.search_inp').focus();
            $('.suggest .tag').removeClass('sel');
            $('.recent .tag').removeClass('sel b');
            $('.recent .tag').addClass('s');
            $(this).toggleClass('s');
        } else if($(this).parent().hasClass('suggest')){
            $('.search_inp').val(inputText.substr(1));
            $('.search_inp').focus();
            $('.recent .tag').removeClass('sel b');
            $('.recent .tag').addClass('s');
            $('.suggest .tag').removeClass('sel');
            $(this).toggleClass('b');
        }
        $(this).toggleClass('sel b');
    });
};
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