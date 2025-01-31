## Chapter 10

일급 함수에 대해 알아본다.

- 코드의 냄새: 함수 이름에 있는 암묵적 인자
    - 함수 구현이 거의 똑같다. 함수 이름이 구현의 차이를 만든다.
    - 예)
    
    ```jsx
    function setPriceByName(arr, name, price) {
    	const item = arr[name];
    	const newItem = objectSet(item, 'price', price); // 'price' 함수 이름에 그대로 쓰이고 이 부분만 다름
    	const newArr = objectSet(arr, name, newItem);
    	return newArr;
    }
    
    function setQuntityByName(arr, name, quant) {
    	const item = arr[name];
    	const newItem = objectSet(item, 'quantity', price); // 'quantity' 함수 이름에 그대로 쓰이고 이 부분만 다름
    	const newArr = objectSet(arr, name, newItem);
    	return newArr;
    }
    ```
    
- 리팩터링: 암묵적 인자 드러내기
    - 단계
        1. 함수 이름에 암묵적 인자를 확인한다.
        2. 명시적인 인자를 추가한다.
        3. 함수 본문에 하드 코딩 된 값을 새로운 인자로 바꾼다.
        4. 함수를 부르는 곳을 고친다.
    
    ```jsx
    function setFieldByName(arr, name, field, value) { // field로 명시적 인자를 추가한다.
    	const item = arr[name];
    	const newItem = objectSet(item, field, value);
    	const newArr = objectSet(arr, name, newItem);
    	return newArr;
    }
    
    arr = setFieldByName(arr, "item", 'price', 13);
    arr = setFieldByName(arr, "item", 'quantity', 2);
    ```
    
- 일급인 것과 일급이 아닌 것을 구별하기
    - 자바스크립트에서 일급이 아닌 것
        - 수식 연산자(+, * …)
        - 반복문(for)
        - 조건문(if)
        - try/catch 블록
    - 일급으로 할 수 있는 것
        - 변수에 할당
        - 함수의 인자로 넘기기
        - 함수의 리턴값으로 받기
        - 배열이나 객체에 담기
- 리팩터링: 함수 본문을 콜백으로 바꾸기
    1. 본문과 분문의 앞부분과 뒷부분을 구분한다.
    2. 전체를 함수로 빼낸다.
    3. 본문 부분을 빼낸 함수의 인자로 전달한 함수로 바꾼다.
    - 본문을 함수로 감싸서 넘기는 이유 - 함수 안에 있는 코드가 특정한 문맥 안에서 실행되어야 하기 때문.
