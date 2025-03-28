# chapter 10 : 일급함수 1

> 코드냄새 : 함수 이름에 있는 암묵적 인자, 더 큰 문제를 가져올 수 있는 코드

- 특징1. 거의 똑같이 구현된 함수가 있다.
- 특징2. 함수이름이 구현에 있는 다른부분을 가리킨다

> 리펙터링1 : 암묵적 인자 드러내기

1. 함수 이름에 있는 암묵적 인자를 확인한다.
2. 명시적인 인자를 추가한다.
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 바꾼다.
4. 함수를 호출하는곳을 고친다

> 리펙터링2 : 함수 본문 콜백으로 바꾸기

1. 함수 본문에서 바꿀 부분의 앞부분과 뒷부분 확인
2. 리펙터링 할 코드를 함수로 빼낸다.
3. 빼낸 함수의 인자로 넘길 부분을 또다른 함수로 빼낸다
   -> 일급함수로 어떤 함수에 동작을 전달 할 수 있다.

## 코드냄새 : 함수이름에 있는 암묵적 인자

함수이름에 있는 암묵적 인자

- 함수 구현이 비슷하다.
- 함수 이름이 구현의 차이를 만든다. (필드를 결정하는 문자열이 함수 이름에 있음.)
  -> 함수 이름에서 서로 다른 부분이 암묵적 인자
  -> 값을 명시적으로 전달하지않고 함수 이름의 일부로 전달

## 리펙터링 : 암묵적인자를 드러내기

- 함수이름에 있는 암묵적 인자를 확인
- 명시적인 인자를 추가하고 함수를 부르는곳에서 고친다.

setPriceByName()이라는 함수와 SetShippingByName()함수는 인자와 함수이름만 다를뿐 기능 구현이 비슷함
->이를 setFieldByName()로 이름을 바꾸고 새로운 인자를 사용하면 암묵적인 이름은 인자로 넘길수 있는 값이 된다.

**일급 값**
: 언어에 있는 다른 값처럼 쓸 수 있음. 값은 변수나 배열을 담을수 있음

```js
function setPriceByName(cart,name,price)
function setFieldByName(cart, name, field, value)
//이름을 참조할 수 있는 방법이 없기때문에 이름을 인자로 만듦
```

## 일급인것과 일급이 아닌것

- 자바스크립트에서 일급이 아닌것 = 수식연산자, 반복문, 조건문, try-catch 문
- 자바스크립트에서 일급인것 = 배열, 객체, 값, 불리언값, 문자열
- 일급으로 할 수 있는것

  - 변수에 할당
  - 함수의 인자로 넘기기
  - 함수의 리턴값으로 받기
  - 배열이나 객체에 담기

- 해당 방법을 사용하면 코드에 자바스크립트 객체를 많이 사용되는것처럼 느낄 수 있음.
  -> 이는 데이터를 사용할 때 임의의 인터페이스로 감싸지 않고 그대로 사용한다는 뜻
  -> 데이터지향 이라는 원칙을 사용한것이기때문에 데이터가 미래에 어떤 방법으로 해석될지 미리알수 없어서 필요한 원칙
  **데이터 지향** : 이벤트와 엔티티에 대한 사실을 표현하기 위해 일반 데이터 구조를 사용하는 프로그래밍 형식

### 필드명을 문자열로 사용할때 이 "문자열"에 오타가 있다면?

- 컴파일타임에 검사하는 방법
  - 주로 정적 타입 시스템에서 사용하는 방법
  - 타입스크립트로 문자열이 사용할 수 있는 필드인지 확인 가능 -> 오타가 있다면 타입검사기가 코드 실행전 알려줌
- 런타임에 검사하는 방법
  - 컴파일 타임에 동작하지않는다.
  - 함수를 실행할때마다 동작
  - if 조건문과 includes 메소드를 사용하여 검사하는 방법
  ```js
  // 접근 가능한 필드를 모두 추가
  var validItemFields = ["price", "quantity", "shipping", "tax"];
  function setFieldByName(cart, name, field, value) {
    if (!validItemFields.includes(field))
      throw "Not a valid item field: " + "'" + field + "',";
    //생략
  }
  ```

## 리펙터링 : 함수 본문을 콜백으로 바꾸기

```js
try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}
```

위에 코드를 모든곳에서 같은 형태로 try-catch 형태의 구문을 사용함.
함수 본문을 콜백으로 바꾸기 라는 리펙터링으로 중복을 없앨 수 있다.
**콜백**
: 인자로 전달하는 함수
: 콜백으로 전달하는 함수는 나중에 호출될것을 기대함

1. 본문과 본문의 앞부분과 뒷부분을 구분한다.
   `try` : 앞부분
   `saveUserData(user)` :본문
   `catch(error)~` :뒷부분
2. 전체를 함수로 분리한다.

```js
function withLogging() {
  try {
    savedUserData(user);
  } catch (error) {
    logToSnapErrors(error);
  }
}
withLogging();
```

3. 본문 부분을 빼낸 함수의 인자로 전달한 함수를 바꾼다.
   2번에서의 함수를 수정

```js
//f는 함수를 뜻함
function withLogging(f) {
  try {
    f();
  } catch (error) {
    logToSnapErrors(error);
  }
}
withLogging(function () {
  saveUserData(user);
});
```

**함수를 정의하는 방법**

1. 전역으로 정의하기

- 함수를 전역적으로 정의하고 이름을 붙임
- 프로그램 어디서나 사용가능

2. 지역적으로 정의하기

- 지역 범위 안에서 성의하고 이름을 붙일 수 있음

3. 인라인으로 정의하기

- 함수를 사용하는곳에서 바로정의 하는 함수
- 인자 목록에서 바로 정의하는 함수가 인라인 함수

```js
withLogging(function () //이함수는 이름이 없음
{
  saveUserData(user); //쓰는곳에서 바로 함수를 정의
});
```

- 익명함수를 인라인으로 만든 문법
