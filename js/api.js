function WEATHER() { //３日間天気API
    // 広島(310000)の予報を取得
    let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            return weather
        });
}

function WEATHER_NOW() { //今日の天気詳細API
    url = "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(weather) {
            return weather;

        });
}

function warning() { //警報注意報API
    url = "https://www.jma.go.jp/bosai/warning/data/warning/340000.json";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(warning) { //東広島の警報情報
            return warning;
        });
}


function tempsDay() { //記録された温度API
    url = "https://www.jma.go.jp/bosai/amedas/data/latest_time.txt";
    return fetch(url)
        .then(function(response) {
            return response.text(); //注意！JsonではなくTEXT形式
        })
        .then(function(time) {
            day = (time.replace('-', "")).replace("-", "").substring(0, 8); //2022-01-02T00:00:00 ==>を20220102T00:00:00に変更
            time = time.substring(11, 13) //時間だけを取得（00）

            //三時間ごとしかファイルが無いので0,1,2は０時、3,4,5は３時のファイルを参照するように分岐
            if (time >= "00" && time < "03") { //00-02
                time = "00"
            } else if (time >= "03" && time < "06") { //03-05
                time = "03"
            } else if (time >= "06" && time < "09") { //06-08
                time = "06"
            } else if (time >= "09" && time < "12") { //09-11
                time = "09"
            } else if (time >= "12" && time < "15") { //12-14
                time = "12"
            } else if (time >= "15" && time < "18") { //15-17
                time = "15"
            } else if (time >= "18" && time < "21") { //18-20
                time = "18"
            } else if (time >= "21") { //21-
                time = "21"
            }

            url = "https://www.jma.go.jp/bosai/amedas/data/point/67376/" + day + "_" + time + ".json"; //URLに日付と時間（上の）を組み合わせる

            return fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(temple) { //温度一覧をreturn
                    return temple;
                });
        });
}

function Googlemap1() { //広島行き交通状況API
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

function Googlemap2() { //福山行き交通状況API
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
    });
}

function hinode() { //日の入り
    var times = SunCalc.getTimes(new Date(), 34.4, 132.7);
    console.log(times.sunrise, "日の出", times.sunset, "日の入り")
}

//hinode(); //日の出計算
//WEATHER(); //天気API
//Googlemap(); //GoogleAPI