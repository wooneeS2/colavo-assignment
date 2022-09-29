import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemDatas } from 'api/itemApi';
import Modal from 'react-modal';
import { moneyConvertToKRW } from 'utils/moneyConvertToKRW';
import { PageContainer } from 'design/commonStyles';
import {
  HrStyle,
  ItemListSelectBox,
  ItemListStyle,
  ItemStyleDiv,
  MainBottomDiv,
  MainMenuButton,
  MainMenuDiv,
  MainTime,
  MainUserDiv,
  MainUserName,
  NextButton,
  SaleEditButton,
  TotalAmountTitle,
} from 'design/shoppingBasketStyles/shoppingBasketStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const itemCounts = [...new Array(10)].map((_, i) => i + 1);

type saleType = {
  name: string;
  rate: number;
};

type itemType = {
  name: string;
  price: number;
  count: number;
  selectedSales: Array<Object>;
};

function ShoppingBasketPage() {
  const [selectedItems, setSelectedItems] = React.useState(
    JSON.parse(sessionStorage.getItem('selectedItems')!)
  );
  const [selectedSales] = React.useState(
    JSON.parse(sessionStorage.getItem('selectedSales')!)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentSale, setCurrentSale] = React.useState<saleType>({
    name: '',
    rate: 0,
  });

  const { data, isLoading } = useQuery(['getItemsData'], () => getItemDatas());
  let items;
  let discounts;
  if (!isLoading) {
    items = Object.values(data?.data.items);
    discounts = Object.values(data?.data.discounts);
  }

  const changeItemCount = (
    e: React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => {
    let findIndex = selectedItems.findIndex(
      (elem: saleType) => elem.name === name
    );
    setSelectedItems((current: any) => {
      const newItems = [...current];
      newItems[findIndex].count = Number(e.target.value);
      return newItems;
    });
  };

  React.useEffect(() => {
    selectedSales &&
      selectedItems.forEach((elem: saleType) =>
        Object.assign(elem, { selectedSales })
      );
  }, []);

  return (
    <PageContainer>
      <Modal isOpen={isOpen}>
        {selectedItems &&
          selectedItems.map((elem: itemType) => {
            if (elem.name === '') {
              return;
            }
            return (
              <div key={elem.name}>
                <ul>
                  <li
                    value={elem.name}
                    id={elem.name}
                    onClick={(e: React.MouseEvent) => {
                      const target = e.target as HTMLLIElement;
                      const temp = elem.selectedSales.findIndex(
                        (el: any) => el.name === currentSale.name
                      );
                      if (temp !== -1) {
                        Object.assign(elem, {
                          selectedSales: elem.selectedSales.filter(
                            (el: any, index: number) => {
                              return index !== temp;
                            }
                          ),
                        });
                      } else {
                        let tempItem = selectedItems.findIndex(
                          (itemName: itemType) => itemName.name === target.id
                        );
                        Object.assign(tempItem, {
                          selectedSales: elem.selectedSales.push({
                            name: currentSale.name,
                            rate: currentSale.rate,
                          }),
                        });
                      }
                    }}
                  >
                    {elem.name}/{elem.price}/{elem.count}개
                  </li>
                </ul>
                <p>
                  {isOpen &&
                  elem.selectedSales.findIndex(
                    (el: any) => el.name === currentSale.name
                  ) !== -1
                    ? 'O'
                    : 'X'}
                </p>
              </div>
            );
          })}
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          확인
        </button>
      </Modal>

      <MainUserDiv>
        <MainUserName>김원희</MainUserName>
        <MainTime>{new Date().toLocaleString('ko-kr').slice(0, 20)}</MainTime>
      </MainUserDiv>
      <MainMenuDiv>
        <MainMenuButton
          to={'select-items'}
          state={{ item: items }}
          type={'item'}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
          <span>시술</span>
        </MainMenuButton>
        <MainMenuButton
          to={'select-sales'}
          state={{ sale: discounts }}
          type={'sale'}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
          <span>할인</span>
        </MainMenuButton>
      </MainMenuDiv>
      <HrStyle />
      <div>
        {selectedItems &&
          selectedItems.map((elem: itemType) => {
            if (elem.name === '') {
              return;
            }
            return (
              <ItemStyleDiv key={elem.name}>
                <ItemListStyle>
                  {elem.name}
                  <p>{moneyConvertToKRW(elem.price)}원</p>
                </ItemListStyle>
                <div>
                  <ItemListSelectBox
                    name="itemCount"
                    id="itemCont"
                    defaultValue={elem.count}
                    onChange={e => {
                      changeItemCount(e, elem.name);
                    }}
                  >
                    {itemCounts.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </ItemListSelectBox>
                </div>
              </ItemStyleDiv>
            );
          })}
      </div>
      <hr></hr>
      {selectedSales &&
        selectedSales.map((elem: saleType) => {
          if (elem.name === '') {
            return;
          }
          return (
            <ItemStyleDiv key={elem.name}>
              <ItemListStyle>
                {elem.name}
                <p>할인률 : {elem.rate * 100}%</p>
                {/* <p>
                  {selectedItems.map((elem: any) => {
                    elem.selectedSales
                      .map((el: any) => {
                        return el.rate;
                      })
                      .reduce((a: any, b: any) => {
                        console.log(a + b);
                        return a + b;
                      });
                  })}
                </p> */}
              </ItemListStyle>
              <SaleEditButton
                onClick={() => {
                  setIsOpen(true);
                  setCurrentSale({ name: elem.name, rate: elem.rate });
                }}
              >
                수정
              </SaleEditButton>
            </ItemStyleDiv>
          );
        })}
      <HrStyle />

      <MainBottomDiv>
        <div>
          <p>합계</p>
          <TotalAmountTitle>
            {selectedItems &&
              moneyConvertToKRW(
                selectedItems.reduce((a: any, b: itemType) => {
                  return a + b.price * b.count;
                }, 0)
              )}
            원
          </TotalAmountTitle>
        </div>
        <NextButton>다음</NextButton>
      </MainBottomDiv>
    </PageContainer>
  );
}

export default ShoppingBasketPage;
