## Chapter 14

객체를 다루기 위한 함수형 도구를 살펴본다.

- 함수형 도구 update()
    
    ```jsx
    function update(object, key, modify) { // 객체와 바꿀 값의 위치(키), 바꾸는 동작을 받는다.
      const value = object[key]; // 조회
      const newValue = modify(value); // 바꾸기
      const newObject = objectSet(object, key, newValue); // 설정
    	
      return newObject; // 바꾼 객체를 리턴(카피-온-라이트)
    }
    ```
    
- nestedUpdate();
    - 중첩된 객체를 수정해야 할 때 재귀를 통해서 구현한다.
    
    ```jsx
    function nestedUpdate(object, keys, modify) {
      if(keys.length === 0) { // 종료 조건
        return modify(object);
      }
    	
      const key1 = key[0];
      const restOfKeys = drop_first(keys); // 종료 조건에 가까워진다(항목을 하나씩 없앰)
    	
      return updaste(object, key1, function(value1) {
        return nestedUpdate(value1, restOfKeys, modify);
      });
    }
    ```
    
- 안전한 재귀 사용법
    - 종료 조건: 재귀를 멈추려면 종료 조건이 필요하다. 종료 조건은 재귀가 멈춰야 하는 곳에 있어야 한다.
    - 재귀 호출: 재귀 함수는 최소 하나의 재귀 호출이 있어야 한다. 재귀 호출이 필요한 곳에서 재귀 호출을 해야 한다.
    - 종료 조건에 다가가기: 재귀 함수를 만든다면 최소 하나 이상의 인자가 점점 줄어들어야 한다. 그래야 종료 조건에 가까워 질 수 있다.
- 깊이 중첩된 데이터에 추상화 벽 사용하기
    - 깊이 중첩된 데이터를 사용할 때 너무 많은 것을 기억해야 하는 어려움이 있다. 추상화 벽을 통해 알아야 할 데이터 구조를 줄일 수 있다.
    
    ```jsx
    // 블로그 예제
    httpGet("http://blog.com/api/category/blog", function(blogCategory) {
      renderCategory(nestedUpdate(blogCategory, ['post', '12', 'author', 'name'], capitalize));
    });
    
    // 수정 후
    // 기억해야 할 것이 4개에서 3개로 줄었다.
    // 명확한 이름을 지어 동작을 기억하기 쉽다.
    function updatePostById(category, id, modifyPost) {
      return nestedUpdate(cateogry, ['post', id], modifyPost);
    }
    
    function updateAuthor(post, modifyUser) {
      return update(post, 'author', modifyUser);
    }
    
    function capitalizeName(user) {
      return update(user, 'name', capitalize);
    }
    
    updatePostById(blogCategory, '12', function(post) {
      return updateAuthor(post, capitalizeName);	
    });
    ```
