(function(){
    window.onload = function(){
        let sear = document.getElementById('sear');
        let fdj =document.querySelector('.fdj');

        sear.oninput = function(){
            fdj.style.display = 'none';
        }
        sear.onblur = function(){
            fdj.style.display = 'block';
            sear.value = '';
        }
    }
})();

$(function(){
    $('.sec2>ul>li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});

$(function(){
   

    $('.allcheck').on('click',function(){
      $(':checkbox:not(.allcheck)').prop('checked',$(this).prop('checked'));
    });

    function isAllCheck(){
      let elms = Array.from($(':checkbox:not(.allcheck)'));
      let result = elms.every(el=>$(el).prop('checked'));
      return result;
    }

    $(':checkbox:not(.allcheck)').on('click',function(){
      $('.allcheck').prop('checked',isAllCheck());
    })
  });