import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemDatas } from 'api/itemApi';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const itemCounts = [...new Array(10)].map((_, i) => i + 1);

type saleType = {
  name: string;
  rate: number;
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
    selectedItems &&
      selectedItems.forEach((elem: any) => Object.assign(elem, { count: 1 }));

    selectedSales &&
      selectedItems.forEach((elem: any) =>
        Object.assign(elem, { selectedSales })
      );
  }, []);

  return (
    <>
      <Modal isOpen={isOpen}>
        {selectedItems &&
          selectedItems.map((elem: any) => {
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
                      console.log(e);
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
                          (itemName: any) => itemName.name === target.id
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
      <div>
        <Link to={'select-items'} state={{ item: items }}>
          시술
        </Link>
        <Link to={'select-sales'} state={{ sale: discounts }}>
          할인
        </Link>
      </div>
      <div>
        {selectedItems &&
          selectedItems.map((elem: any) => {
            if (elem.name === '') {
              return;
            }
            return (
              <div key={elem.name}>
                <li>
                  {elem.name}/{elem.price}
                </li>
                <select
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
                </select>
              </div>
            );
          })}
      </div>
      <hr></hr>
      {selectedSales &&
        selectedSales.map((elem: any) => {
          if (elem.name === '') {
            return;
          }
          return (
            <div key={elem.name}>
              <li>
                {elem.name}/{elem.rate}
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
              </li>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setCurrentSale({ name: elem.name, rate: elem.rate });
                }}
              >
                수정
              </button>
            </div>
          );
        })}
      <div>
        <p>합계</p>
        <p>
          {selectedItems &&
            selectedItems.reduce((a: any, b: any) => {
              return a + b.price * b.count;
            }, 0)}
          원
        </p>
      </div>
    </>
  );
}

export default ShoppingBasketPage;
