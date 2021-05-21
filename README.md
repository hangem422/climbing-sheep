# Climbing Sheep

![Sample GIF Image](./src/images/sample.gif)

## 원본

- **원작자**: Interactive Developer
- **링크**: [독학으로 고급 개발자 되는 방법](https://www.youtube.com/watch?v=hCHL7sydzn0&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=1)

## 개선점

### 1. 상수값 선언 분리

유지/보수가 용이하도록 상수값 선언을 별도의 config 파일로 분리시킴

### 2. 연속된 언덕 출력 최적화

- `Hill.porotype.draw` 첫 호출 시 배열의 첫 번째 x 좌표 간격이 넓어지는 오류 발견 (`[-(gap * 2), 0, gap, gap * 2, ..., gap * n ]`)

  - 초기화 시점에서 시작 point이 x 값이 0부터 시작하기 때문
  - 전체 point의 개수를 2개 늘리고, 시작 point의 x 값을 `-(gap * 2)`으로 설정해 해결

- points 배열의 성능 향상

  - 연결 리스트를 사용하여 Deque를 구현해 `Array.prototype.unshift` 사용을 배제
  - 새로운 point 객체를 앞에 추가할 때, 화면 밖으로 사라져 Deque에서 pop되는 객체를 재사용함

### 3. 양 위치 계산 최적화

- 양의 좌표를 찾는 과정 성능 향상

  - 양이 위치한 곡선을 찾는 방법을 순차적 탐색에서 이분 탐색으로 변경
  - 곡선에서 y 좌표를 찾는 기존 과정이 매우 비효율적임. 베지어 곡선 공식을 이용해 x좌표를 가지고 탐색 없이 바로 y좌표를 구하도록 변경

- 양의 추가 삭제 과정 성능 향상

  - 연결 리스트를 구현해 `Array.prototype.splice` 사용을 배제
