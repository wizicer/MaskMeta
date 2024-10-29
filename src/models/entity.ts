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
  publicKey: string;
  methods: {
    name: SupportedMethodName;
    status: ItemAvailability;
  }[];
  icon: string;
}
