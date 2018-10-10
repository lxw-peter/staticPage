// 获取影评数据
$(function () {
    $.ajax({
        type: 'GET',
        url:'http://api.douban.com/v2/movie/subject/9439341/comments',
        data: {id:9439341,start: 0, count: 10, total: 10},
        success: function (data) {
            console.log(data);
        }
    })
})