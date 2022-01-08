function contents1() {
    let weather = WEATHER(); //直近３日の気象庁APIをたたく

    Promise.resolve(weather).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        weather = value;
        //let Datetime = weather[0].reportDatetime //取得時間
        let Defines = weather[0].timeSeries[0].timeDefines //予報時間
        let weatherCode = weather[0].timeSeries[0].areas[0].weatherCodes; //三日分（波、天気、風）
        let tempAverage = weather[1].tempAverage.areas[0]; //広島平年温度
        let temp = weather[1].timeSeries[1].areas[0]; //広島温度
        let Defines2 = weather[1].timeSeries[1].timeDefines //予報時間
        console.log(weather)

        if (weather[0].timeSeries[2].areas[0].temps.length == 4) {
            console.log("それな")
            max1 = weather[0].timeSeries[2].areas[0].temps[0] //今日の最高気温
            low1 = weather[0].timeSeries[2].areas[0].temps[1] //今日の最低気温
            max2 = weather[0].timeSeries[2].areas[0].temps[3] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[2] //明日の最低気温を取得
            if (low1 == max1) { //今日の最低気温が取得できなかった時「-」を表示
                low1 = "-"
            }
            if (max1 == "") { //今日の気温を取得できなかった時「-」を表示
                max1 = "-"
            }

        } else {
            console.log("わかる")
            max1 = "-";
            low1 = "-";
            max2 = weather[0].timeSeries[2].areas[0].temps[1] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[0] //明日の最低気温を取得
        }
        let max3 = temp.tempsMax[1] //明後日の最高気温を取得
        let low3 = temp.tempsMin[1] //明後日の最低気温を取得

        //今日の表示処理
        let today = Number(Defines[0].substr(8, 2)); //日にちを０１＝＞１に変更
        document.getElementById('today').innerHTML = today + "日"; //日に書き込み
        let todaycode = weatherCode[0]; //天気コード代入
        icon1.src = "./img/Icons/" + whatcode(todaycode); //天気コードを引数で呼び出し
        document.getElementById('max1').innerHTML = max1 + "℃"; //最高気温書き込み
        document.getElementById('low1').innerHTML = low1 + "℃"; //最低気温書き込み

        //明日の表示処理
        let tomorrow = Number(Defines[1].substr(8, 2));
        document.getElementById('tomorrow').innerHTML = tomorrow + "日";
        let tomorrowcode = weatherCode[1];
        icon2.src = "./img/Icons/" + whatcode(tomorrowcode);
        document.getElementById('max2').innerHTML = max2 + "℃";
        document.getElementById('low2').innerHTML = low2 + "℃";

        //明後日の表示処理
        if (Defines.length == 3) {
            let day_after_tomorrow = Number(Defines[2].substr(8, 2));
            document.getElementById('day_after_tomorrow').innerHTML = day_after_tomorrow + "日";
            let day_after_tomorrowcode = weatherCode[2];
            icon3.src = "./img/Icons/" + whatcode(day_after_tomorrowcode);
            document.getElementById('max3').innerHTML = max3 + "℃";
            document.getElementById('low3').innerHTML = low3 + "℃";
        } else {
            let day_after_tomorrow = tomorrow + 1;
            document.getElementById('day_after_tomorrow').innerHTML = day_after_tomorrow + "日";
            document.getElementById('max3').innerHTML = "-℃";
            document.getElementById('low3').innerHTML = "-℃";

        }

        //平均気温の表示処理
        let average_max = weather[1].tempAverage.areas[0].max //平均最高気温代入
        let average_low = weather[1].tempAverage.areas[0].min //平均最低気温代入
        document.getElementById('max').innerHTML = average_max + "℃"; //平均最高気温書き込み
        document.getElementById('low').innerHTML = average_low + "℃"; //平均最低気温書き込み

        //右下の情報源の表示処理
        let Datetime = (weather[0].reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays').innerHTML = Defines[0].substr(8, 2); //情報発表日時を書き込み

        //今日の天気
        icon4.src = "./img/Icons/" + whatcode(todaycode); //天気コードを引数で呼び出し
        document.getElementById('max4').innerHTML = max1 + "℃"; //最高気温書き込み
        document.getElementById('low4').innerHTML = low1 + "℃"; //最低気温書き込み
        document.getElementById('wind').innerHTML = weather[0].timeSeries[0].areas[0].winds[0]
        document.getElementById('wave').innerHTML = weather[0].timeSeries[0].areas[0].waves[0]
        document.getElementById('pop').innerHTML = weather[0].timeSeries[1].areas[0].pops[0] + "%"

        console.log(weather, today, todaycode, tomorrow, tomorrowcode, day_after_tomorrow, day_after_tomorrowcode);
        console.log("=");
        console.log(average_max, average_low, Datetime, temp, Defines2, weather);
    })

}

function contents2() {
    let weather = WEATHER_NOW();
    Promise.resolve(weather).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        weather = value;
        //右下の情報源の表示処理
        document.getElementById('texts').innerHTML = weather.text;
        let Datetime = (weather.reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime2').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays2').innerHTML = (weather.reportDatetime).substr(8, 2); //情報発表日時を書き込み
        document.getElementById('todays3').innerHTML = "(" + Number((weather.reportDatetime).substr(8, 2)) + "日)"; //情報発表日時を書き込み

        console.log(weather.text)
    })
}

