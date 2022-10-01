import React, { useState, useEffect } from 'react';
import { PageContainer } from 'design/commonStyles';
import {
  MainTitle,
  MainTitleDiv,
  SaleRateTitle,
  SelectedItemBottomDiv,
} from 'design/selectItemStyles/selectItemStyles';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { saleType } from '../types/types';
import {
  HrStyle,
  ItemListStyle,
  NextButton,
} from 'design/shoppingBasketStyles/shoppingBasketStyles';

function SelectSalesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sales: Array<saleType> = location.state?.sale;
  const [selectedSales, setSelectedSales] = useState([{ name: '', rate: 0 }]);

  const onClickItems = ([name, rate]: any) => {
    setSelectedSales(current => {
      const newItem = [...current];
      if (newItem.findIndex(elem => elem.name === name) !== -1) {
        const newArr = newItem.filter(elem => {
          return elem.name !== name;
        });
        return newArr;
      } else {
        newItem.push({ name: name, rate: rate });
        return newItem;
      }
    });
  };

  useEffect(() => {
    console.log(selectedSales);
  }, [selectedSales]);

  return (
    <PageContainer>
      <MainTitleDiv>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            navigate(-1);
          }}
        ></FontAwesomeIcon>
        <MainTitle>할인</MainTitle>
      </MainTitleDiv>
      <div>
        {sales?.map((elem: any) => {
          return (
            <>
              <ItemListStyle
                type="sale"
                key={elem.name}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  onClickItems([elem.name, elem.rate]);
                }}
              >
                <div>
                  {elem.name}
                  <span>
                    {selectedSales.findIndex(
                      (el: saleType) => el.name === elem.name
                    ) === -1 ? (
                      ''
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </span>
                </div>
                <SaleRateTitle>{(elem.rate * 100).toFixed(0)}%</SaleRateTitle>
              </ItemListStyle>
              <HrStyle />
            </>
          );
        })}
      </div>
      <SelectedItemBottomDiv type="sale">
        <p>할인을 선택하세요.(여러개 가능)</p>
        <Link
          to={'/'}
          onClick={() => {
            sessionStorage.setItem(
              'selectedSales',
              JSON.stringify(selectedSales)
            );
          }}
        >
          <NextButton>완료</NextButton>
        </Link>
      </SelectedItemBottomDiv>
    </PageContainer>
  );
}

export default SelectSalesPage;
