## Step01, 02
### photonkit.com  
디자인 공수를 들이지 않고 UI를 만들수 있다.   

    npm install photonkit -S

[photonkit 사용법](photonkit.com/getting-started/)   
[photonkit UI](http://photonkit.com/components/)

## Step03

01. home, github 버튼 클릭스 해당 리스트로 이동
02. command + v로 리스트 추가
03. 리스트 삭제
04. 클릭시 링크로 이동
05. 앱 종료 후에도 데이터 유지

### clipboard
electron 제공
메인 프로세스와 렌더러 프로세스 양쪽 모두에서 사용 가능

[clipboard](https://electronjs.org/docs/api/clipboard)

## URL에서 타이틀을 얻어내기 위한 모듈
### SuperAgent
html 컨텐츠를 가져옴
[SuperAgent](https://visionmedia.github.io/superagent/)

### get-title
컨텐츠로부터 타이틀을 추출
[get-title](https://www.npmjs.com/package/get-title)

### fs
nodejs에서 파일과 디렉토리에 관련된 작업을 할 수 있게 하는 모듈(동기/비동기 지원)
[fs]https://hyc7575.github.io/2017/05/09/2017-05-09-nodeJs-fs-module/

### path
파일의 경로를 다루기 위한 코어 모듈

## Step04
### Tray
### Menu
### clipboard

### electron-packager
실행파일을 만들기 위한 플러그인

* npm script
````json
    "pack": "electron-packager . --overwrite"
````
