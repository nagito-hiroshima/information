function contents1() {
    let weather = WEATHER(); //直近３日の気象庁APIをたたく

    Promise.resolve(weather).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        weather = value;
        let Defines = weather[0].timeSeries[0].timeDefines //予報時間
        let weatherCode = weather[0].timeSeries[0].areas[0].weatherCodes; //三日分（波、天気、風）
        let temp = weather[1].timeSeries[1].areas[0]; //広島温度
        let Defines2 = weather[1].timeSeries[1].timeDefines //予報時間

        if (weather[0].timeSeries[2].areas[0].temps.length == 4) { //温度が４つ返って来たとき
            max1 = weather[0].timeSeries[2].areas[0].temps[0] //今日の最高気温
            low1 = weather[0].timeSeries[2].areas[0].temps[1] //今日の最低気温
            max2 = weather[0].timeSeries[2].areas[0].temps[3] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[2] //明日の最低気温を取得
            if (low1 == max1) { //今日の最低気温が取得できなかった時
                let weather = tempsDay();
                Promise.resolve(weather).then(function(value) {
                    // ここでプロミスオブジェクトの中身をああだこうだする。
                    let keys_array = Object.keys(value);
                    let len = keys_array.length - 1
                    low1 = value[keys_array[len]].minTemp[0]
                })

            }
            if (max1 == "") { //今日の気温を取得できなかった時
                let weather = tempsDay();
                Promise.resolve(weather).then(function(value) {
                    // ここでプロミスオブジェクトの中身をああだこうだする。
                    let keys_array = Object.keys(value);
                    let len = keys_array.length - 1
                    low1 = value[keys_array[len]].maxTemp[0]
                })
            }

        } else { //通常４つの温度集以外の温度集がかえって来たとき

            let temps = tempsDay();
            Promise.resolve(temps).then(function(value) {
                // ここでプロミスオブジェクトの中身をああだこうだする。
                let keys_array = Object.keys(value);
                let len = keys_array.length - 1
                max1 = value[keys_array[len]].maxTemp[0] //今日の記録された最高気温を取得代入
                low1 = value[keys_array[len]].minTemp[0] //今日の記録された最低気温を取得代入
                return low1, max1
            })

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
        window.setTimeout(function() {
            document.getElementById('max1').innerHTML = max1 + "℃"; //最高気温書き込み
            document.getElementById('low1').innerHTML = low1 + "℃"; //最低気温書き込み
        }, 200);


        //明日の表示処理
        let tomorrow = Number(Defines[1].substr(8, 2)); //日にちを01=>1に変更
        document.getElementById('tomorrow').innerHTML = tomorrow + "日"; //明日の日にちを表示
        let tomorrowcode = weatherCode[1]; //明日の天気コードを宣言
        icon2.src = "./img/Icons/" + whatcode(tomorrowcode); //天気コードから画像を参照表示
        document.getElementById('max2').innerHTML = max2 + "℃"; //明日の最高気温
        document.getElementById('low2').innerHTML = low2 + "℃"; //明日の最低気温

        //明後日の表示処理
        if (Defines.length == 3) { //取得した時間が３つ分しかない時（通常）
            let day_after_tomorrow = Number(Defines[2].substr(8, 2)); //日にちを01=>1に変更
            document.getElementById('day_after_tomorrow').innerHTML = day_after_tomorrow + "日"; //明後日の日にちを表示
            let day_after_tomorrowcode = weatherCode[2]; //明後日の天気コードを宣言
            icon3.src = "./img/Icons/" + whatcode(day_after_tomorrowcode); //天気コードから画像を参照表示
            document.getElementById('max3').innerHTML = max3 + "℃"; //明後日の最高気温
            document.getElementById('low3').innerHTML = low3 + "℃"; //明後日の最低気温
        } else {
            let day_after_tomorrowcode = weather[1].timeSeries[0].areas[0].weatherCodes[2] //一週間の天気から天気コードを取得
            icon3.src = "./img/Icons/" + whatcode(day_after_tomorrowcode); //天気コードから画像を参照
            let day_after_tomorrow = tomorrow + 1; //明後日の日にちを明日＋１にして表示（月末は上手く表示されない！！！！！！修正希望！！！！！！）
            document.getElementById('day_after_tomorrow').innerHTML = day_after_tomorrow + "日"; //明後日の日にちを表示
            max3 = weather[1].timeSeries[1].areas[0].tempsMax[2] //明後日の最高気温を１週間の天気から取得
            low3 = weather[1].timeSeries[1].areas[0].tempsMin[2] //明後日の最低気温を１週間の天気から取得
            document.getElementById('max3').innerHTML = max3 + "℃"; //明後日の最高気温
            document.getElementById('low3').innerHTML = low3 + "℃"; //明後日の最低気温

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


        //今日の天気詳細の部分（contents2）
        //今日の天気
        icon4.src = "./img/Icons/" + whatcode(todaycode); //天気コードを引数で呼び出し
        window.setTimeout(function() {
            document.getElementById('max4').innerHTML = max1 + "℃"; //最高気温書き込み
            document.getElementById('low4').innerHTML = low1 + "℃"; //最低気温書き込み
        }, 500);
        document.getElementById('wind').innerHTML = weather[0].timeSeries[0].areas[0].winds[0] //今日の風向きを表示
        document.getElementById('wave').innerHTML = weather[0].timeSeries[0].areas[0].waves[0] //今日の波の高さを表示
        document.getElementById('pop').innerHTML = weather[0].timeSeries[1].areas[0].pops[0] + "%" //今日の降水確率を表示
    })

}

