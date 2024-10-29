import { defineStore } from 'pinia';
import {
  MetaItem,
  MaskItem,
  CredentialCategory,
  CredentialItem,
  Issuer,
} from '../models/entity';

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

const credentialCategories: CredentialCategory[] = [
  { name: 'Universal', icon: 'public' },
  { name: 'Demographic', icon: 'face' },
  { name: 'Financial', icon: 'currency_exchange' },
  { name: 'Social', icon: 'diversity_3' },
];

const issuers: Issuer[] = [
  {
    name: 'self',
    title: 'Self Issuer',
    description: 'Issuer for self-issued credentials.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'maskmeta',
    title: 'MaskMeta Server',
    description: 'Issuer for credentials issued by the MaskMeta server.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'government',
    title: 'Government',
    description: 'Issuer for credentials issued by the government.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'exchange',
    title: 'Exchange',
    description: 'Issuer for credentials issued by an exchange platform.',
    avatar: 'https://via.placeholder.com/64',
  },
];

const credentialItems: CredentialItem[] = [
  {
    name: 'KYC Information',
    issuer: 'exchange',
    category: 'Demographic',
    description: 'Information related to Know Your Customer (KYC) procedures.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'Personhood',
    issuer: 'maskmeta',
    category: 'Demographic',
    description: 'Credential verifying the personhood of an individual.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'Personhood',
    issuer: 'government',
    category: 'Demographic',
    description:
      'Credential verifying the personhood of an individual, issued by the government.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'Asset',
    issuer: 'exchange',
    category: 'Financial',
    description: 'Credential representing ownership of a financial asset.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'Twitter',
    issuer: 'maskmeta',
    category: 'Social',
    description: 'Credential linking an account to a Twitter profile.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'zkTwitter',
    issuer: 'self',
    category: 'Social',
    description: 'Credential linking an account to a Twitter profile.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'Google Email',
    issuer: 'maskmeta',
    category: 'Social',
    description: 'Credential linking an account to a Google email address.',
    avatar: 'https://via.placeholder.com/64',
  },
];

const credentialIssuers = {
  categories: credentialCategories,
  issuers,
  items: credentialItems,
};

export const useVaultStore = defineStore('vault', {
  state: () => ({
    metaItems,
    maskItems,
    credentialIssuers,
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
