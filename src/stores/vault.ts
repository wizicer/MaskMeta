import { defineStore } from 'pinia';
import { MetaItem } from '../models/entity';

const items: MetaItem[] = [
  {
    title: 'Meta 1',
    description: 'This is a description for Meta 1.',
    date: '2023-10-01',
    icon: 'apple',
    verified: true,
  },
  {
    title: 'Meta 2',
    description: 'This is a description for Meta 2.',
    date: '2023-9-01',
    icon: 'facebook',
    verified: true,
  },
];

export const useVaultStore = defineStore('vault', {
  state: () => ({
    items,
  }),

  getters: {
    count(state) {
      return state.items.length;
    },
  },

  actions: {
    newItem(item: MetaItem) {
      this.items.push(item);
    },
  },
});
