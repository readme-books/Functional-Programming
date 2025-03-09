# chapter 13 : 함수형 도구 체이닝

**체이닝** : 여러단계를 하나로 조합하는것

## 체인을 명확하게 만들기 1 : 단계에 이름 붙이기

- 각 단계에 이름을 붙여 체인을 명확하게 한다.
- 각 단계의 고차함수를 따로 빼내 이름을 붙인다.

```js
//기존코드
function biggestPurchasesBestCustomers(customers){
    var bestCustomers=filter(customers,functioin(customer){
        return customer.purchases.length >= 3
    })
}
//단계별로 나눠서 각 단계에 함수명을 붙여 관리하기
function biggestPurchasesBestCustomers(customers){
    var bestCustomers=selectBestCustomers(customers) //1단계
    var biggestPurchases = getBiggestPurchases(bestCustomers)//2단계
    return biggestPurchases
}
//1단계 함수
function selectBestCustomers(customers){
    return filter(customers, function(customer){
        return customer.purchases.length >=3
    })
}
//2단계 생략
```

## 체인을 명확하게 만들기 2 : 콜백에 이름붙이기

- 위에서는 고차함수 자체를 분리하는 방식이였다면 이젠 콜백함수만 따로 분리하여 사용하기
- 콜백함수를 빼내고 이름을 붙여 재사용할 수 있는 함수로 만들면 더 직관적이다.

```js
//기존코드
function biggestPurchasesBestCustomers(customers){
    var bestCustomers=filter(customers,functioin(customer){
        return customer.purchases.length >= 3
    })
}
//콜백함수 분리하여 이름붙이기
function biggestPurchasesBestCustomers(customers){
    var bestCustomers=filter(customers,isGoodCustomer)
    return customer.purchases.length >= 3
}
function isGoodCustomer(customer){
    return customer.purchases.length >= 3
}
```

## 정리

- 콜백함수를 따로 빼내어 이름을 붙이는 방식이 더 명확하다.
- 코차함수를 그대로 쓰는 첫번째 방법보다 두번째 방식이 재사용하기 쉽다.
- 인라인 대신 이름을 붙여 콜백을 사용하면 단계가 중첩되는것을 막을 수 있다.

## 체이닝 팁 요약

1. 데이터 만들기
   함수형 도구는 배열 전체를 다룰때 잘 동작함.
   배열 일부에 대해 동작하는 반복문이 있다면 배열 일부를 새로운 배열로 나눌수있다.
2. 배열 전체를 다루기
   map(), filter(), reduce()메서드는 배열 전체에 동작하기때문에 해당 메서드를 사용하여 배열 조작하기
3. 작은 단계로 나누기
   인덱스를 사용하여 원래 배열의 하위 배열을 만든다. -> 알고리즘이 한번에 너무 많은 일을 한다면 더 작은 단계로 나누어 단순하게 만든다.
4. 조건문을 filter()로 바꾸기
   반복문 안에 있는 조건문은 filter를 통해 거른다.
5. 유용한 함수로 추출하기
   자주사용하는 함수형 도구 뿐만아니라 더 많은 함수형 도구를 사용하여 함수를 추출하고 이름을 붙인다.

## 다양한 함수형 도구들

1. pluck()
   pluck을 사용하면 특정 필드값을 가져오기위해 콜백을 매번 작성하지 않아도 된다.
2. concat()
   배열안에 배열을 뺄수 있다.
   중첩된 배열을 한단계의 배열로 만들수 있는 메소드
3. frequenciesBy() & groupBy()
   개수를 세거나그룹하할 수 있는 메소드
