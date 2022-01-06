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


        let today = Number(Defines[0].substr(8, 2));
        document.getElementById('today').innerHTML = today + "日";
        let todaycode = weatherCode[0];
        icon1.src = "./img/Icons/" + whatcode(todaycode);

        let tomorrow = Number(Defines[1].substr(8, 2));
        document.getElementById('tomorrow').innerHTML = tomorrow + "日";
        let tomorrowcode = weatherCode[1];
        icon2.src = "./img/Icons/" + whatcode(tomorrowcode);

        let day_after_tomorrow = Number(Defines[2].substr(8, 2));
        document.getElementById('day_after_tomorrow').innerHTML = day_after_tomorrow + "日";
        let day_after_tomorrowcode = weatherCode[2];
        icon3.src = "./img/Icons/" + whatcode(day_after_tomorrowcode);


        let average_max = weather[1].tempAverage.areas[0].max
        let average_low = weather[1].tempAverage.areas[0].min
        document.getElementById('max').innerHTML = average_max + "℃";
        document.getElementById('low').innerHTML = average_low + "℃";

        let Datetime = (weather[0].reportDatetime).substr(11, 5) //取得時間
        document.getElementById('publishingtime').innerHTML = Datetime;
        document.getElementById('todays').innerHTML = Defines[0].substr(8, 2);


        console.log(today, todaycode, tomorrow, tomorrowcode, day_after_tomorrow, day_after_tomorrowcode)
        console.log("=")
        console.log(average_max, average_low, Datetime, temp, Defines2)
    })

}