# 🌟EBSi - 웹 퍼블리셔 채널 가이드

update : 25.06.13

### Commit 방법 소개
1. 전체 pull 받은후 브랜치 생성 후 작업
2. main 브랜치에 커밋하여 푸쉬하시면, 자동배포 완료됩니다.
3. 반영서버 Url : https://nec-works.github.io/

### Git-flow Branch 전략
```
  main : master, main 브랜치 입니다.
  featre/prject : 담당하시는 프로젝트 브랜치입니다.
```
- 각 담당자들께서는 feature/`prj-projectName` 명으로, 브랜치를 생성하고
작업하시고, `main`브랜치에서 각 feature/`project` 브랜치를 merge하시면 됩니다.

예) 브랜치 네임 `featre/evt-250613` `featre/prj-subMain` `featre/prj-subMain`
 

### Commit Message 규칙
|타입|내용|
|:---|:---|
|feat|새로운 기능에 대한 커밋|
|fix|버그 수정에 대한 커밋|
|test|테스트 코드 수정에 대한 커밋|
|docs|문서 수정에 대한 커밋|

예) `feat : prj-storybook ui 기능 개선`

### Tag Push Label 규칙
```
예) 메인 브랜치에 업로드 할때 : v20250526, origin push
```

