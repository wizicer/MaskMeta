export type ItemAvailability = 'online' | 'offline';
export type SupportedMethodName = 'mm' | 'dht' | 'eth' | 'pin' | 'tbd' | 'arc';

export interface MetaItem {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
  verified: boolean;
  payload: string;
}

export interface MaskItem {
  id: number;
  title: string;
  description: string;
  privateKey: string;
  methods: {
    name: SupportedMethodName;
    document: string;
    did: string;
    status: ItemAvailability;
  }[];
  icon: string;
  color?: string;
}

export interface Issuer {
  name: string;
  title: string;
  description: string;
  avatar: string;
}

export interface CredentialItem {
  name: string;
  issuer: string;
  category: string;
  description: string;
  avatar?: string;
  available?: boolean;
}

export interface CredentialCategory {
  name: string;
  icon: string;
}

interface Promotion {
  label: string;
  color: string;
}

export interface DIDMethod {
  name: string;
  vendor: string;
  title: string;
  description: string;
  icon: string;
  prefix: SupportedMethodName;
  color: string;
  promotions: Promotion[];
  texts: {
    offline: string;
    online: string;
  };
}

export interface HistoryItem {
  id: number;
  action: string;
  type: 'meta' | 'mask' | 'did';
  vendor: string;
  status: 'online' | 'offline';
  payload: string;
  time: Date;
}
