let no = 1;

function tests() {
    load();
    contents5(); //contents5...GoogleAPI交通状況
    setInterval(switchs, 20000); //表示切り替え20秒(20000)単位
    setInterval(load, 300000); //情報更新五分単位
    setInterval(contents5, 900000); //GoogleAPIは有料の為１５分間隔で更新

    //$('.contents1').css('display', 'none');
    //$('.contents5').css('display', 'block')

}


function load() {

    contents1(); //contents1...三日間の天気予報
    contents2(); //contents2...天気詳細
    contents3(); //contents3...一週間の天気予報
    contents4(); //contents4...警報注意報


}

//window.setTimeout(test,4000);

function switchs() {
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