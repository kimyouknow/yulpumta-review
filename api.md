# HTTP 요청 리스트(ajax)

# 기본사항

/api/ 생략

# user

### POST /register

- [] 회원가입, verifypassword추가해야함
- req: body: { email(string), name(string), password(string)}
- return: {success(boolean), message(string)}

### POST /login

- [] 로그인, verifypassword추가해야함
- req: body: { email(string), password(string)}
- return: {success(boolean), message(string), token(string)}

### GET /withdrawal

- [] 탈퇴,
- req: body: {token(string)}
- return: {sucess(boolean)}

### GET /logout

- [x] 로그아웃
- req: body: { token(string)}
- return: {success(boolean)}

### GET /auth

- [x] client의 HOC관리를 위해 로그인 여부를 체크하는 미들웨어
- return: {name(string), isAuth(boolean)}

# subejct

### POST /get-subject

- [x] 유저가 만든 과목데이터를 가져옴, 각 과목별 데이터에는 오늘총공부시간이 포함
- req: body: {token(string)}
- return: {success(boolean), message(string), subjects[object]: [{_id(string), title(string), user_id(string), color(string), todayTotalT(number)}]}

### POST /add-subject

- [x] 과목을 추가, 이름같으면 추가 안 됨
- req: body: {token(string), title(string), color(string)}
- return: {success(boolean), message(string), newSubject: {\_id(string), title(string), user_id(string), color(string), todayTotalT(number)}}

### POST /edit-subject

- [x] 과목을 수정, 이름같으면 추가 안 됨
- req: body: {token(string),subject_id(string)}
- return: {success(boolean), message(string), subject: {\_id(string), title(string), user_id(string), color(string), todayTotalT(number)}}

### POST /del-subject

- [x] 과목을 삭제
- req: body: {token(string),subject_id(string)}
- return: {success(boolean), message(string)}

### POST /record-subject

- [x] laspe(과목이 활성화 된 시간)을 과목 시간에 추가
- req: body: {token(string),subject_id(string), startTime(number), endTime(number), lapse(number)}
- return: {success(boolean), message(string)}

# stat

### POST /get-stat

- [x] 해당 달 모든 날짜 별 총 공부시간을 가져옴
- req: body: {token(string),year(number), month(number)}
- return: {success(boolean), message(string), dailyTotalTimes[number] }

### POST /get-dailyLapse

- [x] 클릭한 해당 날짜의 laspe 정보를 가져옴
- req: body: {token(string),Y(number), M(number), D(number)}
- return: {success(boolean), message(string),
  dailyLapses: {user_id(string),
  subject_id(string),
  subject_title(string),
  l_date(string),
  date(number),
  l_start_time(string),
  l_end_time(string),
  l_lapse(number)}}

# plan

### POST /get-plan

- [x] 해당 달 모든 날짜 별 모든 plans을 가져옴
- req: body: {token(string),year(number), month(number)}
- return: {success(boolean), message(string), monthPlans[array]: [...plan(obejct):{user_id(string),
  p_date(string),
  date(number),
  p_isDone(boolean),
  p_title(string),
  p_desc(string)}]}

### POST /add-plan

- [x] 새로운 plan을 추가
- req: body: {token(string),title(string), desc(title), date(number)}
- return: {success(boolean), message(string), newPlan:{user_id(string),
  p_date(string),
  date(number),
  p_isDone(boolean),
  p_title(string),
  p_desc(string)}}

### POST /edit-plan

- [x] 해당 plan의 title | desc를 수정 (날짜변경은 안 됨)
- req: body: {token(string),plan_id(string), title(string), desc(string)}
- return: {success(boolean), message(string)}

### POST /del-plan

- [x] 해당 plan을 삭제
- req: body: {token(string),plan_id(string)}
- return: {success(boolean), message(string)}

### POST /com-plan

- [x] 해당 plan의 완료여부를 변경 (원래 변수의 반대로 반환)
- req: body: {token(string),plan_id(string), isDone(boolean)}
- return: {success(boolean), message(string)}

# rank

### GET / get-rank

- [] 오늘 기준, 상위 200명의 랭크를 표시
- return: {success(boolean), message(string)}

# group
