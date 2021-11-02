# 열품타 클론코딩 - review

https://github.com/kimyouknow/yulpum
열품타 클론코딩한 것을 리빌딩(rebuilding)하고 있습니다.

## 개선한 점


### Client
- useState와 useEffect에 따른 리랜더링 문제 개선
- usecallback을 이용해 state가 변경되어도 재선언되지 않게 했다.
- propTyeps를 이용해 state의 type을 검사
- withRouter를 이용해 하위 메뉴 정리
- modalWrapper를 이용해 모달component분리

### Server
- deprecated된 bodyParser 대신 express.urlencoded로 해결
- findUser, findSubject 같은 반복되는 작업을 middleware로 추가
- mongoose의 populate 활용 및 static 커스터마이징
- calendar의 날자별 데이터를 요청할 때 statData와 lapseData를 동시에 담아서 client에 보냄

