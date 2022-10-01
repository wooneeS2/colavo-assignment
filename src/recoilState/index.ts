import { atom } from 'recoil';

export const globalSelectedItem = atom({
  key: 'globalSelectedItem',
  default: null,
});

export const globalSelectedSale = atom({
  key: 'globalSelectedSale',
  default: null,
});
