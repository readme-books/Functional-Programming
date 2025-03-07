### \# chapter 10

## \' 일급 함수 1️⃣ \'

- 일급 값의 장점
- 일급 함수로 만드는 문법
- 고차 함수로 문법을 감싸는 방법
- 일급 함수와 고차 함수를 사용한 리팩터링 방법 2가지<br><br>


<hr>


## 일급 (first class)
- 코드로 다룰 수 있는 값
- 일급이 아닌 기능을 함수로 감싸 일급으로 만들 수 있음


### 자바스크립트에서 일급이 아닌 것
1. 수식 연산자
2. 반복문
3. 조건문
4. try / catch 블록

### 자바스크립트에서 일급으로 할 수 있는 것
1. 값을 변수에 할당
2. 함수의 인자로 넘기기
3. 함수의 리턴값으로 받기
4. 배열이나 객체에 담기


<br><br>


## 리팩터링 방법 2가지

### 리팩터링 1 _ 암묵적 인자 뽑아내기
- 암묵적 인자 O : 함수 본문에서 사용하는 어떤 값이 함수 이름에 나타나는 경우
    - 함수 구현이 거의 똑같은 경우
    - 함수 이름이 구현의 차이를 만드는 경우
- 암묵적 인자를 명시적인 함수 인자로 바꾸기
    1. 함수 이름에 있는 암묵적 인자를 확인
    2. 명시적인 인자를 추가
    3. 함수 본문에 하드 코딩된 값을 새로운 인자로 변경
    4. 함수를 호출하는 곳 수정

<br>

### 리팩터링 2 _ 함수 본문을 콜백으로 변경 (중복 없애기)
- 동작을 추상화하는 리팩터링
- 비슷한 함수에 있는 함수 본문의 서로 다른 부분을 콜백으로 변경
- 일급 함수로 어떤 함수에 동작을 전달 가능
- 서로 다른 함수의 동작 차이를 일급 함수 인자로 만듦
- 원래 있던 함수를 고차 함수로 만드는 방법
    1. 함수 본문에서 바꿀 부분의 앞뒷부분을 확인
    2. 리팩터링할 코드를 함수로 추출
    3. 추출한 함수의 인자로 넘길 부분을 또 다른 함수로 추출

<br><br>

### 리팩터링 1의 적용 예시
- 일부 필드를 수정하는 함수가 여러개 있는 것을 필드명을 함수 인자로 뽑아내어 입력할 수 있도록 변경함
- 필드명을 *문자열*로 받으므로 오타가 있다면?
    - 컴파일 타임에 검사
        - 주로 정적 타입 시스템에서 사용하는 방법
        - 자바스크립트는 정적 타입 시스템 언어가 아님, 타입스크립트와 같은 것을 사용하면 코드 실행 전에 컴파일 단계에서 오타를 알려줌
    - 런타임에 검사
        - 컴파일 타임에 동작하지 않음
        - 함수를 실행할 때 동작
        - 배열에 필드명을 다 넣어놓고 if문으로 함수 인자로 받는 필드명이 배열에 포함되어있는지(includes) 검증 후 함수 본문을 실행하도록 적용
- 필드명이 바뀐다면 매번 함수가 바뀌어야하는가
    - 함수 내부에서 필드명을 바꾸는 로직 추가
    - 필드명이 일급이기 때문에 객체나 배열에 담을 수 있어 가능한 일

<br>

`💡 모두 문자열로 통신한다`
- 웹 브라우저가 서버와 통신할 때 JSON을 보냄
- 웹 서버와 데이터베이스가 통신할 때 명령어를 문자열로 직렬화해서 보냄
- API는 클라이언트에게 받은 데이터를 런타임에 체크 (정적 언어, 동적 언어 모두 해당)
- 정적 타입 언어는 시스템에 있는 코드가 가진 타입이 일관되도록 보장함

<br>

`🔍 자바스크립트에서 객체와 배열을 사용하는 이유`
- 해시 맵은 속성과 값을 잘 표현할 수 있는 데이터 타입
- 자바 : 해시 맵, 하스켈 : 대수적 데이터 타입, 루비 : 객체 지향 언어이므로 접근자를 일급으로 다루기 쉬움
- 자바스크립트에서 **객체**는 해시 맵과 같은 기능
- 일반적인 데이터 구조의 데이터를 사용할 때 임의의 인터페이스로 감싸지 않고 객체와 배열 그대로 사용
- 데이터 그대로 사용하면 여러가지 방법으로 해석, 활용할 수 있다는 장점 => `데이터 지향`의 원칙

<br>

`🔍 정적 타입 vs 동적 타입`

| | 정적 타입 | 동적 타입 |
| :-- | :--: | :--: |
| 타입 검사 시점 | 컴파일 타임 | 런타임 |
| 대표 언어 | typescript | javascript |

#### 어느 것이 더 좋다기보다 소프트웨어 품질을 위해 개발자가 숙면하는 것이 더 중요^^


<br><br>


### 리팩터링 2의 적용 예시
- 함수 본문에서 동일한 방식으로 반복문을 사용하는 두 개의 함수에 공통된 부분을 뽑아 하나의 함수로 만들고 배열을 명시적인 인자로 받도록 리팩터링함
- 함수를 인자로 받는 고차함수
    - 코드를 추상화 할 수 있음
    - 반복문에서 다른 부분만 함수로 넘겨줄 수 있음

<br>

### 함수를 정의하는 방법 3가지
1. 전역으로 정의<br>
함수를 전역적으로 정의하고 이름을 붙임
```js
function saveCurrentUserData() { // 전역적으로 함수를 정의
    saveUserData(user);
}

withLogging(saveCurrentUserData); // 함수 이름으로 다른 함수에 전달
```
2. 지역적으로 정의<br>
함수를 지역 범위 안에서 정의하고 이름을 붙임, 범위 밖에서 사용 불가<br>
지역적으로 쓰고 싶지만 이름이 필요할 때 유용
```js
function someFunction() {
    var saveCurrentUserData = function() {  // 지역 범위에서만 쓸 수 있는 이름을 붙임
        saveUserData(user);
    };
    withLogging(saveCurrentUserData); // 함수 이름으로 다른 함수에 전달하기
}
```
3. 인라인으로 정의<br>
함수를 사용하는 곳에서 바로 정의<br>
함수를 변수 같은 곳에 넣지 않기 때문에 이름 없음(=익명함수 anonymous function)<br>
문맥에서 한번만 쓰는 짧은 함수에 사용
```js
withLogging(function() { saveUserData(user); }); // 함수 이름 없이 쓰는 곳에 서 바로 함수를 정의
```


<br>
<hr>

` 🔍 용어 정리 `
- `데이터 지향(data orientation)` : 이벤트와 엔티티에 대한 사실을 표현하기 위해 일반 데이터 구조를 사용하는 프로그래밍 형식
- `일급(first class)` : 인자로 전달할 수 있다
- `고차(higher-order)` : 함수가 다른 함수를 인자로 받을 수 있다
- `고차 함수(higher-order function)` : 인자로 함수를 받거나 리턴값으로 함수를 리턴할 수 있는 함수
- `익명 함수(anonymous function)` : 이름이 없는 함수, 익명 함수는 필요한 곳에 인라인으로 사용 가능
- `인라인(inline)` : 사용하는 곳에서 바로 정의
- `콜백 함수(callback function)` : 인자로 전달하는 함수, 콜백으로 전달되는 함수는 추후 호출될 것을 기대함, 핸들러 함수(handler function)라고도 함

<hr>