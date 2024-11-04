import { defineStore } from 'pinia';
import {
  MetaItem,
  MaskItem,
  CredentialCategory,
  CredentialItem,
  Issuer,
  DIDMethod,
  HistoryItem,
} from '../models/entity';
import { bech32m } from '@scure/base';
import { DidJwk } from '@web5/dids';

const metaItems: MetaItem[] = [
  // {
  //   title: 'Meta 1',
  //   description: 'This is a description for Meta 1.',
  //   date: '2023-10-01',
  //   icon: 'apple',
  //   verified: true,
  // },
  // {
  //   title: 'Meta 2',
  //   description: 'This is a description for Meta 2.',
  //   date: '2023-9-01',
  //   icon: 'facebook',
  //   verified: true,
  // },
];

const maskItems: MaskItem[] = [
  // {
  //   title: 'Mask 1',
  //   description: 'Comment of Mask 1',
  //   privateKey: 'pri',
  //   methods: [
  //     {
  //       name: 'mm',
  //       status: 'online',
  //     },
  //   ],
  //   icon: 'face',
  // },
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
    name: 'self_arc',
    title: 'Self Issuer (Arcblock)',
    description: 'Issuer for self-issued credentials.',
    avatar: 'https://via.placeholder.com/64',
  },
  {
    name: 'self_tbd',
    title: 'Self Issuer (TBD Block)',
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
    issuer: 'self_tbd',
    category: 'Anything',
    description: 'The onchain address you want to associate with your Mask',
    available: true,
  },
  {
    name: 'Text',
    issuer: 'self_arc',
    category: 'Anything',
    description:
      'Any text that can be issued by yourself to be wrapped in a Meta',
    available: true,
  },
  {
    name: 'Image',
    issuer: 'self_arc',
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

const didMethods: DIDMethod[] = [
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
  {
    name: 'tbd',
    vendor: 'TBD',
    title: 'TBD (Block)',
    description: 'Through TBD blockchain network to store DID document.',
    icon: 'calendar_today',
    prefix: 'tbd',
    color: 'teal-2',
    promotions: [
      {
        label: 'Public',
        color: 'orange-5',
      },
    ],
    texts: {
      offline: 'Publish',
      online: 'Published',
    },
  },
  {
    name: 'arcblock',
    vendor: 'Arcblock',
    title: 'Arcblock',
    description: 'Through Arcblock blockchain network to store DID document.',
    icon: 'view_in_ar',
    prefix: 'arc',
    color: 'lime-2',
    promotions: [
      {
        label: 'Public',
        color: 'orange-5',
      },
    ],
    texts: {
      offline: 'Publish',
      online: 'Published',
    },
  },
];

const credentialIssuers = {
  categories: credentialCategories,
  issuers,
  items: credentialItems,
};

const history: HistoryItem[] = [];

export const useVaultStore = defineStore('vault', {
  state: () => ({
    metaItems,
    maskItems,
    credentialIssuers,
    didMethods,
    history,
    index: 0,
  }),

  getters: {
    count(state) {
      return state.metaItems.length;
    },

    issuerDict(state) {
      const issuersDict = state.credentialIssuers.issuers.reduce(
        (acc, issuer) => {
          acc[issuer.name] = issuer;
          return acc;
        },
        {} as Record<string, Issuer>,
      );
      return issuersDict;
    },

    metaItemDict(state) {
      const metaItemsDict = state.metaItems.reduce(
        (acc, metaItem) => {
          acc[metaItem.id] = metaItem;
          return acc;
        },
        {} as Record<number, MetaItem>,
      );
      return metaItemsDict;
    },

    maskItemDict(state) {
      const maskItemsDict = state.maskItems.reduce(
        (acc, maskItem) => {
          acc[maskItem.id] = maskItem;
          return acc;
        },
        {} as Record<number, MaskItem>,
      );
      return maskItemsDict;
    },
  },

  actions: {
    newMetaItem(metaItem: MetaItem) {
      metaItem.id = this.index++;
      this.metaItems.push(metaItem);
      this.history.push({
        id: this.history.length,
        action: 'new',
        type: 'meta',
        vendor: 'unknown',
        status: 'offline',
        payload: metaItem.payload,
        time: new Date(Date.now()),
      });
    },
    newMaskItem(maskItem: MaskItem) {
      maskItem.id = this.index++;
      if (!maskItem.privateKey) {
        maskItem.privateKey = Math.random().toString(10).substring(2); // TODO: should use true random key
      }
      this.maskItems.push(maskItem);
      this.history.push({
        id: this.history.length,
        action: 'new',
        type: 'mask',
        vendor: 'unknown',
        status: 'offline',
        payload: '',
        time: new Date(Date.now()),
      });
    },
    async newMaskMethod(maskItem: MaskItem, method: DIDMethod) {
      const foundMaskItem = this.maskItems.find(
        (item) => item.title === maskItem.title,
      );
      if (!foundMaskItem) return;

      const existingMethod = foundMaskItem.methods.find(
        (m) => m.name === method.name,
      );
      if (existingMethod) return;

      let did = '';
      let document = '';
      console.log(method.prefix);
      switch (method.prefix) {
        case 'mm':
          did = bech32m.encode(
            'did:mm:',
            bech32m.toWords(await hash(maskItem.privateKey)),
          );
          break;

        case 'pin':
          did = bech32m.encode(
            'did:pin:',
            bech32m.toWords(await hash(maskItem.privateKey)),
          );
          break;

        case 'tbd':
          const didjwk = await DidJwk.create();
          did = didjwk.uri;
          document = JSON.stringify(await didjwk.export());
          break;

        case 'arc':
          did = bech32m.encode(
            'did:arc:',
            bech32m.toWords(await hash(maskItem.privateKey)),
          );
          break;

        default:
          console.warn('Unsupported DID method prefix', method.prefix);
          break;
      }

      foundMaskItem.methods.push({
        name: method.prefix,
        status: 'offline',
        did,
        document,
      });
      this.history.push({
        id: this.history.length,
        action: 'enable',
        type: 'did',
        vendor: method.prefix,
        status: 'offline',
        payload: JSON.stringify({ did, document }, null, 2),
        time: new Date(Date.now()),
      });
    },
  },
});

async function hash(input: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}
