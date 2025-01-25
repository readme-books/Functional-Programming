# chapter 8 : 계층형 설계 1

## 소프트웨어 설계

- 코드를 만들고 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적 감각을 사용하는것

## 계층형 설계

- 소프트웨어를 계층으로 구성하는 기술
- 각계층에 있는 함수는 바로 아래 계층에 있는 함수를 이용해 정의

### 계층형 설계 감각을 키우기 위한 입력

-> 계층형 설계에 대한 단서

함수 본문 : 길이 , 복잡성 , 구체화단계 , 함수호출 , 프로그래밍 언어의 기능 사용
계층구조 : 화살표 길이 , 응집도 , 구체화 단계
함수 시그니처 : 함수명 , 인자이름 , 인잣값 , 리턴값

### 계층형 설계 감각을 키우기 위한 출력

조직화 : 새로운 함수를 어디에 놓을지 결정 , 함수를 다른곳으로 이동
구현 : 구현 바꾸기 , 함수 추출하기 , 데이터 구조 바꾸기
변경 : 새 코드를 작성할 곳 선택하기 , 적절한 수준의 구체화 단계 결정

### 계층형 설계 패턴

- 직접 구현 : 직접 구현된 함수를 읽을때 함수 시그니처가 나타내고 있는 문제를 함수본문에서 적절한 구체화 수준에서 해결해야함

- 추상화 벽 : 호출그래프에 어떤 계층은 중요한 세부 구현을 감추고 인터페이스를 제공.
  -> 인터페이스를 사용하여 고수준의추상화 단계를 생각

- 작은 인터페이스 : 작고 강력한 동작으로 구정된 인터페이스로 다른 동작도 직간접적으로 최소한의 인터페이스를 유지하면서 정의

- 편리한 계층 : 개발자 요구를 만족시키면서 소프트웨어를 더 빠르고 고품질로 제공할 수 있게끔 계층 설계

#### 패턴1. 직접 구현

**off-by-one** : 주로 배열을 반복해서 처리할때 "크다" 또는 "크거나 같다" 와 같은 비교문을 잘못 선택해 의도하지 않게 마지막 항목을 처리하지 못하거나 처리하는 오류

- 함수가 모두 비숫한 계층에 있다는것을 의미

```jsx
function freeTieClip(cart) {
  var hasTie = false;
  var hasTieClip = false;
  for(var i = 0; i < cart.length; i++;){
    var item=cart[i]
    if(item.name==="tie"){
    hasTie = true
    }
    if(item.name==="tie clip"){
    hasTieClip = true
    }
  }
if(hasTie && !hasTieClip){
   var tieClip = make_item("tie clip",0)
   return add_item(cart,tieClip);
}
  }
  return cart;
```

-> 여기서 다이어그램을 그리면 array index & for loop 는 언어기능의 추상화 이고 make_item() & add_item()는 직접 구현한 함수이다.
-> 저 if문을 "isInCart()" 함수를 사용하면 함수들이 모두 직접 구현이 가까운 추상화 계층을 호출함

```tsx
function freeTieClip(cart) {
  var hasTie = isInCart(cart, "tie");
  var hasTieClip = isInCart(cart, "tie clip");
  if (hasTie && !hasTieClip) {
    var tieClip = make_item("tie clip", 0);
    return add_item(cart, tieClip);
  }
}
```

-> 장바구니가 배열인지 몰라도 된다 -> 함수가 모두 비슷한 계층에 있다는것을 의미함

[비슷한 함수 하나로 합치기]

```tsx
//1번함수
function isIncart(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return true;
  }
  return false;
}
//2번함수
function indexOfItem(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}
```

여기서 두함수는 같은계층에 있는게 아님
-> indexOfItem() 함수가 isInCart()함수보다 수준이 낮음
-> indexOfItem() 함수는 **리턴하는값이 인덱스**이기 때문에 장바구니가 배열이라는것을 알아야한다.
반면, isInCart()함수는 **리턴하는값이 불리언값**이기때문에 장바구니가 어떤 구조인지 몰라도됨

[변경된 함수]

```tsx
function isInCart(cart,name{
    return indexOfItem(cart,name) !== null
})

function indexOfItem(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}
```
