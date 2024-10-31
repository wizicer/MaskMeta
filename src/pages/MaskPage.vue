<template>
  <q-page class="row q-ma-md">
    <q-list class="full-width" style="max-width: 600px">
      <q-card v-for="(item, i) in items" :key="i" class="q-mb-md">
        <q-card-section clickable v-ripple @click="showThisItem(item)">
          <div class="row items-center">
            <q-icon name="face" size="2.5em" class="q-mr-md" />
            <div>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption>{{ item.description }}</q-item-label>
            </div>
            <q-space />
            <q-icon name="keyboard_arrow_right" size="2em" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div
            v-for="(method, index) in item.methods"
            :key="index"
            class="row items-center q-mb-sm"
          >
            <q-item-label>
              {{ method.name }}
              : did:mm:0000000000000000000000000000000001
            </q-item-label>
            <q-space />
            <q-item-label caption>
              <q-icon
                :name="
                  method.status === 'online' ? 'check_circle' : 'highlight_off'
                "
                :color="method.status === 'online' ? 'green' : 'grey'"
                size="1.5em"
                class="q-mr-sm"
              />
              {{ method.status }}
            </q-item-label>
          </div>
          <div class="row justify-end q-mt-md">
            <q-btn
              flat
              dense
              label="Manage"
              color="primary"
              @click="manageDid(item)"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-item clickable v-ripple @click="addMask">
        <q-item-section avatar>
          <q-icon name="add_circle_outline" size="3em" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Add mask</q-item-label>
          <q-item-label caption>
            Mask is your decentralized identity, also known as DID.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVaultStore } from 'stores/vault';
import { Dialog } from 'quasar';
import MaskDetailDialog from 'components/MaskDetailDialog.vue';
import DidDetailDialog from 'components/DidDetailDialog.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showThisItem(item: any) {
  console.log(item);

  Dialog.create({
    component: MaskDetailDialog,

    // props forwarded to your custom component
    componentProps: {
      item,
    },
  })
    .onOk(() => {
      console.log('OK');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function manageDid(item: any) {
  Dialog.create({
    component: DidDetailDialog,

    // props forwarded to your custom component
    componentProps: {
      item,
    },
  })
    .onOk(() => {
      console.log('OK');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
}

defineOptions({
  name: 'MaskPage',
});

const store = useVaultStore();

const items = computed(() => store.maskItems);
function addMask() {
  store.newMaskItem({
    title: 'New Mask',
    description: 'This is a new mask',
    privateKey: 'pri',
    methods: [
      {
        name: 'mm',
        status: 'offline',
      },
    ],
    icon: 'face',
  });
}
</script>
