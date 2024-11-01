<template>
  <q-page class="row q-ma-md">
    <div id="mynetwork"></div>
    <h5>History List:</h5>
    <HistoryComponent />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVaultStore } from 'stores/vault';
import { Network } from 'vis-network';
import HistoryComponent from 'components/HistoryComponent.vue';

defineOptions({
  name: 'MaskPage',
});

const store = useVaultStore();

// const items = computed(() => store.maskItems);

// const nodes = [
//   { id: 1, label: 'Node 1' },
//   { id: 2, label: 'Node 2' },
//   { id: 3, label: 'Node 3' },
//   { id: 4, label: 'Node 4' },
// ];

// let index = 1;
const nodes = store.maskItems
  .map((item) => ({
    id: `node-${item.title}`,
    label: item.title,
    shape: '',
    color: '#FCC297',
  }))
  .concat(
    store.maskItems.flatMap((item) =>
      item.methods.map((method) => ({
        id: `method-${item.title}-${method.name}`,
        label: `did:${method.name}:..`,
        shape: 'box',
        color: method.status === 'offline' ? '#CCCCCC' : '#90EE90',
      })),
    ),
  )
  .concat(
    store.metaItems.map((item) => ({
      id: `meta-${item.title}`,
      label: item.title,
      shape: 'box',
      color: '#E1A1BB',
    })),
  );

// const edges = [
//   // { from: 1, to: 3 },
//   // { from: 'node-1', to: 'node-2' },
//   // { from: 'node-2', to: 'node-4' },
// ];
const edges = store.maskItems.flatMap((item) =>
  item.methods.map((method) => ({
    from: `node-${item.title}`,
    to: `method-${item.title}-${method.name}`,
    color: '#444444',
    dashes: method.status === 'offline',
  })),
);
const options = {
  manipulation: {
    enabled: true,
    initiallyActive: true,
  },
  nodes: {
    physics: true,
  },
};

// let container: HTMLElement | null = null;
// let network: Network | null = null;

const graph_data = computed(() => ({
  nodes,
  edges,
}));
import { ref, onMounted } from 'vue';

const containerRef = ref<HTMLElement | null>(null);
const networkRef = ref<Network | null>(null);

onMounted(() => {
  containerRef.value = document.getElementById('mynetwork');

  if (containerRef.value) {
    networkRef.value = new Network(
      containerRef.value,
      graph_data.value,
      options,
    );
  }
});
// console.log(network);
</script>

<style scoped>
#mynetwork {
  width: 100%;
  height: 620px;
  margin: 5px 0;
  border: 1px solid #000;
}
</style>
