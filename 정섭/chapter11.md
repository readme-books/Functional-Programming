다양한 예제를 통해 앞에서 배운 고차 함수에 대해 더 자세히 알아본다.

- 함수 본문을 콜백으로 바꿔서 카피-온-라이트를 리팩터링 해본다.
    
    ```jsx
    // 리팩터링 전
    function arraySet(array, idx, value) {
    	const copy = array.slice();
    	copy[idx] = value;
    	return copy
    }
    
    // 리팩터링 후
    function arraySet(array, idx, value) {
    	return withArrayCopy(array, function(copy) {
    		copy[idx] = value;
    	});
    }
    
    function withArrayCopy(array, modify) {
    	const copy = array.slice();
    	modify(copy);
    	return copy;
    }
    
    ```
    
    - 얻은 효과 - 표준화된 원칙, 새로운 동작에 원칙을 적용할 수 있음, 여러 개를 변경할 때 최적화
- 연습문제 1
    
    ```jsx
    function withArrayCopy(array, modify) {
    	const copy = array.slice();
    	modify(copy);
    	return copy;
    }
    
    // 문제 1
    function push(array, elem) {
    	const copy = array.slice();
    	copy.push(elem);
    	return copy;
    }
    
    // 풀이 1
    function push(array, elem) {
    	return withArrayCopy(array, function(copy) {
    		copy.push(elem);
    	});
    }
    
    // 문제 2
    function drop_last(array) {
    	const array_copy = array.slice();
    	array_copy.pop();
    	return array_copy;
    }
    
    // 풀이 2
    function drop_last(array) {
    	return withArrayCopy(array, function(copy) {
    		copy.pop();
    	});
    }
    ```
    
- 연습문제 2
    
    ```jsx
    // 문제
    function objectSet(object, key, value) {
    	const copy = Object.assign({}, object);
    	copy[key] = value;
    	return copy;
    } 
    
    // 풀이
    function withObjectCopy(object, modify) {
    	const copy = Ojbect.assign({}, object);
    	modify(copy);
    	return copy;
    }
    
    function objectSet(object, key, value) {
    	return withObjectCopy(object, function(copy) {
    		copy[key] = value;
    	});
    }
    ```
    
- 로깅이 필요한 함수에 로깅 슈퍼 파워를 줄 수 있는 함수 만들기
    
    ```jsx
    // 수동으로 슈퍼 파워를 주기
    try {
    	saveUserData(user);
    } catch (error) {
    	logToSnapErrors(error);
    }
    
    // 자동으로 슈퍼 파워를 주기
    function wrapLogging(f) {
    	return function(arg) {
    		try {
    			f(arg);
    		} catch (error) {
    			logToSnapErrors(error);
    		}
    	}
    }
    
    const saveUserDataWithLogging = wrapLogging(saveUserData);
    
    saveUserDataWithLogging(user);
    ```
    
- 고차 함수는 많은 중복 코드를 없애 주지만 가독성을 해칠 수도 있다. 적절하게 사용해야 함.
