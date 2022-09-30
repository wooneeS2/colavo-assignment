import styled from 'styled-components';

export const MainTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 14px;
  font-size: 1rem;
`;

export const MainTitle = styled.p`
  position: absolute;
  left: 50%;
  font-size: 1.2rem;
  color: ${props => props.theme.mainBlack};
`;

export const SelectedItemBottomDiv = styled.div`
  color: ${props => props.theme.mainWhite};
  background-color: ${props => props.theme.mainPurple};
  font-size: 1rem;

  max-width: 76.8rem;
  width: 100%;
  height: 100px;
  text-align: center;
  p {
    margin: 10px;
  }
`;

export const SaleRateTitle = styled.span`
  color: ${props => props.theme.mainPink};
  display: block;
  font-size: 1rem;
`;
