let no=1;
function tests(){
setInterval(test3, 20000);
setInterval(test1000,300000);
}

function test1000(){
    contents1();
    contents2();
    contents3();
}


function test(){
    $('.contents1').css('display', 'none');
    contents2();
    $('.contents2').css('display', 'block');
    window.setTimeout(test2,4000);


 
    
    
}

function test2(){
    $('.contents2').css('display', 'none');
    contents3();
    $('.contents3').css('display', 'block');
}
//window.setTimeout(test,4000);

function test3(){
    
    switch (no) {
        case 1:
            $('.contents3').css('display', 'none');
            
            $('.contents1').css('display', 'block')
            no=2
            break
        case 2:
            $('.contents1').css('display', 'none');
            
            $('.contents2').css('display', 'block');
            no=3
            break

        case 3:
            $('.contents2').css('display', 'none');
            
            $('.contents3').css('display', 'block');
            no=1
            break



    }
}

//setInterval(test3, 1000);