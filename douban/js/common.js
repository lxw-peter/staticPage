//获取影评数据
$(function(){
// 1.tab栏切换
    var ticket = $('.article');
    var review = $('.review_article');
    var tabchange = [ticket,review];
    review.hide();
    $('.nav_a').click(function(){
        console.log($(this).parent().index());
        if($(this).parent().index()==0){
            // tabchange[0].show().siblings().hide();
            tabchange[0].show();
            tabchange[1].hide();

            
        }else{
            // tabchange[1].show().siblings().hide();
            tabchange[1].show();
            tabchange[0].hide()

        }

    })
    $('#welcome').click(function(){
        $('.show').show();
        $('.hide').hide();
    })
    $('#up_to_date').click(function(){
        $('.hide').show();
        $('.show').hide();
    })

})