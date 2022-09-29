import { PageContainer } from 'design/commonStyles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SelectItemPage() {
  const location = useLocation();
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
    <PageContainer>
      <div>
        {item?.map((elem: any) => {
          return (
            <li
              key={elem.name}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onClickItems([elem.name, elem.price]);
              }}
            >
              {elem.name}/{elem.price}
            </li>
          );
        })}
      </div>
      <Link
        to={'/'}
        onClick={() => {
          sessionStorage.setItem('selectedItems', JSON.stringify(selectedItem));
        }}
      >
        완료
      </Link>
    </PageContainer>
  );
}

export default SelectItemPage;
