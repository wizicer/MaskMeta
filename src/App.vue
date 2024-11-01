<template>
  <router-view />
</template>

<script setup lang="ts">
import { useVaultStore } from './stores/vault';

defineOptions({
  name: 'App',
});

const store = useVaultStore();
if (store.$state.maskItems.length == 0) {
  store.newMaskItem({
    id: -1,
    title: 'Mask 1',
    description: 'Comment of Mask 1',
    privateKey: '',
    methods: [],
    icon: 'face',
  });

  store.newMetaItem({
    id: -1,
    title: 'Meta 1',
    description: 'This is a description for Meta 1.',
    date: '2023-10-01',
    icon: 'apple',
    verified: true,
    payload: '',
  });
}
</script>
