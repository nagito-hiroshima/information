let no = 1;

function start() {
    load();
    contents5(); //contents5...GoogleAPI交通状況
    setInterval(switchs, 25000); //表示切り替え25秒(25000ms)単位
    setInterval(load, 300000); //情報更新五分単位
    setInterval(contents5, 900000); //GoogleAPIは有料の為１５分間隔で更新

    //$('.contents1').css('display', 'none');
    //$('.contents6').css('display', 'block')

}


function load() {
    contents1(); //contents1...三日間の天気予報
    contents2(); //contents2...天気詳細
    contents3(); //contents3...一週間の天気予報
    contents4(); //contents4...警報注意報
    contents6(); //contents6...日の入り日の出時刻
}

function switchs(on) {
    if (on == "before") {
        if (no <= 2) {
            no - 2
            if (no == 0) {
                no = 1
            } else {
                no = 6
            }
        } else {
            no = ((no - 2))
        }
    }



    if (no > 6) {
        no = 1
    }

    switch (no) {
        case 1:
            $('.contents1').css('display', 'block')
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'none');
            $('.contents6').css('display', 'none');
            no++
            break
        case 2:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'block');
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'none');
            $('.contents6').css('display', 'none');
            no++
            break

        case 3:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'block');
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'none');
            $('.contents6').css('display', 'none');

            no++
            break
        case 4:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'block');
            $('.contents5').css('display', 'none');
            $('.contents6').css('display', 'none');
            no++
            break
        case 5:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'block');
            $('.contents6').css('display', 'none');
            no++
            break
        case 6:
            $('.contents1').css('display', 'none');
            $('.contents2').css('display', 'none');
            $('.contents3').css('display', 'none');
            $('.contents4').css('display', 'none');
            $('.contents5').css('display', 'none');
            $('.contents6').css('display', 'block');
            no++
            break
    }
}