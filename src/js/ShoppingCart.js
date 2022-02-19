(function () {
  window.onload = function () {
    let sear = document.getElementById('sear');
    let fdj = document.querySelector('.fdj');

    sear.oninput = function () {
      fdj.style.display = 'none';
    }
    sear.onblur = function () {
      fdj.style.display = 'block';
      sear.value = '';
    }
  }
})();



$(function () {
  $('.sec2>ul>li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(function () {


  $('.allcheck').on('click', function () {
    $(':checkbox:not(.allcheck)').prop('checked', $(this).prop('checked'));
  });

  function isAllCheck() {
    let elms = Array.from($(':checkbox:not(.allcheck)'));
    let result = elms.every(el => $(el).prop('checked'));
    return result;
  }

  $(':checkbox:not(.allcheck)').on('click', function () {
    $('.allcheck').prop('checked', isAllCheck());
  })
});

// add car

$(function () {
  let shop = cookie.get('shop');

  shop = JSON.parse(shop);

  let idList = shop.map(el => el.id).join();

  $.ajax({
    url: '../interface/shop.php',
    data: { idList },
    type: 'get',
    dataType: 'json'
  }).then(res => {
    let template = '';
    res.forEach(el => {
      let pic = JSON.parse(el.picture);

      let current = shop.filter(elm => elm.id == el.id);

      template += `
        <li>
        <div class="top">
            <input type="checkbox" data-id="${el.id}">
            <span></span>
            店铺：
            <a href="">静静的小店</a>
            <span></span>
        </div>
        <div class="buttom">
            <div>
                <input type="checkbox" data-id="${el.id}">
            </div>
            <div>
                <div class="imgbox">
                    <a href="./Landing Page.html?id=${el.id}">
                        <img src="./${pic[0].src}" alt="">
                    </a>
                </div>
                <div class="content">
                    <a href="./Landing Page.html?id=${el.id}">
                        ${el.title}
                    </a>
                    <div>
                        <img src="./img/tb1.png" alt="">
                        <img src="./img/tb2.jpg" alt="">
                    </div>
                </div>
            </div>
            <div>
                <p>硬盘容量：8TB 固态硬盘</p>
                <p>颜色分类：灰色</p>
                <p>内存容量：64GB</p>
                <span class="xiugai">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiugai"></use>
                    </svg>
                </span>
                <span class="xg">修改</span>
            </div>
            <div>
                <p>￥${parseFloat(el.price).toFixed(2)}</p>
            </div>
            <div>
                <div class="count">
                    <a href="javascript:;" class="cut" data-id="${el.id}">-</a>
                    <input type="text" value="${current[0].num}" class="numb">
                    <a href="javascript:;" class="add" data-id="${el.id}">+</a>
                </div>
            </div>
            <div>
                <p class="price">￥${(el.price * current[0].num).toFixed(2)}</p>
            </div>
            <div>
               <a href="javascript:;"> 移入收藏夹</a>
               <a href="javascript:;" class="removeitem" data-id="${el.id}"> 删除</a>
               <a href="javascript:;" class="like"> 相似宝贝</a>
            </div>
        </div>
    </li>`

      $('.cartmain>.info').html(template);

      $('.info .removeitem').on('click', function () {
        let result = shop.filter(el => el.id != $(this).attr('data-id'));
        cookie.set('shop', JSON.stringify(result));
        location.reload();
      });

      // add cut
      $('.info .add').on('click', function () {

        if (shop.some(el => el.id == $(this).attr('data-id'))) {

          let index = shop.findIndex(elm => elm.id == $(this).attr('data-id'));
          let count = parseInt(shop[index].num);
          count++;
          shop[index].num = count;
          cookie.set('shop', JSON.stringify(shop));
          location.reload();
        };
      });
      $('.info .cut').on('click', function () {

        if (shop.some(el => el.id == $(this).attr('data-id'))) {

          let index = shop.findIndex(elm => elm.id == $(this).attr('data-id'));
          let count = parseInt(shop[index].num);
          count--;
          shop[index].num = count;
          cookie.set('shop', JSON.stringify(shop));
          location.reload();
        };
      });

      //选择

      $('.top>:checkbox').on('click', function () {
        let inx = $('.top>:checkbox').index(this);
        let id = $(this).attr('data-id');
        let con = parseFloat($('.price').eq(inx).html().slice(1));
        let fil = $('.top>:checkbox').filter($('.top>:checkbox').prop('checked'));
        $('.buttom>div>:checkbox').eq(inx).prop('checked', $(this).prop('checked'));

      })

      $('.buttom>div>:checkbox').on('click', function () {
        let inx = $('.buttom>div>:checkbox').index(this);
        $('.top>:checkbox').eq(inx).prop('checked', $(this).prop('checked'));

      });


      //结算
      $(':checkbox').on('change', function () {
        let all = $('.all');
        let buttom = $('.buttom>div>:checkbox');

        let con = 0;
        let count=0;
        for (let i = 0; i < buttom.length; i++) {
          // console.log(buttom.attr('checked',true));
          if (buttom.eq(i).prop("checked")) {
            con += parseFloat($('.price').eq(i).html().slice(1));
            count++;
          }
        };
        all.html(con.toFixed(2));
        $('.pay>.right>div:nth-of-type(1)>span').html(count);

        if(count){
          $('.cart-sum>a').addClass('active');
          $('.pay>.right>div:nth-of-type(3)>a').addClass('active');
        }else{
         
          $('.cart-sum>a').removeClass('active');
          $('.pay>.right>div:nth-of-type(3)>a').removeClass('active');
        }
       
      })

    });
  }).catch(xhr => {
    console.log(xhr.status);
  })
});





