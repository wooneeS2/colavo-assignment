import { PageContainer } from 'design/commonStyles';
import {
  MainTitle,
  MainTitleDiv,
  SaleRateTitle,
  SelectedItemBottomDiv,
} from 'design/selectItemStyles/selectItemStyles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  ItemListStyle,
  NextButton,
} from 'design/shoppingBasketStyles/shoppingBasketStyles';

function SelectSalesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sales: Array<any> = location.state?.sale;
  const [selectedSales, setSelectedSales] = React.useState([
    { name: '', rate: 0 },
  ]);

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

  React.useEffect(() => {
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
            <ItemListStyle
              key={elem.name}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onClickItems([elem.name, elem.rate]);
              }}
            >
              {elem.name}
              <SaleRateTitle>{elem.rate}%</SaleRateTitle>
            </ItemListStyle>
          );
        })}
      </div>
      <SelectedItemBottomDiv>
        <p>할인을 선택하세요.(여러개 가능)</p>
        <NextButton>
          <Link
            to={'/'}
            onClick={() => {
              sessionStorage.setItem(
                'selectedSales',
                JSON.stringify(selectedSales)
              );
            }}
          >
            완료
          </Link>
        </NextButton>
      </SelectedItemBottomDiv>
    </PageContainer>
  );
}

export default SelectSalesPage;
