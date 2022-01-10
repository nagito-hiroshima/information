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
            return weather;

        });
}

function warning() {
    url = "https://www.jma.go.jp/bosai/warning/data/warning/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            let warning = weather //東広島の警報情報
            return warning;
        });



}


function tempsDay() {

    url = "https://www.jma.go.jp/bosai/amedas/data/latest_time.txt";
    return fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(time) {
            console.log(time);
            day = (time.replace('-', "")).replace("-", "").substring(0, 8);
            time = time.substring(11, 13)
            if (time >= "00" && time < "03") {
                time = "00"
            } else if (time >= "03" && time < "06") {
                time = "03"
            } else if (time >= "06" && time < "09") {
                time = "06"
            } else if (time >= "09" && time < "12") {
                time = "09"
            } else if (time >= "12" && time < "15") {
                time = "12"
            } else if (time >= "15" && time < "18") {
                time = "15"
            } else if (time >= "18" && time < "21") {
                time = "18"
            } else if (time >= "21") {
                time = "21"
            }

            url = "https://www.jma.go.jp/bosai/amedas/data/point/67376/" + day + "_" + time + ".json";
            console.log(url, time, "==-これ")

            return fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(temple) {
                    return temple;
                });
        });
}

function Googlemap1() {
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
    return directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            return result

        }
    });
}

function Googlemap2() {
    var directionsService = new google.maps.DirectionsService();
    let start = "伊藤忠エネクスグループ エネクスフリート株式会社 東広島西条店、〒739-0022 広島県東広島市西条町上三永１５０９";
    let end = "福山駅、〒720-0066 広島県福山市三之丸町３０";

    let request = {
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
    return directionsService.route(request, function(result2, status) {
            if (status == 'OK') {
                return result2

            }
        }

    );
    console.log(result)

}

function hinode() {
    var times = SunCalc.getTimes(new Date(), 34.4, 132.7);
    console.log(times.sunrise, "日の出", times.sunset, "日の入り")
}

//hinode(); //日の出計算
//WEATHER(); //天気API
//Googlemap(); //GoogleAPI