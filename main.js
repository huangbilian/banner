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
      $left.css({opacity:0.5});
      $right.css({opacity:0.5});
    })
    //鼠标离开，箭头消失，继续轮播
    $box.mouseleave(function(){
      /*left.style.display="none";
      right.style.display="none";*/
      $left.css({opacity:0});
      $right.css({opacity:0});
      timer = setInterval(next,3000);
    })


    var index =1;
    //上一张
    function pre(){
      index--;
      navs();
      jump(slider,{left: -1200*index}, function(){
        if(index == 0){
          slider.style.left = '-6000px';
          index = 5;
        }
      });
    }
    //下一张
    function next(){
      index++;
      navs();
      jump(slider,{left: -1200*index}, function(){
        if(index == 6){
          slider.style.left = '-1200px';
          index = 1;
        }
      });
    }

    //点击切换
    for(var i = 0; i < $navs.length; i++){
      (function(i){
        $($navs[i]).click(function(){
          index = i+1;
          navs();
          jump(slider,{left: -1200*index},null);
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

    function getStyle(s, attr){
      if(s.currentStyle){
        return s.currentStyle[attr];
      } else {
        return getComputedStyle(s, null)[attr];
      }
    }

    function jump(s,b, callback){
      //var timer = s.timer;
      clearInterval(s.timer);
      s.timer = setInterval(function(){
        var isStop = true;
        for(var attr in b){
          var now = parseInt(getStyle(s,attr));
          var speed = (b[attr]-now)/10;
          speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
          var next = now + speed;
          s.style[attr] = next + 'px';
          if(b[attr] !== next){
            isStop = false;
          }
        }
        if(isStop){
          clearInterval(s.timer);
          callback && callback();
        }
      }, 30)
    }
  }

  return{
    show:show
  }

})()
