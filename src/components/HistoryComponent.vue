<template>
  <div class="row q-col-gutter-lg full-width">
    <!-- Timeline Column -->
    <div class="col-6">
      <q-timeline class="q-timeline--compact">
        <q-timeline-entry
          v-for="entry in timelineEntries"
          :key="entry.id"
          :color="selectedEntry === entry ? 'primary' : 'grey'"
          :icon="selectedEntry === entry ? 'location_on' : undefined"
          class="q-timeline-entry--compact"
          @click="selectEntry(entry)"
        >
          <template v-slot:title>
            {{ entry.action }} <q-chip>{{ entry.type }}</q-chip>
            <strong>{{
              entry.type == 'mask'
                ? maskItems[entry.id].title
                : entry.type == 'meta'
                  ? metaItems[entry.id].title
                  : ''
            }}</strong>
          </template>
          <template v-slot:subtitle>
            {{ formatTime(entry.time) }}
          </template>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- Chainlink Details Column -->
    <div class="col-6">
      <q-card>
        <q-card-section class="text-subtitle1 text-weight-medium"
          >History {{ selectedEntry?.id }}</q-card-section
        >
        <q-separator />

        <!-- Chainlink Details -->
        <q-card-section>
          <div class="text-caption">Issuer:</div>

          <div class="text-caption q-mt-md">Payload:</div>
          <q-card class="bg-grey-2 q-pa-xs">
            <pre>{{ selectedEntry?.payload }}</pre>
          </q-card>
        </q-card-section>

        <q-separator />

        <!-- Signature Information -->
        <!-- <q-card-section>
          <div>Signed payload:</div>
          <div>🔑 iOS Device + payload =</div>
          <q-card class="bg-grey-2 q-pa-xs">
            <pre>{{ selectedSignature }}</pre>
          </q-card>
        </q-card-section> -->

        <!-- Links -->
        <q-card-actions align="left">
          <q-btn flat label="Verify" color="primary" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, computed } from 'vue';
import { useVaultStore } from '../stores/vault';
import { ref } from 'vue';
import { HistoryItem } from 'src/models/entity';
const store = useVaultStore();
const timelineEntries = computed(() => store.history);
const maskItems = computed(() => store.maskItemDict);
const metaItems = computed(() => store.metaItemDict);

const selectedEntry: Ref<HistoryItem | null> = ref(null);

const selectEntry = (entry: HistoryItem) => {
  selectedEntry.value = entry;
};

function formatTime(time: Date) {
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<style scoped>
.q-timeline-entry .row {
  align-items: center;
}
</style>
