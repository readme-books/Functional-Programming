# chapter 11 : 일급함수 2

해당 챕터에서는 앞서 나온 고차함수와 카피온라이트 원칙을 코드로 옮기는 다양한 예제를 통해 설명한다.

## 카피-온-라이트 리팩터링 하기

**함수본문을 콜백으로 바꾸기**

1. 본문과 앞부분, 뒷부분을 확인하기
2. 함수빼내기
3. 콜백빼내기

```js
function arraySet(array, idx, value) {
  var copy = array.slice();
  copy[idx] = value;
  return copy;
}
```

--> 함수로 빼낸 함수

```js
funnction arraySet(array,idx,vlaue){
    return withArrayCopy(array)
}

function withArrayCopy(array){
    var copy = array.slice()
    copy[idx]=value
    retun copy
}
```

**카피온라이트 단계**

1. 복사본 만들기(앞부분)
2. 복사본 변경하기(본문)
3. 복사본 리턴하기(뒷부분)

```js
funnction arraySet(array,idx,value){
    return withArrayCopy(array, function(copy){
        copy[idx]=value
    })
}

function withArrayCopy(array, modify){
    var copy = array.slice()
    modify(copy)
    retun copy
}
```

-> 리펙터링으로 얻은것 :

- 표준화된 원칙
- 새로운 동작에 원칙을 적용할 수 있음
- 여러개 변경시의 최적화 가능

## 연습문제 중 헷갈렸던 부분만 정리

- 슈퍼파워 기능이 있는 함수, 함수를 리턴하는 함수
  **슈퍼파워** : 에러를 잡아서 snap errors로 보내는 기능

  - 로그를 남겨야하는 모든 함수에 이런 비슷한 try-catch구문으로 감싸야했음

  ```js
  // 원래코드
  try {
    saveUserData(user);
  } catch (error) {
    logToSnapErrors(error);
  }
  // 1차 수정
  try {
    fetchProduct(productId);
  } catch (error) {
    logToSnapErrors(error);
  }
  ```

- 이것도 fetchProduct 구문만 다른부분이고 나머지는 모든코드에서 중복된다.

```js
// 2차 수정
function wrapLogging(f) {
  return function () {
    try {
      f();
    } catch (error) {
      logToSnapErrors(error);
    }
  };
}
```

- 로그를 남기기 위한 일반적인 시스템이 생겼지만 여전히 문제가 있다.

1. 로그를 수동으로 남겨야하는데 휴먼에러가 발생할 수 있음.
2. 모든 코드에 수동으로 withLogging()함수를 적용해야한다.

```js
//최종 수정법 : 자동으로 슈퍼파워를 주기
function wrapLogging(f) {
  return function (arg) {
    try {
      f(arg);
    } catch (error) {
      logToSnapErrors(error);
    }
  };
}

const saveUserDataWithLogging = wrapLogging(saveUserData);

saveUserDataWithLogging(user);
```

## 요점정리

- 고차함수로 패턴이나 원칙을 코드로 만들면, 고차함수를 한번 정의하고 필요한곳에 여러번 재사용 가능하다.
- 고차함수로 함수를 리턴하는 함수를 만들면 변수에 할당하여 이름이 있는 일반 함수처럼 사용 가능하다.
- 고차함수는 많은 중복코드를 없애주지만 가독성을 해칠 수 있다는 단점을 가진다.
