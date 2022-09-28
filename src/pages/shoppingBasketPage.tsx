import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemDatas } from '../api/itemApi';

function ShoppingBasketPage() {
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
        <button>시술</button>
        <button>할인</button>
      </div>
      <div>
        {items?.map((elem: any) => {
          return (
            <li key={elem.name}>
              {elem.name}/{elem.price}
            </li>
          );
        })}
      </div>
      <hr></hr>
      <div>
        {discounts?.map((elem: any) => {
          return (
            <li key={elem.name}>
              {elem.name}/{elem.rate}
            </li>
          );
        })}
      </div>
      <div>
        <p>합계</p>
        <p>0원</p>
      </div>
    </>
  );
}

export default ShoppingBasketPage;
