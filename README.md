# 콜라보 그라운드 과제

## 요구사항
- [X]  아이템과 할인을 장바구니에 담을 수 있음
- [X] 동일한 아이템은 장바구니에 담기 불가
- [X] 아이템은 수량 선택이가능함
- [X] 할인 대상을 선택하지 않을 경우 장바구니에 담긴 모든 아이템에 대해 할인 적용
- [ ] 할인 대상을 선택했을 경우 선택 아이템에만 할인 적용
- [X] 장바구니에 담긴 내용이 변경 될 때마다 사용자에게 최종 금액 표시
- [X] 상품 및 할인 하나씩 삭제가 가능함
- [X] 최종 금액은 currency_code에 따라 달러 or 원화로 표시

## 프로젝트 구성 안내
- `api` :  api 통신을 위한 파일 모음
- `design` : 스타일드 컴포넌트를 이용한 스타일 파일 모음
- `pages` : 라우트로 표시되는 페이지 컴포넌트 모음
- ` types`: 타입 파일 모음
- `utils` : 함수 파일 모음

## 프로젝트 실행
- [여기를 눌러서 실행하기](https://celadon-kheer-3acfd2.netlify.app/)   
- Github으로 실행하기
```
1. git clone https://github.com/wooneeS2/colavo-assignment.git
2. npm install
3. npm start
```

## 프로젝트 기술 스택


| 기술 | 선택 이유 | 
| --- | --- | 
| react-query| 1. API를 통해 불러오는 데이터를 효율적으로 사용하기 위해 사용함. | 
| react-router-dom | 1. 장바구니 페이지와 상품 및 할인 선택 페이지를 나누기 위해 사용함. 2. 최신 버전 사용으로 전 버전에 비해 번들 사이즈가 70% 감소함. | 
| styled-components | 1. 비슷한 디자인이 많아서 재사용이 가능한 스타일드 컴포넌트 사용 2. 프롭스를 통해 같은 컴포넌트여도 다른 디자인을 적용할 수 있기 때문에 사용함. | 

## 개발 일정
### 1일차
- [x]  리액트 앱 세팅
    - [x]  폴더구조
    - [x]  프리티어 및 린트 설정
- [x]  장바구니 페이지 만들기
- [x]  아이템 api 연결
- [x]  할인 api 연결
- [x]  아이템 선택 페이지 만들기
- [x]  할인 선택 페이지 만들기
- [x]  상품 선택 가능하게 하기
- [x]  아이템 중복선택 막기
- [x]  아이템 여러개 선택해서 담기
- [x]  아이템 및 할인데이터 구조 짜기
- [x]  아이템 수량 바꾸기

### 2일차
- [x]  가격 적용하기
- [x]  개수에 따른 가격 적용하기
- [x]  디자인
- [x]  할인률 상품 선택 추가 삭제 기능
- [x]  전체 할인 적용하기
- [x]  할인 항목에서 상품 선택하기



### 3일차
- [x]  상품 선택페이지에서 선택시 O 표시 해주기
- [x]  아이템 삭제
- [x]  할인 삭제
- [x]  할인률 두자리수만 나오게 하기
- [x]  전체 할인가격 적용하기
- [x]  달러 적용하기

### 4일차
- [ ] 상품 개별 할인 적용하기
- [ ] 리코일 적용하기
- [ ] 리팩토링 하기
- [x] 리드미 쓰기



## 마주쳤던 에러
1. 가격 계산이 제대로 되지 않았던 에러
![image](https://user-images.githubusercontent.com/49189226/193410088-4cc72af0-aa0d-4590-9572-0afe1efb0d7e.png)
- `selectedItem`을 reduce 이용하여 계산할 때 계산이 중복되는 현상 발생
원인 : reduce 안에 reduce를 써서 중복해서 생긴 문제였음.

문제 코드
```js
{
selectedItems.reduce((a: any, b: itemType) => {
    const totalRate = selectedSales.reduce((a:any,b:saleType)=> {
            return a+b.rate
        },0)
      return (a + b.price * b.count)-((a + b.price * b.count)*totalRate);
    }, 0)
}

```
해결 코드 : return 문 밖으로 해당 로직을 빼주고 중복된 항목을 변수로 만들어줬음. 

또한 selectedItem과 selectedSales에 아무것도 들어있지 않을 때 에러가 나서, 이를 방지하기 위해 분기처리를 해주었음.
```js
 if (selectedItems) {
    totalAmount = selectedItems.reduce((a: any, b: itemType) => {
      return a + b.price * b.count;
    }, 0);
  }

  if (selectedSales) {
    totalRate = selectedSales.reduce((a: any, b: saleType) => {
      return a + b.rate;
    }, 0);
  }
  if (selectedItems && selectedSales) {
    finalAmount = totalAmount - totalAmount * totalRate;
  }
```

2. `Argument of type 'RecoilState<{ name: string; price: number; selectedSales: {}; }[]>' is not assignable to parameter of type 'RecoilState<itemType>'`에러


에러 상황 : 리코일을 사용하여 selectedItem을 관리하려할 때 타입이 맞지 않는 에러 발생
```js
//atom
export const globalSelectedItem = atom({
  key: 'globalSelectedItem',
  default: [{ name: '', price: 0, selectedSales: {} }],
});

//useRecoilState선언부
const [selectedItems, setSelectedItems] =
    useRecoilState<itemType>(globalSelectedItem);
```
해결 : 아직 해결 중

## 아쉬웠던 점
1. 처음에 전역으로 상태관리를 할 필요가 없다고 생각하여 사용하지 않고 있다가, 

개별 할인율을 계산할 때 실시간으로 변경하기 위해서는  필요하다고 생각했는데 뒤늦게 적용하려니 에러에 마주쳐서 과제 제출이 얼마 남지 않았음에도 해결하지 못했다.

2. 상품 선택 페이지와 할인 선택 페이지는 비슷한 로직을 가지고 있어서 중복되는 코드가 많은데 모듈화를 시키지 못해서 중복 코드를 줄이지 못했다.



## 앞으로 해결할 부분

1. 타입스크립트에서 리코일을 사용하는 방법에 대해 공부해서, 전역으로 selectedItem을 관리해서 현재 구현하지 못한 선택 상품 실시간 변경 및 할인율 선택 적용 기능을 추가하고 싶다.
2. selectedItems와 selectedSales를 전역으로 관리해서 shoppingBasketPage의 컴포넌트를 나눠 모듈화를 시키고싶다.
3. 타입스크립트 기본기를 더 쌓아야겠다고 생각했다.
