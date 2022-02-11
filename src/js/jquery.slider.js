$.fn.extend({
  slider(options) {
    const defaults = {
      speed: 600,
      delay: 2000
    };

    $.extend(defaults, options); // 合并参数

    // 函数式编程(抽象功能)
    let main = null, // 主函数 所有功能的入口 
      init = null, // 初始化函数
      start = null, // 开始动画
      stop = null, // 停止动画
      prev = null, // 播放上一张
      next = null, // 播放下一张
      timer = null, // 计时器
      elms = {}; // 命名空间 用于存放公用的内容 对象中的属性可以供多个函数共享(比如索引)

    init = () => {
      // 初始化 需要完成
      // 1. 元素选择
      elms.sliderElm = this.children('a'); // 轮播的元素
      elms.btns = this.children('span'); // 左右按钮

      // 2. 复制第一张图片放到最后
      elms.sliderElm.append(elms.sliderElm.children('img').first().clone());

      // 3. 设置索引
      elms.index = 1;

      // 4. 获得图片的宽度(每次需要移动的距离)
      // elms.width = elms.sliderElm.children('img').first().width();
      elms.width = 520;

      // 事件
      this.hover(function () {
        stop();
      }, function () {
        timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
      });

      elms.btns.on('click', function () {
        if (elms.btns.index(this)) { // 左边按钮索引是0 右边按钮索引是1
          next();
        } else {
          prev();
        }
      });
    }


    start = function (direction) {
      let left = `-=${elms.width}`;  // 默认情况 从右向左

      if (!direction) {
        left = `+=${elms.width}`; // 从左向右

        if (elms.index === 1) {
          elms.index = 4;
          let divLeft = this.offset().left;
          let imgLeft = elms.sliderElm.children('img').last().offset().left;
          elms.sliderElm.css('left', `-${imgLeft - divLeft}px`);
        }
      }



      elms.sliderElm.animate({
        left
      }, defaults.speed, function () {
        // 动画完毕后 修改索引

        if (direction) {
          elms.index++;
        } else {
          elms.index--;
        }

        if (elms.index === 4) { // 到达最大索引
          elms.index = 1;  // 初始化索引
          elms.sliderElm.css('left', 0);  // 复位定位
        }
      });
    }.bind(this);

    stop = () => {
      clearInterval(timer);
      elms.sliderElm.stop(true, true);
    }

    prev = () => {
      stop();
      start(0);
    }

    next = () => {
      stop();
      start(1);
    }

    main = () => {
      init();
      timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
    }

    main();

  }
});