function test(){
    $('.contents1').css('display', 'none');
    contents2();
    $('.contents2').css('display', 'block');
    window.setTimeout(test2,2000);


 
    
    
}

function test2(){
    $('.contents2').css('display', 'none');
    contents3();
    $('.contents3').css('display', 'block');
}
window.setTimeout(test,2000);