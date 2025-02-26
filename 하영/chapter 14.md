# chapter 14 : 중첩된 데이터에 함수형 도구 사용하기

## update()메소드

1. 조회하고 바꾸고 설정하는것을 찾는다.

```js
function halveField(item, field) {
  var value = item[field]; // 설정
  var newValue = value / 2; //바꾸기
  var newItem = objectSet(item, field, newValue); //설정
  return newItem;
}
```

2. 바꾸는 동작을 콜백을 전달해서 update()로 교체한다.

```js
function halveField(item, field) {
  return update(item, field, function (value) {
    return value / 2; //바꾸는 동작을 콜백으로 전달
  });
}
```

> 조회하고 변경하고 설정하는것을 update()로 교체하는 과정은 중첩된 객체에 사용하기 좋다.

```js
function update(object, key, modify) {
  var value = object[key]; // 조회
  var newValue = modify(value); //바꾸기
  var newObject = objectSet(object, key, newValue); //설정
  return newObject; //바꾼 객체를 리턴(카피온라이트)
}
```

update()에 전달하는 함수는 값 하나를 인자로 받아 객체에 적용.
하나의 키에 하나의 값을 변경하는것.

## 중첩된 데이터에 update() 사용하기

-중첩된 데이터에 update()를 사용하는것도 다음과 같은 단계를 거친다.

1. 조회하고 변경하고 설정하는것을 찾기
2. 바꾸는 동작을 콜백으로 전달해서 update()로 교체하기

```js
//원래코드
function incrementSize(item) {
  var options = item.options;
  var size = options.size;
  var newSize = size + 1;
  var newOptions = objectSet(options, "size", newSize);
  var newItem = objectSet(item, "options", newOptions);
  return newItem;
}

//리팩터링된 코드
function incrementSize(item){
    return update(item,'option',functiuon(options){
        return update(options,"size",increment)
    })
}
```

- update()를 중첩해서 사용하면 더깊은단계로 중첩된 객체에 사용가능하다.
  **경로** : 중첩된 객체의 값을 가리키는 시퀀스, 경로는 중첩된 단계의 키를 포함함.

## nestedUpdate()

- 여러번 중첩되어있는 객체 데이터에 접근해야할 경우 위에 update()메소드를 여러번 사용해야함 -> update1(), update2() 이런식의 메소드가 생겨남
- 이때 많은 update()시리즈를 만들지 않아도 중첩된 갯수에 상관없이 쓸수있는 nestedUpdate()가 필요함.

> update2와 update3의 차이점

- 숫자 2는 키를두개사용하고 update1()을 호출
- 숫자 1은 키를 한개 사용하고 update0()을 호출
- update0()은 중첩되지않은 객체를 의미 -> 조회나 설정을 하지않고 그냥 변경만 하는 함수

> **updateX()** 함수를 만든다.
>
> ```js
> function updateX(object, keys, modify) {
>   if (keys.length === 0) return modify(object); //0인 경우 재귀호출 없음 처리-> 종료조건
>   var key1 = keys[0];
>   var restOfKeys = drop_first(keys);
>   return update(object, key1, function (value1) {
>     return updateX(value1, restOfKeys, modify);
>   });
> }
> ```

- 재귀 호출은 종료 조건에 가까워지도록 만들어야한다.

### 안전한 재귀 사용법

- 재귀는 for 나 while 처럼 무한 반복에 빠질 수 있다.

1. 종료조건
   재귀를 멈추려면 종료조건이 필요.
   종료 조건은 재귀가 멈춰야하는곳에 있어야한다.
   더는 재귀를 호출하지 않음.
   배열인자가 비었거나 점점 줄어드는 값이 0이 되었거나 찾아야할 것이 없을때.

2. 재귀 호출
   재귀함수는 최소 하나의 재귀 호출이 있어야한다.

3. 종료조건에 다가가기
   최소 하나 이상의 인자가 점점 줄어들어야한다.
   각재귀 호출에서 한단계씩 종료조건에 가까워 진다면 결국 종료 조건과 일치해 재귀함수가 종료됨.

### 요점정리

- update()를 사용하면 객체 안에서 값을 꺼내 변경하고 다시 설정하는일을 수동으로 하지않아도 된다.
- 보통 일반적인 반복문은 재귀보다 명확함.
- 중첩된 데이터를 다룰때는 반복문보다 재귀가 더 쉽고 명확함.
- 재귀는 스스로 불렀던곳이 어디인지 유지하기위해 스택을 사용 -> 스택은 중첩된 데이터 구조를 그대로 반영
- 깊이 중첩된 데이터를 다룰때 모든 데이터 구조와 어떤 경로에 어떤 키가 있는지 기억해야함

> 하,, 점점 어려워지고있다. 중첩된 객체데이터 구조에 추상화 벽이라니..
