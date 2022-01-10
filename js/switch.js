let no = 1;

function tests() {
    load();
    contents5();
    setInterval(test3, 20000); //表示切り替え20秒(20000)単位
    setInterval(load, 300000); //情報更新五分単位
    setInterval(contents5, 90000);
    test3();
    //$('.contents1').css('display', 'none');
    //$('.contents5').css('display', 'block')

}


function load() {

    contents1();
    contents2();
    contents3();
    contents4();


}

//window.setTimeout(test,4000);

function test3() {
    switch (no) {
        case 1:
            $('.contents5').css('display', 'none');
            $('.contents1').css('display', 'block')
            no = 2
            break
        case 2:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'block');
            no = 3
            break

        case 3:
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'block');
            no = 4
            break
        case 4:
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'block');
            no = 5
            break
        case 5:
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'block');
            no = 1
            break


    }
}

//setInterval(test3, 1000);