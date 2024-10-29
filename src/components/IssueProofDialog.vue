<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">
          <q-icon name="fingerprint" class="q-mr-sm" />
          {{ item.name }}
        </div>
        <q-space />
        <q-btn flat round dense icon="close" @click="onCloseClick" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-mx-md">
        <div class="text-grey">{{ item.description }}</div>
      </q-card-section>
      <q-card-section class="row items-center q-mx-md">
        Issuer:
        <q-badge color="primary">
          {{ issuers[item.issuer].title }}
        </q-badge>
        <q-space />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form>
          <q-file
            v-model="file"
            label="Upload email .eml file"
            accept=".eml"
            outlined
            clearable
          />
          <q-select
            v-model="mask"
            :options="maskOptions"
            label="Mask selection"
            outlined
            clearable
            class="q-mt-md"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.title }}</q-item-label>
                  <q-item-label caption>
                    {{ scope.opt.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <q-item-label>{{ scope.opt.title }}</q-item-label>
            </template>
          </q-select>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" label="Prove" @click="onOkClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { CredentialItem, Issuer } from '../models/entity';
import { useVaultStore } from 'src/stores/vault';
import { computed, ref } from 'vue';

const store = useVaultStore();

const issuers = computed(() => {
  const issuersDict = store.credentialIssuers.issuers.reduce(
    (acc, issuer) => {
      acc[issuer.name] = issuer;
      return acc;
    },
    {} as Record<string, Issuer>,
  );
  return issuersDict;
});

const mask = ref('');
const file = ref<File | null>(null);
const maskOptions = computed(() => {
  return store.maskItems;
});

defineProps<{
  item: CredentialItem;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

function onCloseClick() {
  onDialogHide();
}

function onOkClick() {
  onDialogOK();
}
</script>
