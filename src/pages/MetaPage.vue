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
      <span class="highlight_meta">Meta</span> is shorthand for
      <span class="highlight_meta">metadata</span>, which is data about other
      data. The <span class="highlight_meta">Meta</span> used to describe
      various underlying data, allowing any data to be wrapped into a
      <span class="highlight_meta">Meta</span>. Examples include Verifiable
      Credentials, Links, Texts, Images, and more.
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="dismissBanner" />
      </template>
    </q-banner>

    <div class="row q-mx-md">
      <q-list class="full-width" style="max-width: 600px">
        <q-card v-for="(item, i) in items" :key="i" class="full-width q-my-md">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ item.title }}</div>
            <q-space />
            <q-btn flat dense icon="qr_code">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="showQrCode(item, 'full')"
                  >
                    <q-item-section avatar>
                      <q-icon name="account_circle" />
                    </q-item-section>
                    <q-item-section>Expose Full Data</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="showQrCode(item, 'privacy')"
                  >
                    <q-item-section avatar>
                      <q-icon name="privacy_tip" />
                    </q-item-section>
                    <q-item-section>Privacy by ZKP</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn flat dense icon="more_vert" @click="showDetail(item)" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div>{{ item.description }}</div>
          </q-card-section>
          <q-card-section class="row items-center">
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
        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useVaultStore } from 'stores/vault';
import { Dialog } from 'quasar';
import MetaDetailDialog from 'components/MetaDetailDialog.vue';
import MetaQrCodeDialog from 'components/MetaQrCodeDialog.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showDetail(item: any) {
  console.log(item);

  Dialog.create({
    component: MetaDetailDialog,

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
function showQrCode(item: any, option: 'full' | 'privacy') {
  console.log(item);

  if (option === 'full') {
    Dialog.create({
      component: MetaQrCodeDialog,

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
}

defineOptions({
  name: 'MetaPage',
});

const store = useVaultStore();

const items = computed(() => store.metaItems);

const showBanner = ref(true);

const dismissBanner = () => {
  showBanner.value = false;
};
</script>

<style scoped>
.highlight_meta {
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
}
</style>
