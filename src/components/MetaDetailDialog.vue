<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ item.title }}</div>
        <q-space />
        <q-btn flat round dense icon="close" @click="onCloseClick" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-mx-md">
        <div>{{ item.description }}</div>
      </q-card-section>
      <q-card-section class="row items-center q-mx-md">
        <div class="text-subtitle2">{{ item.date }}</div>
        <template v-if="item.verified">
          <q-icon name="verified" class="q-ml-sm text-green" />
          <span class="text-green q-ml-sm">Valid</span>
        </template>
        <template v-else>
          <q-icon name="close" class="q-ml-sm text-red" />
          <span class="text-red q-ml-sm">Invalid</span>
        </template>
        <q-space />
        <div class="relative-position">
          <div class="absolute-bottom-right">
            <q-avatar size="64px">
              <q-icon :name="item.icon" />
            </q-avatar>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item
            v-for="(field, index) in fields"
            :key="index"
            clickable
            v-ripple
          >
            <q-item-section>
              <div class="text-caption">{{ field.name }}</div>
              <div class="text-body1">{{ field.description }}</div>
            </q-item-section>
            <q-item-section side>{{ field.value }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Close" @click="onCloseClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { MetaItem } from '../models/entity';
import { Ref, computed } from 'vue';
// import * as Entity from '../models/entity';

const props = defineProps<{
  item: MetaItem;
}>();

const fields: Ref<{ name: string; description: string; value: string }[]> =
  computed(() =>
    Object.keys(props.item.fields).map((_) => ({
      name: _,
      description: '',
      value: props.item.fields[_],
    })),
  );

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
