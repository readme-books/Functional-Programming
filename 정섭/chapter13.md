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
