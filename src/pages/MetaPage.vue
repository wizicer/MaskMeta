<template>
  <q-page>
    <q-banner
      inline-actions
      class="bg-info text-white full-width"
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
        <q-card
          v-for="(k, i) in items"
          :key="i"
          class="full-width q-my-md"
          @click="showThisItem(k)"
        >
          <q-card-section class="row items-center">
            <div class="text-h6">{{ k.title }}</div>
            <q-space />
            <q-btn flat round dense icon="qr_code" />
            <q-btn flat round dense icon="more_vert" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div>{{ k.description }}</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="text-subtitle2">{{ k.date }}</div>
            <template v-if="k.verified">
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
                  <q-icon :name="k.icon" />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showThisItem(item: any) {
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

defineOptions({
  name: 'MetaPage',
});

const store = useVaultStore();

const items = computed(() => store.items);

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
