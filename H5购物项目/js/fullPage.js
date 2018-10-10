$(function(){
    var flag = true;
    var h = $(window).height();

    // 点击next往下滚动一个屏幕
    $('.next').click(function (event) {
        $.fn.fullpage.moveSectionDown();//向下滚动一屏
    });


    $('#fullPage').fullpage({//funllpage方法接受json对象格式
        //  是否显示项目导航
        navigation: true,
        // navigaPosition: "left",
        // loopBottom: true,
        //  滚动速度,单位毫秒
         scrollingSpeed: 1200,

        //  回调函数
        // 滚动到某一屏后的回调函数,接收anchorLink和index 两个参数,
        // anchorLink是锚链接的名称,index是序号,从1开始
        afterLoad: function(anchorLink,index){
            // alert(index);
            
            if (index == 2){
                $(".next").fadeOut();               

                // 搜索框出现并左移
                $('.search').show().animate({'right':450},1500,function(){
                    // 沙发两字出现
                    $('.search-words').animate({'opacity':1},500,function(){
                        // 搜索框隐藏
                        $('.search').hide();
                        // 沙发搜索框右移缩并小到电脑右上角
                        $('.search-02-1').show().animate({'height':30,'bottom':450,'right':330},800,function () {
                            // 动画结束后不会再执行
                            flag = false;
                            // console.log(flag);
                        });
                        $('.goods').show().animate({"height": 218,"bottom": 215,"left": 100},800);
                        $('.words-02').animate({"opacity": 1},500);
                            $(".next").fadeIn();//fadeIn() 方法使用淡入效果来显示被选元素

                    });
                });
               
            }
        },
        onLeave: function(index, nextIndex,direction){
            $(".next").fadeOut(); //淡出
            // 第二屏动画完成后执行
            if(index == 2 && nextIndex == 3 && flag ==false){
                
                $('.shirt-02').show().animate({'bottom': -(h-250),"width": 207, "left": 90},2000,function(){
                    $('.shirt-02').hide();
                    $(".shirt-02-1").show();
                    // 型号选择白框出现
                    $('.img-01-a').animate({"opacity": 1},500,function(){
                        // 按钮变亮
                        $('.btn-01-a').animate({"opacity": 1},500);
                    })
                });
                // 遮盖层显示
                $('.cover').show();
                    $(".next").fadeIn();

            }
            /* --------------------------- 进入四屏 */
            if(index == 3 && nextIndex == 4){
                // 三屏的沙发隐藏
                $('.shirt-02-1').hide();
                // 斜沙发从三屏掉入四屏
                $('.t1f').show().animate({'bottom': -(h-280),"left": 200},2000,function(){
                    $(this).hide();
                    $('.t1f-1').show();
                    $('.shop-car').animate({'left': 2000},1500,function(){
                        $('.words-04-a').animate({"opacity":1},500);
                        $('.info').animate({"opacity": 1},500,function(){
                            $('.info-1').animate({"opacity": 1},500);
                            $(".next").fadeIn();

                        });
                    });
                   

                })
            }
            // ---------------------------进入五屏
            if (index == 4 && nextIndex == 5) {
                // 手上升动画
                $(".hand").animate({"bottom": -40},1000,function() {
                    // 切换鼠标图片.深颜色的透明度为1
                    $(".mouse2").animate({"opacity": 1}, 500);
                    // 银行卡票据上升
                    $('.tif-2').show().animate({"bottom": 200},1000);
                    $(".card-node").animate({"bottom": 200},500,function(){
                        $(".word-card").addClass('words-card-a');//addClass()里面的类名不用加'.'
                            $(".next").fadeIn();
                        
                    });
                })
            }
            /* ---------------------------进入六屏  */
            if (index == 5 && nextIndex == 6) {
                $('.tif-2').animate({"bottom": -(h-600),"left":"50%","width":30},1000,function(){
                    $('.tif-2').hide();
                });
                $('.box').animate({"left": "47%"},1000,function(){
                    $(this).animate({"bottom": 40},1000,function(){
                        $(this).hide();
                        $('.words-05').animate({"opacity": 1},500)
                        // 背景移动
                        $('.section6').animate({"backgroundPositionX": "100%"},4000,function(){
                        $('.words-06').animate({"opacity": 1},500);
                            $('.address').show();
                            $(".men").show().animate({"height": 305},500,function(){
                                $(".men").animate({"left": "65%"},500,function(){
                                    $(".door").show();
                                    $(".women").show().animate({"height":300,"right":335},500);
                                    $('.a-goods').show();
                                    $(".next").fadeIn();

                                })
                            })
                        })
                    })
                })
            }
            // -----------------------------进入第七屏
            if (index == 6 && nextIndex == 7) {
                setTimeout(function(){
                    $('.stars').animate({"width":120},500,function(){
                        $(".praise").show();
                        $(".next").fadeIn();//fadeIn() 方法使用淡入效果来显示被选元素

                    });
                },2000)
            }
            // --------------------------------进入第八屏
           $('.go-shopping').hover(function(){
               $('.go-shopping-g').toggle();//toggle 显示和隐藏切换
           });
           $(document).mousemove (function(event){
               var x = event.pageX - $('.hand-08').width()/2;//获取鼠标在页面的x坐标
               var y = event.pageY + 10;//获取鼠标在页面的y坐标

               var minY = h - 449;
               if(y < minY){
                   y = minY;
               }
               $ ('.hand-08').css({'left':x,'top':y});
           });
            $(".again").click(function (event) {
                // 1.返回第一屏
                $.fn.fullpage.moveTo(1);
                // 2.所有动画复原
                //核心原理是 将图片(做动画的元素清除行内样式)
                // 所有带动画的div动画盒子添加move类名
                $('img,.move').attr("style",'');
            })     
        }

    });
   
})