function contents2() {
    let weather = WEATHER_NOW();
    Promise.resolve(weather).then(function(weather) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        //右下の情報源の表示処理
        document.getElementById('texts').innerHTML = weather.text; //天気説明を代入
        let Datetime = (weather.reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime2').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays2').innerHTML = (weather.reportDatetime).substr(8, 2); //情報発表日時を書き込み
        document.getElementById('todays3').innerHTML = "(" + Number((weather.reportDatetime).substr(8, 2)) + "日)"; //情報発表日時を書き込み
    })
}

function contents3() {
    var table = document.getElementById('table');
    let weather = WEATHER();
    Promise.resolve(weather).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        weather = value;
        if (weather[0].timeSeries[2].areas[0].temps.length == 4) {
            max1 = weather[0].timeSeries[2].areas[0].temps[0] //今日の最高気温
            low1 = weather[0].timeSeries[2].areas[0].temps[1] //今日の最低気温
            max2 = weather[0].timeSeries[2].areas[0].temps[3] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[2] //明日の最低気温を取得
            if (low1 == max1) { //今日の最低気温が取得できなかった時「-」を表示
                let temps = tempsDay();

                Promise.resolve(temps).then(function(value) {
                    // ここでプロミスオブジェクトの中身をああだこうだする。
                    let keys_array = Object.keys(value);
                    let len = keys_array.length - 1
                    low1 = value[keys_array[len]].minTemp[0] //今日の記録された最低気温を取得代入
                    table.rows[3].cells[1].innerHTML = '<div class="temp2"><div class="max">' + max1 + '℃</div>/<div class="low">' + low1 + '℃</div></div>'
                })

                table.rows[2].cells[1].innerHTML = weather[0].timeSeries[1].areas[0].pops[0] + "%"; //今日の降水確率
                //table.rows[2].cells[2].innerHTML = weather[0].timeSeries[1].areas[0].pops[4] + "%";


                //table.rows[3].cells[2].innerHTML = '<div class="temp2"><div class="max">' + weather[0].timeSeries[2].areas[0].temps[3] + '</div>/<div class="low">' + weather[0].timeSeries[2].areas[0].temps[2] + '</div></div>'






            }

        }
        let temp = weather[1].timeSeries[1].areas[0];
        for (i = 0; i < weather[1].timeSeries[0].timeDefines.length; i++) {
            let week = '<img src="./img/Icons/' + whatcode(weather[1].timeSeries[0].areas[0].weatherCodes[i]) + '">';
            let iday = Number(weather[1].timeSeries[0].timeDefines[i].substr(8, 2)) + "日"
            let itemp = '<div class="temp2"><div class="max">' + temp.tempsMax[i] + '℃</div>/<div class="low">' + temp.tempsMin[i] + '℃</div></div>'
            table.rows[0].cells[i + 1].innerText = iday;
            table.rows[1].cells[i + 1].innerHTML = week;
            table.rows[2].cells[i + 1].innerText = weather[1].timeSeries[0].areas[0].pops[i] + "%";
            table.rows[3].cells[i + 1].innerHTML = itemp;
        }

        if (weather[0].timeSeries[2].areas[0].temps.length != 4) {
            max2 = weather[0].timeSeries[2].areas[0].temps[1] //明日の最高気温を取得
            low2 = weather[0].timeSeries[2].areas[0].temps[0] //明日の最低気温を取得
                //table.rows[1].cells[1].innerHTML = '<img src="./img/Icons/' + whatcode(weather[0].timeSeries[0].areas[0].weatherCodes[0]) + '">';
            table.rows[2].cells[1].innerHTML = weather[0].timeSeries[1].areas[0].pops[0] + "%"; //今日の降水確率
            table.rows[3].cells[1].innerHTML = '<div class="temp2"><div class="max">' + max2 + '℃</div>/<div class="low">' + low2 + '℃</div></div>';
        }
        if (table.rows[2].cells[1].innerText== "%"){
            table.rows[2].cells[1].innerText = weather[0].timeSeries[1].areas[0].pops[0] + "%" //今日の降水確率を表示
        }

        let Datetime = (weather[0].reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime4').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays4').innerHTML = (weather[0].reportDatetime).substr(8, 2); //情報発表日時を書き込み



    })

}

