let no = 1;

function tests() {
    load();
    setInterval(test3, 20000); //表示切り替え20秒単位
    setInterval(load, 300000); //情報更新五分単位

}

function load() {
    contents1();
    contents2();
    contents3();
    contents4();
    //$('.contents1').css('display', 'none');
    //$('.contents4').css('display', 'block')
}

//window.setTimeout(test,4000);

function test3() {
    switch (no) {
        case 1:
            $('.contents4').css('display', 'none');
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
            no = 1


    }
}

//setInterval(test3, 1000);