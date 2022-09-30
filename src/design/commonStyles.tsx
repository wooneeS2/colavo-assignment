import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.mainWhite};
  position: relative;
`;
