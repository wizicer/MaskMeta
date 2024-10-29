<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center">
          <q-icon :name="icon" :color="color" size="2.5em" class="q-mr-md" />
          <div>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ description }}</q-item-label>
          </div>
          <q-space />
          <q-btn flat round dense icon="close" @click="onDialogHide" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="basicInfo" label="Basic Info" />
          <q-tab name="methods" label="Methods" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="basicInfo">
            <q-input v-model="title" label="Title">
              <template v-slot:prepend>
                <q-icon name="title" />
              </template>
            </q-input>
            <q-input v-model="description" label="Description">
              <template v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-input>
            <q-select v-model="icon" :options="iconOptions" label="Icon">
              <template v-slot:prepend>
                <q-icon name="insert_emoticon" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select v-model="color" :options="colorOptions" label="Color">
              <template v-slot:prepend>
                <q-icon name="color_lens" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label :class="'text-' + scope.opt">{{
                      scope.opt
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              v-model="privateKey"
              label="Private Key"
              readonly
              :type="privateKeyType"
            >
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="
                    privateKeyType === 'password'
                      ? 'visibility'
                      : 'visibility_off'
                  "
                  @click="togglePrivateKeyVisibility"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input v-model="publicKey" label="Public Key" readonly>
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
            </q-input>
          </q-tab-panel>
          <q-tab-panel name="methods">
            <div class="row items-center q-mt-md">
              <q-icon name="cloud" size="2.5em" class="q-mr-md" />
              <div>
                <q-item-label class="text-h6">Methods</q-item-label>
              </div>
              <q-space />
              <q-btn flat round dense icon="add" />
            </div>
            <q-separator class="q-mt-md" />
            <q-list>
              <q-item v-for="(method, index) in item.methods" :key="index">
                <q-item-section>
                  <q-item-label>{{ method.name }}</q-item-label>
                  <q-item-label caption>{{ method.status }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="method.status === 'offline'" side>
                  <q-btn
                    flat
                    round
                    dense
                    icon="link"
                    @click="setOnline(method)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-actions>
        <q-btn
          v-if="false"
          color="secondary"
          label="Graph"
          @click="showGraph"
          class="q-mr-md"
        />
        <q-space />
        <q-btn label="Cancel" @click="onDialogCancel" class="q-mr-md" />
        <q-btn color="primary" label="Edit" @click="onEditClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Notify, useDialogPluginComponent } from 'quasar';
import { MaskItem } from '../models/entity';
import { ref } from 'vue';
import { Ref } from 'vue';

const prop = defineProps<{
  item: MaskItem;
}>();

const tab = ref('basicInfo');

const passwordMask = '********';
const title = ref(prop.item.title);
const description = ref(prop.item.description);
const icon = ref(prop.item.icon);
const color = ref(prop.item.color ?? '');
const privateKey = ref(passwordMask);
const privateKeyType: Ref<'password' | 'text'> = ref('password');
const publicKey = ref(prop.item.publicKey);

const iconOptions = [
  'face',
  'lock',
  'mail',
  'phone',
  'home',
  'work',
  'account_circle',
  'fingerprint',
  'vpn_key',
  'badge',
  'person',
  'portrait',
  'perm_identity',
  'verified_user',
  'security',
  'shield',
  'lock_open',
  'lock_outline',
  'visibility',
];

const colorOptions = [
  'primary',
  'secondary',
  'accent',
  'dark',
  'positive',
  'negative',
  'info',
  'warning',
];

function togglePrivateKeyVisibility() {
  if (privateKeyType.value === 'password') {
    // confirm to show private key
    Notify.create({
      message: 'Are you sure you want to show the private key?',
      color: 'warning',
      actions: [
        {
          label: 'Yes',
          color: 'positive',
          handler: () => {
            privateKey.value = prop.item.privateKey;
            privateKeyType.value = 'text';
          },
        },
        {
          label: 'No',
          color: 'negative',
          handler: () => {
            privateKey.value = passwordMask;
            privateKeyType.value = 'password';
          },
        },
      ],
    });
  } else {
    privateKey.value = passwordMask;
    privateKeyType.value = 'password';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOnline(method: any) {
  console.log(method);
}

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

function onEditClick() {
  const editedItem: MaskItem = {
    ...prop.item,
    title: title.value,
    description: description.value,
    icon: icon.value,
    color: color.value,
  };
  onDialogOK(editedItem);
}
function showGraph() {
  //
}
</script>