function contents4() {
    let high_warning = [],
        middle_warning = [],
        low_warning = [];
    $("#warning").empty()

    let warnings = warning();
    Promise.resolve(warnings).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする
        warnings = value;
        if (warnings.headlineText == "注意報を解除します。") {
            document.getElementById('warning_text').innerHTML = ""
        } else {
            document.getElementById('warning_text').innerHTML = warnings.headlineText; //
        }
        let Datetime = (warnings.reportDatetime).substr(11, 5) //情報発表時間をフォーマット
        document.getElementById('publishingtime5').innerHTML = Datetime; //情報発表時間書き込み
        document.getElementById('todays5').innerHTML = (warnings.reportDatetime).substr(8, 2); //情報発表日時を書き込み



        warnings = warnings.areaTypes[1].areas[10].warnings
        if (warnings[0].status != "発表警報・注意報はなし" && warnings[0].status != "解除") {
            $('.warning_none').css('display', 'none');




            for (i = 0; i < warnings.length; i++) {
                if (warnings[i].status != "解除") {
                    let num = whatwarningcode(warnings[i].code)
                    if (num.indexOf("特別") > 0) {
                        high_warning.push(num.replace("特別警報", ""));
                    } else if (num.indexOf("警報") > -1) {
                        middle_warning.push(num.replace("警報", ""))
                    } else {
                        low_warning.push(num.replace("注意報", ""))
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
        }else {
            $('.warning_none').css('display', 'block');
        }
    })


}

function contents5() {

    let google = Googlemap1();
    Promise.resolve(google).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする

        window.setTimeout(function() {
            result = value
            hiroshimaSummary = result.routes[0].summary
            hiroshimaDuration = result.routes[0].legs[0].duration.value
            hiroshimaTraffic = result.routes[0].legs[0].duration_in_traffic.value

            hiroshimaMD = Math.floor(hiroshimaDuration / 60)
            hiroshimaMM = Math.floor(hiroshimaTraffic / 60)
            hiroshimaM = Math.floor(hiroshimaTraffic % 3600 / 60)
            hiroshimaH = Math.floor(hiroshimaTraffic / 3600)
            hiroshimaSABUN = hiroshimaMD - hiroshimaMM;
            if (hiroshimaH == 0) {
                document.getElementById('hiroshimatime').innerHTML = hiroshimaM + "分";
            } else {
                document.getElementById('hiroshimatime').innerHTML = hiroshimaH + "時間" + hiroshimaM + "分";
            }

            if (hiroshimaSABUN > 0) {
                document.getElementById('hiroshimadelay').innerHTML = "<div class='puls'>(-" + hiroshimaSABUN + "分)</div>";
            } else if (hiroshimaSABUN == 0) {
                document.getElementById('hiroshimadelay').innerHTML = "<div class='plus'>(通常通り)</div>";
            } else {
                document.getElementById('hiroshimadelay').innerHTML = "<div class='minus'>(+" + -(hiroshimaSABUN) + "分)</div>";
            }
        }, 2000)

    })

    google = Googlemap2();
    Promise.resolve(google).then(function(value) {
        // ここでプロミスオブジェクトの中身をああだこうだする。
        //処理出来る形にする

        window.setTimeout(function() {
            result = value
            Summary = result.routes[0].summary
            Duration = result.routes[0].legs[0].duration.value
            Traffic = result.routes[0].legs[0].duration_in_traffic.value


            fukuyamaMD = Math.floor(Duration / 60)
            fukuyamaMM = Math.floor(Traffic / 60)
            fukuyamaM = Math.floor(Traffic % 3600 / 60)
            fukuyamaH = Math.floor(Traffic / 3600)
            fukuyamaSABUN = fukuyamaMD - fukuyamaMM;


            if (fukuyamaH == 0) {
                document.getElementById('fukuyamatime').innerHTML = fukuyamaM + "分";
            } else {
                document.getElementById('fukuyamatime').innerHTML = fukuyamaH + "時間" + fukuyamaM + "分";
            }

            if (fukuyamaSABUN > 0) {
                document.getElementById('fukuyamadelay').innerHTML = "<div class='puls'>(-" + fukuyamaSABUN + "分)</div>";
            } else if (fukuyamaSABUN == 0) {

                document.getElementById('fukuyamadelay').innerHTML = "<div class='puls'>(通常通り)</div>";
            } else {
                document.getElementById('fukuyamadelay').innerHTML = "<div class='minus'>(+" + -(fukuyamaSABUN) + "分)</div>";
            }
        }, 2000)
    });
    document.getElementById('todays6').innerHTML = new Date().getHours() + "時" + new Date().getMinutes() + "分時点";

}

function contents6() {
    const times = hinode();
    let sumout = "'" + times.sunrise + "'"
    let sumin = "'" + times.sunset + "'"
    document.getElementById('sumtimeout').innerHTML = sumout.substring(17, 22);
    document.getElementById('sumtimein').innerHTML = sumin.substring(17, 22);;
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

    music.volume = .8;
    music.play();
}