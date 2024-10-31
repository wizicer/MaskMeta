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
    methods: [
      {
        name: 'mm',
        status: 'online',
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
  { name: 'Anything', icon: 'apps' },
];

const issuers: Issuer[] = [
  {
    name: 'self',
    title: 'Self Issuer',
    description: 'Issuer for self-issued credentials.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'zk',
    title: 'ZKP Issuer',
    description: 'Issuer using Zero knowledge Proof.',
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
  {
    name: 'hospital',
    title: 'Hospital',
    description: 'Issuer for credentials issued by a hospital.',
    avatar: 'https://via.placeholder.com/64',
  },
];

const credentialItems: CredentialItem[] = [
  {
    name: 'Address',
    issuer: 'self',
    category: 'Anything',
    description: 'The onchain address you want to associate with your Mask',
    available: true,
  },
  {
    name: 'Text',
    issuer: 'self',
    category: 'Anything',
    description:
      'Any text that can be issued by yourself to be wrapped in a Meta',
    available: true,
  },
  {
    name: 'Image',
    issuer: 'self',
    category: 'Anything',
    description:
      'Any image that can be issued by yourself to be wrapped in a Meta',
    available: true,
  },
  {
    name: 'Medical Report',
    issuer: 'hospital',
    category: 'Demographic',
    description: 'This is a detailed medical report issued by a hospital.',
    avatar: 'https://via.placeholder.com/64',
    available: true,
  },
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
    issuer: 'zk',
    category: 'Social',
    description: 'Credential linking an account to a Twitter profile.',
    avatar: 'https://via.placeholder.com/64',
    available: true,
  },
  {
    name: 'Google Email',
    issuer: 'maskmeta',
    category: 'Social',
    description: 'Credential linking an account to a Google email address.',
    avatar: 'https://via.placeholder.com/64',
  },
];

const didMethods = [
  {
    name: 'maskmeta',
    vendor: 'MaskMeta',
    title: 'MaskMeta Server',
    description:
      'Store DID document on the MaskMeta server for later retrieval.',
    icon: 'public',
    prefix: 'mm',
    color: 'purple-2',
    promotions: [
      {
        label: 'Free',
        color: 'green-5',
      },
      {
        label: 'Private',
        color: 'blue-4',
      },
    ],
    texts: {
      offline: 'Upload',
      online: 'Uploaded',
    },
  },
  {
    name: 'pinata',
    vendor: 'Pinata',
    title: 'Pinata Service',
    description: 'Store DID document on the IPFS through the Pinata service.',
    icon: 'push_pin',
    prefix: 'pin',
    color: 'brown-2',
    promotions: [
      {
        label: 'IPFS',
        color: 'blue-7',
      },
      {
        label: 'Public',
        color: 'orange-5',
      },
    ],
    texts: {
      offline: 'Upload',
      online: 'Uploaded',
    },
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
    didMethods,
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
