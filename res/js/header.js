$(function(){
    // search bar
    $('.search_bar input').one('focus', function(){
        $('.placeholder').hide();
        $('header').addClass('active');
        $('.search_bar').append(`
            <div class="dropdown">
                <div class="wrap_item_dropdown">
                    <div class="item">
                        <p class="del_all"> 모두 지우기</p>
                        <p class="tit">최근 검색어</p>
                        <div class="tags recent">
                            <span class="tag s">제로웨이스트</span>
                            <span class="tag s">플라스틱</span>
                            <span class="tag s">분리배출</span>
                            <span class="tag s">누깍</span>
                            <span class="tag s">설거지솝</span>
                        </div>
                    </div>
                    <div class="item">
                        <p class="tit">추천 검색어</p>
                        <div class="tags suggest">
                            <span class="tag b">#용기내</span>
                            <span class="tag b">#재사용</span>
                            <span class="tag b">#플라스틱제로</span>
                        </div>
                    </div>
                </div>
            <div class="bg_dropdown"></div>`);
        selTags();
        // add recent
        $('.search_bar button').click(function(){
            addRecent();
        });
        $('.search_bar input').keyup(function(e){
            if(e.keyCode === 13)
                addRecent();
        });
        // delete all tags
        delAllTags();
    });
    var list = [
        '제로', '제로웨이스트', '제로페이', '제로콜라', '제로플라스틱', '플라스틱', '플라스틱프리',
        '재사용', '용기내', '분리배출', '리사이클링', '재활용', '업사이클링', '리필', '리필스테이션', '리폼'
    ]
    $('.search_bar input').autocomplete({
        source: list
    });
    function delAllTags(){
        $('.del_all').click(function(){
            $('.recent .tag').remove();
            $('.search_bar input').focus();
        });
    }
    function addRecent(){
        if($('.search_bar input').val() === '') return;
        $('.recent').append(`<span class="tag s">${$('.search_bar input').val()}</span>`);
        $('.search_bar input').val('').focus();
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
            var inputText = $(this).text();
            if($(this).parent().hasClass('recent')){
                $('.search_bar input').val(inputText);
                $('.search_bar input').focus();
                $('.suggest .tag').removeClass('sel');
                $('.recent .tag').removeClass('sel b');
                $('.recent .tag').addClass('s');
                $(this).toggleClass('s');
            } else if($(this).parent().hasClass('suggest')){
                $('.search_bar input').val(inputText.substr(1));
                $('.search_bar input').focus();
                $('.recent .tag').removeClass('sel b');
                $('.recent .tag').addClass('s');
                $('.suggest .tag').removeClass('sel');
                $(this).toggleClass('b');
            }
            $(this).toggleClass('sel b');
        });
    };
});