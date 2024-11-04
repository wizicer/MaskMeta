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
  issuer: string;
  fields: Record<string, string>;
  did: string;
  status: ItemAvailability;
}

export interface MethodItem {
  name: SupportedMethodName;
  document: string;
  did: string;
  status: ItemAvailability;
}

export interface MaskItem {
  id: number;
  title: string;
  description: string;
  privateKey: string;
  methods: MethodItem[];
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
  status: ItemAvailability;
  payload: string;
  time: Date;
}
