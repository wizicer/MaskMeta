<template>
  <q-page class="row items-center justify-evenly">
    <qrcode-vue :size="250" :value="value"></qrcode-vue>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue';

const value = ref(
  JSON.stringify({
    request: {
      type: 'MedicalReport',
      issuer_id: 'z1TF2ino6mMR94bY9MmwjuQM6twH38vTF8M',
      criterias: [
        {
          field: 'dateOfBirth',
          operator: '>',
          value: '1990',
        },
      ],
    },
  }),
);
</script>
