function WEATHER() {
    // 広島(310000)の予報を取得
    let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            //console.log(weather);

            // 特定の地域(南部)だけ選択して変数に詰め直す

            let Datetime = weather[0].reportDatetime //取得時間
            let Defines = weather[0].timeSeries[0].timeDefines //予報時間
            let area = weather[0].timeSeries[0].areas[0]; //三日分（波、天気、風）
            //console.log(Datetime, Defines, area, "===============================");

            let tempAverage = weather[1].tempAverage.areas[0]; //広島平年温度
            let temp = weather[1].timeSeries[1].areas[0]; //広島温度
            let Defines2 = weather[1].timeSeries[1].timeDefines //予報時間
                //console.log(Defines2, temp, tempAverage);
            return weather
        });


}

function WEATHER_NOW() {

    url = "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            return weather

        });
}

function warning() {
    url = "https://www.jma.go.jp/bosai/warning/data/warning/340000.json";
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            console.log(weather);
            let warning = weather.areaTypes[1].areas[10].warnings //東広島の警報情報
            console.log(warning);
        });



}

function Googlemap() {
    var directionsService = new google.maps.DirectionsService();
    let start = "伊藤忠エネクスグループ エネクスフリート株式会社 東広島西条店、〒739-0022 広島県東広島市西条町上三永１５０９";
    let end = "広島市役所、〒730-8586 広島県広島市中区国泰寺町１丁目６−３４";
    let request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING',
        avoidTolls: true,
        drivingOptions: {
            departureTime: new Date( /* now, or future date */ ),
            trafficModel: "pessimistic",
        },
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            console.log(result.routes[0].summary, result.routes[0].legs[0].duration, result.routes[0].legs[0].duration_in_traffic);
        }
    });

    start = "伊藤忠エネクスグループ エネクスフリート株式会社 東広島西条店、〒739-0022 広島県東広島市西条町上三永１５０９";
    end = "福山駅、〒720-0066 広島県福山市三之丸町３０";

    request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING',
        avoidTolls: true,
        drivingOptions: {
            departureTime: new Date( /* now, or future date */ ),
            trafficModel: "pessimistic",
            //best_guess ※デフォルト
            //正確に予測
            //⇒リクエストされた時刻や曜日に関連する過去のデータやリアルタイムの交通状況に基づいて、最適な移動時間が算出されます。

            //optimistic
            //楽観的に予測

            //pessimistic
            //悲観的に予測

        },
    };
    directionsService.route(request, function(result2, status) {
            if (status == 'OK') {
                console.log(result2.routes[0].summary, result2.routes[0].legs[0].duration, result2.routes[0].legs[0].duration_in_traffic);
                //Math.floor(Math.round(value/60)/ 60)時間
                //Math.floor(Math.round(value/60)% 60)f分
            }
        }

    );
}

function hinode() {
    var times = SunCalc.getTimes(new Date(), 34.4, 132.7);
    console.log(times.sunrise, "日の出", times.sunset, "日の入り")
}

//hinode(); //日の出計算
//WEATHER(); //天気API
//Googlemap(); //GoogleAPI