export type ItemAvailability = 'online' | 'offline';
export type SupportedMethodName = 'mm' | 'dht' | 'eth';

export interface MetaItem {
  title: string;
  description: string;
  date: string;
  icon: string;
  verified: boolean;
}

export interface MaskItem {
  title: string;
  description: string;
  privateKey: string;
  methods: {
    name: SupportedMethodName;
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
