import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainUserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 10px;
`;

export const MainUserName = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.mainBlack};
`;

export const MainTime = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.mainGrey};
`;

export const MainMenuDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MainMenuButton = styled(Link)<{ type: string }>`
  width: 40%;
  height: 60px;
  text-align: center;
  background-color: ${props =>
    props.type === 'sale'
      ? props.theme.backgroundPink
      : props.theme.backgroundGrey};
  color: ${props =>
    props.type === 'sale' ? props.theme.mainPink : props.theme.mainGrey};
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-size: 1.2rem;
  span {
    margin-left: 4px;
  }
`;

export const HrStyle = styled.hr`
  border: 0;
  width: 100%;
  height: 1px;
  background: ${props => props.theme.backgroundGrey};
`;

export const ItemStyleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

export const ItemListStyle = styled.li<{ type: string }>`
  list-style: none;
  margin: 6px;
  font-size: 1.2rem;
  color: ${props => props.theme.mainBlack};
  cursor: pointer;
  p {
    font-size: 1rem;
    color: ${props =>
      props.type === 'item' ? props.theme.mainGrey : props.theme.mainPink};
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span {
    color: ${props => props.theme.mainPurple};
  }
`;

export const ItemListSelectBox = styled.select`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundGrey};
  border: none;
  padding: 4px;
  margin: 6px;
`;

export const ShoppingBasketButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundGrey};
  border: none;
  padding: 4px;
  margin: 6px;
  cursor: pointer;
`;

export const MainBottomDiv = styled.div`
  max-width: 76.8rem;
  width: 100%;
  height: 100px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
    font-size: 1rem;
    color: ${props => props.theme.mainGrey};
  }
`;

export const TotalAmountTitle = styled.p`
  font-size: 1.5rem;
  margin-right: 10px;
  color: ${props => props.theme.mainBlack};
`;

export const NextButton = styled.button`
  width: 95%;
  height: 40px;
  border: none;
  margin: 10px;
  background-color: ${props => props.theme.backgroundPurple};
  color: ${props => props.theme.mainWhite};
  border-radius: 4px;
  text-align: center;
  font-weight: 400;
`;

export const IconStyle = styled(FontAwesomeIcon)`
  color: ${props => props.theme.mainPurple};
  font-size: 1rem;
`;
