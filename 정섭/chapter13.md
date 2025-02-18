## Chapter 13

여러 단계를 하나로 엮은 **체인**으로 복합적인 계산을 표현하는 방법을 살펴본다.

```jsx
function biggest(objects) {
	const bestObjects = filter(objects, function(object) { // 1단계
		return object.items.length >= 3;
	});
	
	const biggestItems = map(bestObjects, function(object) { // 2단계
		return maxKey(object.items, {total: 0}, function(items) {
			return items.total;
		});
	});
	
	return biggestItems;
}
```

- 체인을 명확하게 만들기
    1. 단계에 이름 붙이기
        
        ```jsx
        // 고차함수를 빼내서 이름을 붙인다.
        // 단계가 더 짧아졌고 코드가 모여있어 의미를 이해하기 쉽다.
        function biggest(objects) {
        	const bestObjects = selectBestItems(obejcts);
        	const biggestItems = getBiggestItems(bestObjects);
        	return biggestItems;
        }
        
        // 고차함수에 이름을 붙여 현재 문맥에 추가.
        function selectBestItems(objects) {
        	return filter(objects, function(object) {
        		return object.items.length >= 3;
        	});
        }
        
        function getBiggestItems(objects) {
        	return map(objects, getBiggestItem);
        }
        
        function getBiggestItem(object) {
        	return maxKey(object.items, {total: 0}, function(item) {
        		return item.total;
        	});
        }
        ```
        
    2. 콜백에 이름 붙이기
        
        ```jsx
        // 콜백을 빼내 이름을 붙인다.	
        function biggest(objects) {
        	const bestObjects = filter(objects, isGoodObject);
        	const biggestItems = map(bestObjects, getBiggestItem);
        	return biggestItems;
        }
        
        function isGoodObject(object) {
        	return object.itmes.length >= 3;
        }
        
        function getBiggestItem(object) {
        	return maxKey(object.items, {total: 0}, getItemTotal);
        }
        
        function getItemTotal(item) {
        	return item.total;
        }
        ```
        
    - 두 방법을 비교
        - 일반적으로 두 번째 방법이 더 명확하다. 이름을 붙이는 두 번째 방법이 재사용하기 더 좋기 때문이다.
        - 인라인 대신 이름을 붙여 콜백을 사용하면 단계가 중첩되는 것도 막을 수 있다.
        - 사용하는 언어의 문법과 문맥에 따라 달라지기 때문에 두 방법을 모두 시도해서 더 나은 방법을 결정하는 것이 좋다.
          
- 체이닝 팁 요약
  - 데이터 만들기: 함수형 도구는 배열 전체를 다룰 때 잘 동작한다. 배열 일부에 대해 동작하는 반복문이 있다면 배열 일부를 새로운 배열로 나눈다.
  - 배열 전체 다루기: map(), filter(), reduce() 를 사용하여 배열 전체를 처리한다.
  - 작은 단계로 나누기: 알고리즘이 한 번에 너무 많은 일을 한다고 생각되면 두 개 이상의 단계로 나눈다.
  - 조건문을 filter()로 바꾸기: 반복문의 조건문은 항목을 건너뛰기 위해 사용된다. filter로 먼저 거르면 좋다.
  - 유용한 함수로 추출하기: 함수를 추출하고 좋은 이름을 붙여서 사용해보자.
  - 개선을 위해 실험하기: 좋은 방법을 찾기 위해 함수형 도구를 새로운 방법으로 조합해 보자.
      
- 체이닝 디버깅을 위한 팁
  - 구체적인 것을 유지하기: 각 단계에서 어떤 것을 하고 있는지 알기 쉽게 이름을 잘 지어야 한다. 의미를 기억하기 쉽게 이름을 붙이자.
  - 출력해보기: 각 단계 사이에 print 구문을 넣어 코드를 돌려보자. 예상한 대로 동작하는지 확인할 수 있는 좋은 방법이다.
  - 타입을 따라가 보기: 각 단계에서 만들어지는 값의 타입을 따라가면서 단계를 살펴볼 수 있다.
      
- 다양한 함수형 도구들이 있다. 코드를 리팩토링 하면서 새로운 함수형 도구를 찾거나 다른 언어에서 영감을 받을 수 있다.
