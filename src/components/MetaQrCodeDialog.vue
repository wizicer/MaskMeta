<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" @click="onCloseClick" />
      </q-card-section>
      <q-separator />

      <q-card-section class="row justify-center q-mx-md">
        <qrcode-vue :size="250" :value="value"></qrcode-vue>
      </q-card-section>

      <q-card-section class="bg-warning text-white q-pa-md q-mb-md">
        <div class="text-h6">Privacy Alert</div>
        <div>This QR code will expose all fields of the Meta, including:</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { MetaItem } from '../models/entity';
// import * as Entity from '../models/entity';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

const props = defineProps<{
  item: MetaItem;
}>();

const value = ref(props.item.description);

console.log('item', props.item);
// const d: MetaItem | null = null;
// console.log('d', d);

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onCloseClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
