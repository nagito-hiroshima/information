# デジタルサイネージサイト

## 目的

## アクセス制限について  
Googleの有料APIを使っているため、利用者を制限させる。  
### **対策**  
1.Google cloud platformの利用制限で特定サイトのみ利用可能  
・[公式版](https://www.nagito.work/info/ "nagito.work")  
・[Github Page版](https://nagito-hiroshima.github.io/information "Github Page")  
<img width="300" alt="GoogleAPI利用制限" src="https://user-images.githubusercontent.com/68215637/149043096-7e1c4370-30cf-498c-8b25-90c8d49a7ca2.png">  
  
2.専用端末のみアクセスを許可  
実際に使うのは[Amazon FireHD 10](https://www.amazon.co.jp/dp/B08F5M98W8/ref=cm_sw_r_tw_dp_FBX9J12RPDMMQEVRRD63?_encoding=UTF8&psc=1 "FireHD 10")
なのでFireHD以外からのアクセスを禁止するために（1280x800）未満だとエラーページに移行させてる。
**PCからの閲覧には検証（デベロッパーツール）で画面サイズを1280x800にするとアクセス可能**  
  
3.パスワード制限  
外部からの利用(主にドライバーさん)を禁止するためにパスワードを設定  
***パスワード：２９３８３２***  
<img width="373" alt="スクリーンショット 2022-01-12 9 49 59" src="https://user-images.githubusercontent.com/68215637/149044256-24e9cfc2-ff3a-4681-b90f-7f8f1da722db.png">  

## 仕様
* 天気予報・温度・警報注意報の取得は気象庁のAPI（JSON）を活用  
[気象庁API（JSON）参考URL](https://anko.education/apps/weather_api "参考URL")  
* 指定の目的地までの所要時間の取得はGoogleのMaps JavaScript APIとDirectionsを活用
[Google Maps Platform公式](https://mapsplatform.google.com/?hl=ja "Google Maps Platform")  
* 日の入り・日の出時間を計算させる  
使用JS  
[![GitHub Extra Pins](https://github-readme-stats.vercel.app/api/pin/?username=mourner&repo=suncalc)](https://github.com/mourner/suncalc) 

## 各セクションの説明


