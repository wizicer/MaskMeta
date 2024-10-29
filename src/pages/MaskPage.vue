<template>
  <q-page class="row q-ma-md">
    <q-list class="full-width" style="max-width: 600px">
      <q-card
        v-for="(item, i) in items"
        :key="i"
        class="q-mb-md"
        clickable
        v-ripple
      >
        <q-card-section>
          <div class="row items-center">
            <q-icon name="face" size="2.5em" class="q-mr-md" />
            <div>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption>{{ item.description }}</q-item-label>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-item-label caption>Attribute 1</q-item-label>
            </div>
            <div class="col">
              <q-item-label caption>Attribute 2</q-item-label>
            </div>
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
    publicKey: 'pub',
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
