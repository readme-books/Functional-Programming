## Chapter 12

배열을 반복해서 처리하는 함수형 도구 map(), filter(), reduce()에 대해 알아본다.

- map() - x 값이 있는 배열을 y 값이 있는 배열로 반환한다.
- 함수를 전달하는 세 가지 방법
    - 전역으로 정의 - 함수를 전역으로 정의하고 이름을 붙일 수 있다. 프로그램 어디 서나 쓸 수 있다.
    - 지역적으로 정의 - 지역 범위 안에서 정의하고 이름을 붙일 수 있다. 지역적으로 쓰고 싶지만 이름이 필요할 때 유용하다.
    - 인라인으로 정의 - 함수를 사용하는 곳에 바로 정의한다. 익명함수라고도 한다. 문맥 상 한 번만 쓰는 짧은 함수에 사용하면 좋다.
- filter() - 배열에서 일부 항목을 선택하는 함수.
- reduce() - 배열을 순회하면서 초기값에 콜백을 통해 값을 누적한다. 새로운 누적값을 리턴한다.
    - 초기값을 결정하는 방법
        - 계산이 어떤 값에서 시작하는가?
        - 빈 배열을 사용하면 어떤 값을 리턴 할 것인가?
        - 비즈니스 규칙이 있는가?
