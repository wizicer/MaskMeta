<template>
  <q-page>
    <q-banner
      inline-actions
      class="bg-info text-white full-width q-py-md"
      v-if="showBanner"
    >
      <template v-slot:avatar>
        <q-icon name="tips_and_updates" />
      </template>
      <span class="highlight_mask">Mask</span> is an abstraction that unifies
      various DIDs across different ecosystems, such as TBD DID and ARC DID,
      providing a single, cohesive identity. This unified identity simplifies
      managing and recognizing an individual across multiple platforms.

      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="dismissBanner" />
      </template>
    </q-banner>

    <div class="row q-mx-md">
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
              <div class="ellipsis-container">
                <q-tooltip>
                  {{ method.did }}
                </q-tooltip>
                <q-item-label class="ellipsis">{{ method.did }}</q-item-label>
              </div>
              <q-space />
              <q-item-label caption>
                <q-icon
                  :name="
                    method.status === 'online'
                      ? 'check_circle'
                      : 'highlight_off'
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
              Mask is your unified decentralized identity, encompassing multiple
              DIDs.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
    id: -1,
    title: 'New Mask',
    description: 'This is a new mask',
    privateKey: '',
    methods: [],
    icon: 'face',
  });
}

const showBanner = ref(true);

const dismissBanner = () => {
  showBanner.value = false;
};
</script>

<style scoped>
.ellipsis-container {
  max-width: 200px; /* Adjust the width as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.highlight_mask {
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
}
</style>
