var $banner=(function(){
  var $ban = $(''
    + '<div class="slider" id="slider">'
      + '<div class="slide"><img src="img/b5.png" alt=""></div>'
      + '<div class="slide"><img src="img/b1.png" alt=""></div>'
      + '<div class="slide"><img src="img/b2.png" alt=""></div>'
      + '<div class="slide"><img src="img/b3.png" alt=""></div>'
      + '<div class="slide"><img src="img/b4.png" alt=""></div>'
      + '<div class="slide"><img src="img/b5.png" alt=""></div>'
      + '<div class="slide"><img src="img/b1.png" alt=""></div>'
    + '</div>'
    + '<span id="left"><</span>'
    + '<span id="right">></span>'
    + '<ul class="nav" id="navs">'
      + '<li class="active">1</li>'
      + '<li>2</li>'
      + '<li>3</li>'
      + '<li>4</li>'
      + '<li>5</li>'
    + '</ul>');

  
  function show(){
    var $box = $('#box');
    $box.append($ban);

    var $slider = $('#slider'),
        $left = $('#left'),
        $right = $('#right');
    var $navs = $('#navs').children();

    var timer = setInterval(next, 3000);

    $left.click(function(){
      pre();
    })
    $right.click(function(){
      next();
    })

    //鼠标移上，轮播停止，箭头出现
    $box.mouseover(function(){
      clearInterval(timer);
      /*$left.css({display:'block'});
      $right.css({display:'block'});
      //display不起效果
      */
      $left.css({opacity:0.5});
      $right.css({opacity:0.5});
    })
    //鼠标离开，箭头消失，继续轮播
    $box.mouseleave(function(){
      /*$left.css({display:'none'});
      $right.css({display:'none'});*/
      next();
      $left.css({opacity:0});
      $right.css({opacity:0});
      timer = setInterval(next,3000);
    })


    var index = 1;

    //点击切换
    for(var i = 0; i < $navs.length; i++){
      (function(i){
        $($navs[i]).click(function(){
          index = i+1;
          navs();
          jump({left: -1200*index},null);
        })
      })(i);
    }

    //小圆点
    function navs(){
      for(var i = 0; i < $navs.length; i++){
        //$($navs[i]).addClass("");
        $($navs[i]).removeClass("active");
      }
      if(index > 5){
        $($navs[0]).addClass("active");
      }
      else if(index <= 0){
        $($navs[4]).addClass("active");
      }
      else {
        $($navs[index-1]).addClass("active");
      }
    }

    //上一张
    function pre(){
      index--;
      navs();
      jump({left: -1200*index}, function(){
        if(index == 0){
          $slider.css({'left':'-6000px'});
          //slider.style.left = "-6000px";
          //两种方式都可以，但是如果连续快速按的话，可能存在延迟问题
          //导致left的值不对，会无限增长，导致banner出现空白
          //离开页面会导致left值不对，还未解决
          index = 5;
          //pre();
        }
      });
      //console.log("上一页");
    }

    //下一张
    function next(){
      index++;
      navs();
      jump({left: -1200*index}, function(){
        if(index == 6){
          $slider.css({'left':'-1200px'});
          //slider.style.left = "-1200px";
          index = 1;
          //next();
        }
      });
      //console.log("下一页");
    }

    //点击切换
    for(var i = 0; i < $navs.length; i++){
      (function(i){
        $($navs[i]).click(function(){
          index = i+1;
          navs();
          jump({left: -1200*index},null);
        })
      })(i);
    }

    //小圆点
    function navs(){
      for(var i = 0; i < $navs.length; i++){
        //$($navs[i]).addClass("");
        $($navs[i]).removeClass("active");
      }
      if(index <= 0){
        $($navs[4]).addClass("active");
      }
      else if(index > 5){
        $($navs[0]).addClass("active");
      }
      else {
        $($navs[index-1]).addClass("active");
      }
    }

    //得到现在的left
    function getStyle(slider, attr){
      if(slider.currentStyle){
        return slider.currentStyle[attr];
      } else {
        return getComputedStyle(slider, null)[attr];
      }
    }

    function jump(b, callback){
      //var timer = slider.timer;
      clearInterval(slider.timer);
      slider.timer = setInterval(function(){
        var isStop = true;
        for(var attr in b){
          var now = parseInt(getStyle(slider,attr));
          var speed = (b[attr]-now)/10;
          speed = speed<0 ? Math.floor(speed): Math.ceil(speed);
          var nextV = now + speed;
          slider.style[attr] = nextV + 'px';
          if(b[attr] !== nextV){
            isStop = false;
          }
        }
        if(isStop){
          clearInterval(slider.timer);
          callback && callback();
        }
      }, 30)
    }
  }

  return{
    show:show
  }

})()
