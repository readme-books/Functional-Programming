## Chapter 16

타임라인 사이에서 자원 공유가 필요한 경우가 있다. 동시성 기본형이라는 재사용 가능한 코드를 만드는 방법에 대해 알아본다.

- 타임라인 순서를 보장
    - 큐를 사용하여 DOM이 업데이트 되는 순서를 보장한다.
    - 큐를 타임라인 조율에 사용한다면 동시성 기본형이라고 부른다.
    - 동시성 기본형: 자원을 안전하게 공유할 수 있는 재사용 가능한 코드
    - 동시성 기본형은 액션을 고차 함수로 받는다.
