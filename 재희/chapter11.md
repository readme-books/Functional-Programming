### \# chapter 11

## ' 일급 함수 2️⃣ '

- 함수 본문을 콜백으로 바꾸기 리팩터링 더 알아보기
- 함수를 리턴하는 함수가 가진 힘 이해하기
- 고차 함수에 익숙해지기<br><br>


<hr>


## copy-on-write 함수 -> '함수 본문을 콜백으로 바꾸기' 리팩터링 적용


### 배열용 `withArrayCopy()`
### 변경 전
```js
function arraySet(array, idx, value) {
  var copy = array.slice();
  copy[idx] = value;
  return copy;
}
```

### 변경 후
```js
function arraySet(array, idx, value) {
  return withArrayCopy(array, function(copy) {
    copy[idx] = value;
  });
}

function withArrayCopy(array, modify) {
  var copy = array.slice();
  modify(copy);
  return copy;
}
```
<br>


### 객체용 `withObjectCopy()`

### 변경 전
```js
function objectSet(object, key, value) {
  var copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}
```

### 변경 후
```js
function objectSet(object, key, value) {
  return withObjectCopy(object, function(copy) {
    copy[key] = value;
  })
}

function withObjectCopy(object, modify) {
  var copy = Object.assign({}, object);
  modify(copy);
  return copy;
}
```
<br>

### 리팩터링으로 얻은 것
1. 표준화된 원칙
2. 새로운 동작에 원칙을 적용할 수 있음
3. 여러 개를 변경할 때 최적화

<br>

### 고차함수의 장단점
- 패턴이나 원칙을 코드로 만들 수 있음 -> 재사용성
- 함수를 리턴하는 함수를 만들 수 있음, 리턴 받은 함수를 변수에 할당해서 이름이 있는 일반 함수처럼 사용 가능
- 중복 코드를 없애주지만 가독성을 해칠 수 있음 -> 적절한 곳에 사용할 것

<br>

<hr>

P.276
### 연습문제 `tryCatch(sendEmail, logToSnapErrors)`

### 변경 전
```js
try {
  sendEmail();
} catch(error) {
  logToSnapErrors(error);
}
```

### 변경 후
### 오답
```js
function tryCatch(sendEmail, logToSnapErrors);

function tryCatch(tryFn, catchFn) {
  try {
    tryFn();
  } catch(error) {
    catchFn()
  }
}
```
### 정답
```js
function tryCatch(sendEmail, logToSnapErrors);

function tryCatch(tryFn, catchFn) {
  try {
    return tryFn();
  } catch(error) {
    return catchFn()
  }
}
```


<br>
<hr>