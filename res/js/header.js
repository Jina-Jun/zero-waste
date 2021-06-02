$(function(){
    // search bar
    $('.search_bar input').focus(function(){
        $('.placeholder').hide();
        $('header').addClass('active');
        if($('header').hasClass('small')){
            $('header').removeClass('small');
            $('header').addClass('large');
        }
        $('.search_bar').append(`<div class="dropdown">
            <div class="wrap_item_dropdown">
                <div class="item recent">
                    <p class="del_all"> 모두 지우기</p>
                    <p class="tit">최근 검색어</p>
                    <div class="tags">
                        <span class="tag s">제로웨이스트</span>
                        <span class="tag s">플라스틱</span>
                        <span class="tag s">제로웨이스트</span>
                        <span class="tag s">누깍</span>
                        <span class="tag s">설거지솝</span>
                    </div>
                </div>
                <div class="item suggest">
                    <p class="tit">추천 검색어</p>
                    <div class="tags">
                        <span class="tag b">#용기내</span>
                        <span class="tag b">#재사용</span>
                        <span class="tag b">#플라스틱제로</span>
                    </div>
                </div>
            </div>
            <div class="bg_dropdown"></div>`);
            // hashtag
            $('.recent .tag').click(function(){
                $(this).toggleClass('s');
                $(this).toggleClass('hvr b');
            });
            $('.suggest .tag').click(function(){
                $(this).toggleClass('b');
                $(this).toggleClass('hvr b');
            });
            // delete all
            $('.del_all').click(function(){
                $('.recent tags').remove('span');
            });
    });

});