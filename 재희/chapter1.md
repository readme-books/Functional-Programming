### \# chapter 1

## \' 함수형 프로그래밍의 3가지 \'

### 1. 액션
실행 시점, 실행 횟수 둘 다 중요. 생각하고 호출 해야 함.
> 🔍 작성 시 고려해야할 점 <br>
> - 시간이 지남에 따라 안전하게 상태를 바꿀 수 있는 방법 <br>
> - 순서를 보장하는 방법 <br>
> - 액션이 정확히 한번만 실행되게 보장하는 방법

### 2. 계산
입력값으로 출력값을 만드는 것. <br>
동일한 입력값을 넣을 경우 계산된 출력값도 항상 같음. <br>
외부에 영향을 주지 않음. 여러번 호출해도 안전.
> 🔍 작성 시 고려해야할 점 <br>
> - 정확성을 위한 정적 분석 <br>
> - 소프트웨어에서 쓸 수 잇는 수학적 지식 <br>
> - 테스트 전략
### 3. 데이터
이벤트에 대해 기록한 사실. <br>
알아보기 쉬운 속성으로 되어있고 실행하지 않아도 데이터 자체로 의미가 있음.
> 🔍 작성 시 고려해야할 점 <br>
> - 효율적으로 접근하기 위해 데이터를 구성하는 방법 <br>
> - 데이터를 보관하기 위한 기술 <br>
> - 데이터를 이용해 중요한 것을 발견하는 원칙

 <br>

## 액션, 계산, 데이터 구분하는 함수형 프로그래밍은 분산 시스템에 잘 어울린다
실행 시점과 횟수에 의존하는 액션을 데이터와 계산으로 바꿀수록 분산 시스템에 생기는 문제를 해결 할 수 있음. <br>
또는 코드 전체에 영향을 주지 않도록 격리시키면 됨.

### \* 분산 시스템 규칙 3가지
1. 메시지 순서가 바뀔 수 있다. <br>
2. 메시지는 한 번 이상 도착할 수도 있고 도착하지 않을 수도 있다. <br>
3. 응답을 받지 못하면 무슨 일이 생겼는지 알 수 없다.