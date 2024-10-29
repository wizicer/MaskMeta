import { defineStore } from 'pinia';
import { MetaItem, MaskItem } from '../models/entity';

const metaItems: MetaItem[] = [
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

const maskItems: MaskItem[] = [
  {
    title: 'Mask 1',
    description: 'Comment of Mask 1',
    privateKey: 'pri',
    publicKey: 'pub',
    methods: [
      {
        name: 'mm',
        status: 'offline',
      },
    ],
    icon: 'face',
  },
];

export const useVaultStore = defineStore('vault', {
  state: () => ({
    metaItems,
    maskItems,
  }),

  getters: {
    count(state) {
      return state.metaItems.length;
    },
  },

  actions: {
    newMetaItem(metaItem: MetaItem) {
      this.metaItems.push(metaItem);
    },
    newMaskItem(maskItem: MaskItem) {
      this.maskItems.push(maskItem);
    },
  },
});
