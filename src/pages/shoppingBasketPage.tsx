import React from 'react';
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
  const [selectedItems, setSelectedItems] = React.useState(
    JSON.parse(sessionStorage.getItem('selectedItems')!)
  );
  const [selectedSales, setSelectedSales] = React.useState(
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

  const totalAmount = selectedItems.reduce((a: any, b: itemType) => {
    return a + b.price * b.count;
  }, 0);

  const totalRate = selectedSales.reduce((a: any, b: saleType) => {
    return a + b.rate;
  }, 0);

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
                  {elem.name}x{elem.count}
                  <p>{moneyConvertToKRW(elem.price)}원</p>
                </ItemListStyle>
                <span>
                  {isOpen &&
                  elem.selectedSales.findIndex(
                    (el: any) => el.name === currentSale.name
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
                        (el: any) => el.name !== elem.name
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
                <p>할인률 : {(elem.rate * 100).toFixed(2)}%</p>
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
                      (el: any) => el.name !== elem.name
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
              moneyConvertToKRW(totalAmount - totalAmount * totalRate)}
            원
          </TotalAmountTitle>
        </div>
        <NextButton>다음</NextButton>
      </MainBottomDiv>
    </PageContainer>
  );
}

export default ShoppingBasketPage;
