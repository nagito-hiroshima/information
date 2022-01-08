let no;
function test(){
    $('.contents1').css('display', 'none');
    contents2();
    $('.contents2').css('display', 'block');
    window.setTimeout(test22,2000);


 
    
    
}

function test2(){
    $('.contents2').css('display', 'none');
    contents3();
    $('.contents3').css('display', 'block');
}
window.setTimeout(test,2000);

function test3(){
    
    switch (no) {
        case 1:
            $('.contents3').css('display', 'none');
            contents1();
            $('.contents1').css('display', 'block')
            no=2
            break
        case 2:
            $('.contents1').css('display', 'none');
            contents2();
            $('.contents2').css('display', 'block');
            no=3
            break

        case 3:
            $('.contents2').css('display', 'none');
            contents3();
            $('.contents3').css('display', 'block');
            no=1
            break



    }
}

setInterval(test3, 1000);