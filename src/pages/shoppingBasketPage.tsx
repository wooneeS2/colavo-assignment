import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemDatas } from 'api/itemApi';
import { Link } from 'react-router-dom';

function ShoppingBasketPage() {
  const [selectedItems] = React.useState(
    JSON.parse(sessionStorage.getItem('selectedItems')!)
  );
  const [selectedSales] = React.useState(
    JSON.parse(sessionStorage.getItem('selectedSales')!)
  );
  const { data, isLoading } = useQuery(['getItemsData'], () => getItemDatas());
  let items;
  let discounts;
  if (!isLoading) {
    items = Object.values(data?.data.items);
    discounts = Object.values(data?.data.discounts);
  }

  return (
    <>
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
              <li key={elem.name}>
                {elem.name}/{elem.price}
              </li>
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
            <li key={elem.name}>
              {elem.name}/{elem.rate}
            </li>
          );
        })}
      <div>
        <p>합계</p>
        <p>0원</p>
      </div>
    </>
  );
}

export default ShoppingBasketPage;
