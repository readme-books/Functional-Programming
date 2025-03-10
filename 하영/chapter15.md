# chapter 15 : 타임라인 격리하기

## 두지 타임라인 다어그램 기본 규칙

1. 액션은 순서대로 실행되거나 동시에 실행된다.
2. 순서 실행되는 액션은 같은 타임라인에서 하나가 끝나면다른 하나가 실행된다.
3. 동시에 실행되는 액션은 여 타임라인에서 나란히 실행된다.

## 좋은 타입라인의 규칙

1. 타임라인은 적을수록 이해하기 쉽다.

- 멀스레드나 비동기 콜백, 클라이언트 서버 간 통신은 새로운 타임라인이 필요함
- 타임라인의 수를 줄인다면 훨씬 이해하기 쉬운 시스템으로 만들 수 있다.

2.  타임라인은 짧을수록 이해하기 쉽다.

- 타임라인의 단계를 줄이면 타임라인을 이해하기 쉽게 만들 수 있다.
- 0(가능한 실행순서) = (ta)! / (a!)의t승
  t=타임라인 갯수 a= 타임라인당 액션 수

3. 공유하는 자원이 적을수록 이해하기 쉽다.

- 서로 다른 타임라인의 두 액션이 서로 자원을 공유하지 않는다면 실행순서에 신경쓸 필요없다.

4. 자원을 공유한다면 서로 조율해야한다.

- 안전하게 공유 자원을 공유할 수 있어야한다.
- 올바른 순서대로 자원을쓰고 돌려줄 수 있어야함

5. 시간을 일급으로 다룬다.

- 타임라인 다루는 재사용 가능한 객체를 만들면 타이밍 문제를 쉽게 만들 수 있다.

## 자바스크립트의 비동기 큐
