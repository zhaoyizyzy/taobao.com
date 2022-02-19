$.fn.extend({
  tabs(options) {
    const defaults = {
      ev: 'click', // 默认事件
      active: 'active',  // 默认选项(className)
      display: 'display' // 默认内容显示(className)
    };
    $.extend(defaults, options); // 合并对象

    // 获得元素
    let btns = this.children('ul').children('li');
    let divs = this.children('div');

    btns.on(defaults.ev, function () {
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });

  }
});
$.fn.extend({
  showImg(options) {
    const defaults = {
      ev: 'mousemove', // 默认事件
      active: 'active',  // 默认选项(className)
      display: 'display' // 默认内容显示(className)
    };
    $.extend(defaults, options); // 合并对象

    // 获得元素
    let btns = this.children('ul').children('li');
    let divs = this.children('.top');

    btns.on(defaults.ev, function () {
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });

  }
});

// color 选项卡
$.fn.extend({
  color(options) {
    const defaults = {
      ev: 'mousemove', // 默认事件
      active: 'active',  // 默认选项(className)
      display: 'display' // 默认内容显示(className)
    };
    $.extend(defaults, options); // 合并对象

    // 获得元素
    let btns = this.children('ul').children('li');
    let divs = $('.show>.middle>li');

    btns.on(defaults.ev, function () {
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });

  }
});
$.fn.extend({
  color2(options) {
    const defaults = {
      ev: 'mousemove', // 默认事件
      active: 'active',  // 默认选项(className)
      display: 'display' // 默认内容显示(className)
    };
    $.extend(defaults, options); // 合并对象

    // 获得元素
    let btns = this.children('ul').children('li');
    let divs = $('.l-left>.show>.top');

    btns.on(defaults.ev, function () {
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });

  }
});


$(function () {
  $('.s3').tabs({
    ev: 'mousemove',
    active: 'active',
    display: 'display'
  });
});
$(function () {
  $('#spa').tabs({
    ev: 'click',
    active: 'active',
    display: 'display'
  });
});
$(function () {
  $('.show').showImg({
    ev: 'mousemove',
    active: 'active',
    display: 'display'
  });

  $('.r-left>.color').color({
    ev: 'click',
    active: 'active',
    display: 'active'
  });

  $('.r-left>.color').color2({
    ev: 'click',
    active: 'active',
    display: 'display'
  });

  $('.r-left>.size>ul>li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
  })

  let num = 1;
  $('.r-left>.count>div>span>.r').on('click', function () {
    num++;
    $('.r-left>.count>div>span>input').attr({ value: num });
  })
  $('.r-left>.count>div>span>.l').on('click', function () {
    if (num <= 0) {
      num = 0
    } else {
      num--;
      $('.r-left>.count>div>span>input').attr({ value: num });
    }

  })
});


//放大镜

$(function () {
  let small = $('.show>.top>.small'),
    movebox = $('.show>.top>.small>.movebox'),
    big = $('.show>.top>.big'),
    bigImg = $('.show>.top>.big>img');

  // 1. 鼠标悬停事件
  small.on('mouseenter', function () {
    movebox.addClass('show');
    big.addClass('show');

    // 2. 让movebox跟随鼠标移动

    movebox.css({
      width: small.width() * big.width() / bigImg.width() + 'px',
      height: small.height() * big.height() / bigImg.height() + 'px',
    });

    small.on('mousemove', function (ev) {
      // let top = ev.offsetY - movebox.height() / 2;
      // let left = ev.offsetX - movebox.width() / 2;
      let top = ev.pageY - 285 - movebox.height() / 2;
      let left = ev.pageX - 203 - movebox.width() / 2;

      // 4. 比例计算
      let ratio = bigImg.width() / (small.width());
      let ratio2 = bigImg.height() / small.height();

      if (top <= 0) {
        top = 0;
      } else if (top >= small.height() - movebox.height()) {
        top = small.height() - movebox.height();
      }

      if (left <= 0) {
        left = 0;
      } else if (left >= small.width() - movebox.width()) {
        left = small.width() - movebox.width();
      }


      movebox.css({
        top: top + 'px',
        left: left + 'px'
      });

      bigImg.css({
        top: top * -ratio2 + 'px',
        left: left * -ratio + 'px'
      });
    })

    small.on('mouseleave', function () {
      movebox.removeClass('show')
      big.removeClass('show')
    })

  })

})

//数据渲染
$(function () {

  let id = location.search.split('=')[1];

  $.ajax({
    url: '../interface/items.php',
    type: 'get',
    data: { id },
    dataType: 'json'
  }).then(res => {
    let pic = JSON.parse(res.picture);

    $('.box>.title').html(`${res.title}`);
    $('.tb-price>.right>.left>span:last').html(`${res.price}`);
    $('.count>div>.num>span').html(`${res.num}`)
    $('.xq>.se3').html(`${res.details}`)


    let mid = $('.show>.middle>li>img');
    let top = $('.show>.top>.small>img');
    let big = $('.show>.top>.big>img');
    let color = $('.r-left>.color>ul>li>img');
    let xq = $('.xq>.se1>.imgbox>img');
    xq.attr({ src: `./${pic[0].src}` })
    for (var i = 0; i < pic.length; i++) {
      let el = pic[i];
      let tem = `./${el.src}`
      mid.eq(i).attr({ src: tem })
      top.eq(i).attr({ src: tem })
      big.eq(i).attr({ src: tem })
      color.eq(i).attr({ src: tem })
    }

    // console.log(res.type)
    // 添加购物车
    $('.additems').on('click', function () {
      addItems(res.id, $('.r-left>.count>div>span>input').val());
    })
  }).catch(xhr => {
    console.log(xhr.status);
  })
});

function addItems(id, num) {
  let product = { id, num };

  let shop = cookie.get('shop');

  if (shop) {
    shop = JSON.parse(shop);

    if (shop.some(el => el.id == id)) {

      let index = shop.findIndex(elm => elm.id == id);
      let count = parseInt(shop[index].num);
      count += parseInt(num);
      shop[index].num = count;

    } else {
      shop.push(product);
    }
  } else {
    shop = [];
    shop.push(product);
  }

  cookie.set('shop', JSON.stringify(shop));
}