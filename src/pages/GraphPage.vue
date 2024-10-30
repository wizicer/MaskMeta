<template>
  <q-page class="row q-ma-md">
    <div id="mynetwork"></div>
    History List:
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVaultStore } from 'stores/vault';
import { Network } from 'vis-network';

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

let index = 1;
const nodes = store.maskItems
  .map((item) => ({
    id: index++,
    label: item.title,
    shape: 'circle',
    color: '#FCC297',
  }))
  .concat(
    store.metaItems.map((item) => ({
      id: index++,
      label: item.title,
      shape: 'box',
      color: '#7BE141',
    })),
  );

const edges = [
  // { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
];
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
