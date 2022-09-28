import axios from 'axios';

export const getItemDatas = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}`);
  return response;
};
