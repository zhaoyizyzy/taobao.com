(function(){
    window.onload = function(){
        let sear = document.getElementById('sear');
        let fdj =document.querySelector('.fdj');
        let mr =document.querySelector('.mr');

        sear.oninput = function(){
            fdj.style.display = 'none';
            mr.style.display = 'none';
        }
        sear.onblur = function(){
            fdj.style.display = 'block';
            mr.style.display = 'block';
            sear.value = '';
        }
    }
})();

(function(){
    $(function(){
        $('.fixedtool>.pzhh').on('click',function(){
            let top = $('.sec1').offset().top;
            console.log(top);
            $('html').animate({scrollTop:top},600);
        })
    });
    $(function(){
        $('.fixedtool>.cnxh').on('click',function(){
            let top = $('.sec2').offset().top;
            $('html').animate({scrollTop:top},600);
        })
    });
    $(function(){
        $('.fixedtool>.dingbu').on('click',function(){
            $('html').animate({scrollTop:0},600);
        })
    });
    $(window).on('scroll',function(){
        let scrollTop = $(document).scrollTop();
        if(scrollTop>1042){
            $('.pzhh').removeClass('active');
            $('.cnxh').addClass('active');
        }else{
            $('.cnxh').removeClass('active');
            $('.pzhh').addClass('active');
        ;};

        if(scrollTop>450){
            $('.fixedtool').addClass('fix');
            $('.dingbu').attr('style','display:block');
        }else{
            $('.fixedtool').removeClass('fix');
            $('.dingbu').attr('style','display:none');
        ;}
        if(scrollTop>200){
            $('.fix-search').attr('style','display:block');
        }else{
            $('.fix-search').attr('style','display:none');
        ;}

    })
})();