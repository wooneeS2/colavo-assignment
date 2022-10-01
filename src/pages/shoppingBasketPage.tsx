import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemDatas } from 'api/itemApi';
import Modal from 'react-modal';
import { moneyConvertToKRW } from 'utils/moneyConvertToKRW';
import { PageContainer } from 'design/commonStyles';
import {
  HrStyle,
  IconStyle,
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
  ShoppingBasketButton,
  TotalAmountTitle,
} from 'design/shoppingBasketStyles/shoppingBasketStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { itemType, saleType } from 'types/types';
import { moneyConvertToUSD } from 'utils/moneyConvertToUSD';

const itemCounts = [...new Array(10)].map((_, i) => i + 1);

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ShoppingBasketPage() {
  let items;
  let discounts;
  let totalAmount = 0;
  let totalRate = 0;
  let finalAmount = 0;

  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(sessionStorage.getItem('selectedItems')!)
  );
  const [selectedSales, setSelectedSales] = useState(
    JSON.parse(sessionStorage.getItem('selectedSales')!)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<saleType>({
    name: '',
    rate: 0,
  });

  const { data, isLoading } = useQuery(['getItemsData'], () => getItemDatas());

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

  useEffect(() => {
    selectedSales &&
      selectedItems.forEach((elem: saleType) =>
        Object.assign(elem, { selectedSales })
      );
  }, []);

  if (selectedItems) {
    totalAmount = selectedItems.reduce((a: number, b: itemType) => {
      return a + b.price * b.count;
    }, 0);
  }

  if (selectedSales) {
    totalRate = selectedSales.reduce((a: number, b: saleType) => {
      return a + b.rate;
    }, 0);
  }
  if (selectedItems && selectedSales) {
    finalAmount = totalAmount - totalAmount * totalRate;
  }

  return (
    <PageContainer>
      <Modal isOpen={isOpen} ariaHideApp={false} style={customModalStyles}>
        <p style={{ fontSize: '1.5rem' }}>{currentSale.name}</p>
        <HrStyle />
        {!selectedItems && <p>시술을 선택해주세요.</p>}
        {selectedItems &&
          selectedItems.map((elem: itemType) => {
            if (elem.name === '') {
              return;
            }
            return (
              <ItemStyleDiv key={elem.name}>
                <ItemListStyle
                  type="item"
                  value={elem.name}
                  id={elem.name}
                  onClick={(e: React.MouseEvent) => {
                    const target = e.target as HTMLLIElement;
                    const temp = elem.selectedSales.findIndex(
                      (el: saleType) => el.name === currentSale.name
                    );
                    if (temp !== -1) {
                      Object.assign(elem, {
                        selectedSales: elem.selectedSales.filter(
                          (el: saleType, index: number) => {
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
                  {elem.name}x{elem.count}
                  <p>{moneyConvertToKRW(elem.price)}원</p>
                </ItemListStyle>
                <span>
                  {isOpen &&
                  elem.selectedSales.findIndex(
                    (el: saleType) => el.name === currentSale.name
                  ) !== -1 ? (
                    <IconStyle icon={faCheck} />
                  ) : (
                    ''
                  )}
                </span>
              </ItemStyleDiv>
            );
          })}
        <button
          style={{
            fontSize: '1rem',
            border: 'none',
            width: '100px',
            height: '50px',
          }}
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
                <ItemListStyle type="item">
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
                  <ShoppingBasketButton
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      const newItem = selectedItems.filter(
                        (el: itemType) => el.name !== elem.name
                      );
                      setSelectedItems(() => {
                        sessionStorage.setItem(
                          'selectedItems',
                          JSON.stringify(newItem)
                        );
                        return newItem;
                      });
                    }}
                  >
                    삭제
                  </ShoppingBasketButton>
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
              <ItemListStyle type="sale">
                {elem.name}
                <p> -{moneyConvertToKRW(totalAmount * elem.rate)}₩</p>
                {/* <p>
                  {selectedItems.map((item: itemType) => {
                    if (
                      item.selectedSales.findIndex(
                        (sale: saleType) => sale.name === elem.name
                      )
                    ) {
                      return item.name;
                    }
                  })}
                </p> */}
              </ItemListStyle>
              <div>
                <ShoppingBasketButton
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentSale({ name: elem.name, rate: elem.rate });
                  }}
                >
                  수정
                </ShoppingBasketButton>
                <ShoppingBasketButton
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    const newSales = selectedSales.filter(
                      (el: saleType) => el.name !== elem.name
                    );
                    setSelectedSales(() => {
                      sessionStorage.setItem(
                        'selectedSales',
                        JSON.stringify(newSales)
                      );
                      return newSales;
                    });
                  }}
                >
                  삭제
                </ShoppingBasketButton>
              </div>
            </ItemStyleDiv>
          );
        })}
      <HrStyle />

      <MainBottomDiv>
        <div>
          <p>합계</p>
          <TotalAmountTitle>
            {selectedItems &&
              data?.data.currency_code === 'KRW' &&
              `${moneyConvertToKRW(finalAmount)}원`}
            {selectedItems &&
              data?.data.currency_code === 'USD' &&
              `${moneyConvertToUSD(finalAmount)}$`}
          </TotalAmountTitle>
        </div>
        <NextButton>다음</NextButton>
      </MainBottomDiv>
    </PageContainer>
  );
}

export default ShoppingBasketPage;
