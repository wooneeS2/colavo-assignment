import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    props.type === 'item'
      ? props.theme.backgroundPink
      : props.theme.backgroundGrey};
  color: ${props =>
    props.type === 'item' ? props.theme.mainPink : props.theme.mainGrey};
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

export const ItemListStyle = styled.li`
  list-style: none;
  margin: 6px;
  font-size: 1.2rem;
  color: ${props => props.theme.mainBlack};
  p {
    font-size: 1rem;
    color: ${props => props.theme.mainGrey};
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

export const SaleEditButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundGrey};
  border: none;
  padding: 4px;
  margin: 6px;
`;
