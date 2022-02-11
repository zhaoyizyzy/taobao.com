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
    let divs = this.children('form');

    btns.on(defaults.ev, function () {
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });

  }
});