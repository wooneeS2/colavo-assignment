import { PageContainer } from 'design/commonStyles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SelectSalesPage() {
  const location = useLocation();
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
      <div>
        {sales?.map((elem: any) => {
          return (
            <li
              key={elem.name}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onClickItems([elem.name, elem.rate]);
              }}
            >
              {elem.name}/{elem.rate}
            </li>
          );
        })}
      </div>
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
    </PageContainer>
  );
}

export default SelectSalesPage;
