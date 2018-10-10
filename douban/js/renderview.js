// 渲染正在热映
//点击显示全部影片则加载更多数据

$(function(){
    var start = 0;
    var count = 15;
    var clickCount = 0;
// 首次进入页面执行getDate及getComingDate函数获取影片数据
    getDate(start,count);
    getComingDate ();
    //每次点击都会获取指定数量的影片数据
    $('#getMoreDate').on('click',function(){
        clickCount++;
        start = count * clickCount + 1;
    /*  0   ---  15
        16  ---  30   
            ... */
        getDate(start,count);
    })

    // var city = $('#city').val();
    function getDate (start,count){
        $.ajax({
            type: 'GET',
            url:'https://api.douban.com/v2/movie/in_theaters',
            data: {start: start,count: count},
            success: function(data) {
                console.log(data);
                var subjects = data.subjects; 
                subjects.forEach(function(item){
                    var title = item.title;
                    var average = item.rating.average;
                    var rating = Math.floor(average);
                    var image = item.images.small;
                    var y = -11 * (10 - rating);
                    // 注意下面模板文件中的class属性
                    var str = "<li class='list-item'><ul><li class='poster'><img src="+image+" alt=''></li><li class='title'><a href='#'>"+title+"</a></li><li class='staring'><span class='rating-start' style ='background-position: 0px "+ y +'px'+" '></span><span class='s-rate'>"+average+"</span></li ><li class='sbtn'><a>选座购票</a></li></ul>";
                    // 正在热映下的class为lists添加模板标签
                    $('.now-playing .lists').append(str);
                });
            }
        })
    }
    function getComingDate () {
        $.ajax({
            type: 'GET',
            url:'https://api.douban.com/v2/movie/coming_soon',
            data: {start: 0,count: 10},
            success: function(data) {
                console.log(data);
                var subjects = data.subjects; 
                subjects.forEach(function(item){
                    var title = item.title;
                    var average = item.rating.average;
                    var rating = Math.floor(average);
                    var image = item.images.small;
                    var y = -11 * (10 - rating);
                    // 注意下面模板文件中的class属性
                    var str = "<li class='list-item'><ul><li class='poster'><img src="+image+" alt=''></li><li class='title'><a href='#'>"+title+"</a></li><li class='staring'><span class='rating-start' style ='background-position: 0px "+ y +'px'+" '></span><span class='s-rate'>"+average+"</span></li ><li class='sbtn'><a>选座购票</a></li></ul>";
                    // 正在热映下的class为lists添加模板标签
                    $('.coming-soon .lists').append(str);
                });
            }
        })
    }
})
