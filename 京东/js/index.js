var newT = document.getElementById('newT');
var tabNewsContent = document.getElementById('tabNewsContent');
for(var i = 0; i < 2; i++){
    var link = newT.children[i];
    link.onmouseover = linkMouseover;
    link.setAttribute( 'index', i);
}
function linkMouseover(){
    for(var i = 0,len = tabNewsContent.children.length;i < len;i++){
    var div = tabNewsContent.children[i];
    if(div.className.indexOf('hide') === -1){
        div.className = 'new-b hide';
    }}
    var index = parseInt(this.getAttribute('index'));
    tabNewsContent.children[index].className = 'new-b show';
}
