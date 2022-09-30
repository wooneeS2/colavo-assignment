import { PageContainer } from 'design/commonStyles';
import {
  HrStyle,
  ItemListStyle,
  NextButton,
} from 'design/shoppingBasketStyles/shoppingBasketStyles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { moneyConvertToKRW } from 'utils/moneyConvertToKRW';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  MainTitle,
  MainTitleDiv,
  SelectedItemBottomDiv,
} from 'design/selectItemStyles/selectItemStyles';
import { useNavigate } from 'react-router-dom';

function SelectItemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item: Array<any> = location.state?.item;
  const [selectedItem, setSelectedItem] = React.useState([
    { name: '', price: 0, count: 0 },
  ]);

  const onClickItems = ([name, price]: any) => {
    setSelectedItem(current => {
      const newItem = [...current];
      if (newItem.findIndex(elem => elem.name === name) !== -1) {
        const newArr = newItem.filter(elem => {
          return elem.name !== name;
        });
        return newArr;
      } else {
        newItem.push({ name: name, price: price, count: 1 });
        return newItem;
      }
    });
  };

  React.useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return (
    <div>
      <PageContainer>
        <MainTitleDiv>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => {
              navigate(-1);
            }}
          ></FontAwesomeIcon>
          <MainTitle>시술 메뉴</MainTitle>
        </MainTitleDiv>
        <div>
          {item?.map((elem: any) => {
            return (
              <>
                <ItemListStyle
                  key={elem.name}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    onClickItems([elem.name, elem.price]);
                  }}
                >
                  <div>
                    {elem.name}
                    <span>
                      {selectedItem.findIndex(
                        (el: any) => el.name === elem.name
                      ) === -1 ? (
                        ''
                      ) : (
                        <FontAwesomeIcon icon={faCheck} />
                      )}
                    </span>
                  </div>
                  <p>{moneyConvertToKRW(elem.price)}원</p>
                </ItemListStyle>
                <HrStyle />
              </>
            );
          })}
        </div>
        <SelectedItemBottomDiv type="item">
          <p>시술을 선택하세요.(여러개 가능)</p>
          <Link
            to={'/'}
            onClick={() => {
              sessionStorage.setItem(
                'selectedItems',
                JSON.stringify(selectedItem)
              );
            }}
          >
            <NextButton>완료</NextButton>
          </Link>
        </SelectedItemBottomDiv>
      </PageContainer>
    </div>
  );
}

export default SelectItemPage;