function contents3() {
    let weather = WEATHER();
    Promise.resolve(weather).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        weather = value;
        if (weather[0].timeSeries[2].areas[0].temps.length == 4) {
            console.log("それな")
            max1 = weather[0].timeSeries[2].areas[0].temps[0] //今日の最高気温
            low1 = weather[0].timeSeries[2].areas[0].temps[1] //今日の最低気温
            max2 = weather[0].timeSeries[2].areas[0].temps[3] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[2] //明日の最低気温を取得
            if (low1 == max1) { //今日の最低気温が取得できなかった時「-」を表示
                low1 = "-"
            }
            if (max1 == "") { //今日の気温を取得できなかった時「-」を表示
                max1 = "-"
            }

        } else {
            console.log("わかる")
            max1 = "-";
            low1 = "-";
            max2 = weather[0].timeSeries[2].areas[0].temps[1] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[0] //明日の最低気温を取得
        }
        let temp = weather[1].timeSeries[1].areas[0];
        var table = document.getElementById('table');

        var collection = table.rows;
        table.rows[3].cells[2].innerHTML = '<div class="temp2"><div class="max">' + weather[0].timeSeries[2].areas[0].temps[3] + '</div>/<div class="low">' + weather[0].timeSeries[2].areas[0].temps[2] + '</div></div>'
        table.rows[3].cells[1].innerHTML = '<div class="temp2"><div class="max">' + max1 + '℃</div>/<div class="low">' + low1 + '℃</div></div>'
        table.rows[2].cells[1].innerHTML = weather[0].timeSeries[1].areas[0].pops[0] + "%";
        table.rows[2].cells[2].innerHTML = weather[0].timeSeries[1].areas[0].pops[4] + "%";
        table.rows[1].cells[1].innerHTML = '<img src="./img/Icons/' + whatcode(weather[0].timeSeries[0].areas[0].weatherCodes[0]) + '">';
        table.rows[3].cells[2].innerHTML = '<div class="temp2"><div class="max">' + max2 + '℃</div>/<div class="low">' + low2 + '℃</div></div>';

        console.log(max2, low2);

        let Datetime = (weather[0].reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime4').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays4').innerHTML = (weather[0].reportDatetime).substr(8, 2); //情報発表日時を書き込み

        console.log(Datetime)

        for (i = 0; i < 7; i++) {
            let week = '<img src="./img/Icons/' + whatcode(weather[1].timeSeries[0].areas[0].weatherCodes[i]) + '">';
            let iday = Number(weather[1].timeSeries[0].timeDefines[i].substr(8, 2)) + "日"
            let itemp = '<div class="temp2"><div class="max">' + temp.tempsMax[i + 1] + '℃</div>/<div class="low">' + temp.tempsMin[i + 1] + '℃</div></div>'
            table.rows[0].cells[i + 2].innerText = iday;
            table.rows[1].cells[i + 2].innerHTML = week;
            table.rows[2].cells[i + 3].innerText = weather[1].timeSeries[0].areas[0].pops[i + 1] + "%";
            table.rows[3].cells[i + 3].innerHTML = itemp;
        }

    })

}

function contents4() {
    let high_warning = [],
        middle_warning = [],
        low_warning = [];
    let warnings = warning();
    Promise.resolve(warnings).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        warnings = value;
        console.log(warnings)
        document.getElementById('warning_text').innerHTML = warnings.headlineText; //
        let Datetime = (warnings.reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime5').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays5').innerHTML = (warnings.reportDatetime).substr(8, 2); //情報発表日時を書き込み



        warnings = warnings.areaTypes[1].areas[0].warnings
        if (warnings[0].status != "発表警報・注意報はなし") {
            $('.warning_none').css('display', 'none');




            for (i = 0; i < warnings.length; i++) {
                if (warnings[i].status != "解除") {
                    let num = whatwarningcode(warnings[i].code)
                    if (num.indexOf("特別") > 0) {
                        high_warning.push(num);
                    } else if (num.indexOf("警報") > -1) {
                        middle_warning.push(num)
                    } else {
                        low_warning.push(num)
                    }


                }

            }
            for (i = 0; i < high_warning.length; i++) {
                $("#warning").append("<div class=level3>" + high_warning[i] + "</div>")
            }
            for (i = 0; i < middle_warning.length; i++) {
                $("#warning").append("<div class=level2>" + middle_warning[i] + "</div>")
            }
            for (i = 0; i < low_warning.length; i++) {
                $("#warning").append("<div class=level1>" + low_warning[i] + "</div>")
            }
        }

        console.log("特別警報は" + high_warning + "////警報" + middle_warning + "////注意報" + low_warning);
    })


}

function plays(num) {
    let music;
    switch (num) {
        case 1:
            music = new Audio('./audio/Zihou01-1.mp3');
            break
        case 2:
            music = new Audio('./audio/Phrase03-1.mp3');
    }

    music.volume = .5;
    music.play();
}