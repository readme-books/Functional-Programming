# chapter 12 : 함수형 반복

- 대부분의 함수형 프로그래밍 언어에는 컬렉션 데이터를 다룰 수 있는 추상 함수가 있다.
- 그중 가장 많이 쓰이는 map, filter, reduce 함수에 대해 알아보자

## 함수형 도구 : map()

```js
function map(array, f) {
  var newArray = [];
  forEach(array, function (element) {
    newArray.push(f(element));
  });
  return newArray;
}
```

- map은 X값이 있는 배열을 Y값이 있는 배열로 변환한다.
- 즉, 값 하나를 바꾸는 함수를 배열 전체를 바꾸는데 사용 할 수 있다.
- 리턴값인 배열에 들어있는 항목을 확인하지 않기때문에 null 이나 undefined이 나올 수 있다.
- 배열 전체에 함수를 적용하기 때문에 위의 문제는 더 심각해질수있다.

> 함수를 전달하는 세가지 방법
>
> 1. 전역으로 정의하기
>    전역으로 정의하고 이름붙임. 어디에서나 쓸수있음
> 2. 지역적으로 정의하기
>    지역 범위안에서 정의하고 이름붙임. 범위 밖에서 쓸수 없음.
> 3. 인라인으로 정의하기
>    함수를 사용하는 곳에서 바로 정의
>    변수에 넣지 않아서 이름없는 '익명함수'
>    문맥에서 한번만 쓰는 짧은 함수에 사용

## 함수형 도구 : filter()

```js
function selectBestCustomers(customers) {
  return filter(customers, function (customer) {
    return customer.purchases.length >= 3; // t/f를 리턴함
  });
}
```

- 배열에서 일부 항목을 선택하는 함수로 볼 수 있다.
- x인 배열에 filter 를 사용해도 여전히 결과는 x임
- 항목을 선택하기 위해서 x를 받아 불리언 타입을 리턴하는 함수를 전달해야함.
- 전달하는 함수가 계산일때 가장 사용하기 쉬움
- map에서는 null 이거나 undefined일 때가 존재하는데 이를 컨트롤 하기위해서 filter를 사용하면 좋다.

  ```js
  // 고객 이메일이 null이면 배열에 null이 들어감
  var allEmails = map(customers, function (customer) {
    return customer.email;
  });

  // 올바른 이메일만 남겨두기위해 filter 사용
  var emailsWithoutNulls = filter(emailWithNulls, function (email) {
    return email !== null;
  });
  ```

## 함수형 도구 : reduce()

```js
funtion countAllPurchases(customers){
   return reduce(customers , 0 , function(total, customer){
    return total + customer.purchases.lengths
   })

}
```

- reduce는 배열을 순회하면서 값을 누적하는 추상적인 개념을 가짐.
- 값을 더해서 해시맵이나 문자열을 합칠 수 있고 전달하는 함수를 통해 누적하는 방법도 결정할 수 있음.
- 함수는 누적하고 있는 현재 값과 반복하고 이쓴ㄴ 현재 배열의 항복을 인자로 받는다.
- 새로운 누적값을 리턴함
- 인자의 순서 중요함 (1. 배열 가장 먼저 2.콜백이 가장 마지막 3. 나머지 인자가 있다면 그사이)
- 초깃값을 결정하는 방법
  계산이 어떤값에서 시작되는지
  빈 배열을 사용하면 어떤 값을 리턴할 것인지
  비즈니스 규칙이 있는지

> reduce()로 할 수 있는것들
>
> - 실행 취소/ 실행 복귀
>   리스트 형태의 사용자 입력에 reduce()를 적용한것이 현재 상태라고 생각해보면 실행 취소는 리스트의 마지막 사용자 입력을 없애는것
> - 테스트할때 사용자 입력을 다시 실행하기
>   시스템의 처음상태가 초깃값, 사용자 입력이 순서대로 리스트에 있을때 reduce()로 모든 값을 합쳐 현재 상태를 만들수 있음
> - 시간여행 디버깅
>   잘못 동작하는 경우 특정 시점 상태의 값을 보관할 수 있음
> - 회계 감사 추적
>   과거에 어떤일이 있었는지 기록할 수 있음 -> 순회하면서 누적하기때문에 어떤일이 있었는지 뿐만아니라 어떤 과정을 통해 일이 생겼는지도 알수 있음
