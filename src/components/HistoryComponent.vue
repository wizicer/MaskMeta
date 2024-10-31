<template>
  <div class="row q-col-gutter-lg full-width">
    <!-- Timeline Column -->
    <div class="col-6">
      <q-timeline class="q-timeline--compact">
        <q-timeline-entry
          v-for="entry in timelineEntries"
          :key="entry.id"
          :side="entry.side"
          :color="entry.color"
          class="q-timeline-entry--compact"
          @mouseover="hoverEntry(entry)"
          @mouseleave="leaveEntry(entry)"
          @click="selectEntry(entry)"
        >
          <template v-slot:title>
            {{ `${entry.subtitle} - ${entry.device} - ${entry.action}` }}
            <!-- {{ entry.title }} -->
          </template>
          <template v-slot:subtitle> </template>
          <template v-slot:icon>
            <q-icon
              :name="selectedEntry === entry ? 'check_circle' : 'circle'"
            />
          </template>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- Chainlink Details Column -->
    <div class="col-6">
      <q-card>
        <q-card-section class="text-subtitle1 text-weight-medium"
          >Chainlink 1</q-card-section
        >
        <q-separator />

        <!-- Chainlink Details -->
        <q-card-section>
          <div class="text-caption">Signed:</div>
          <div>
            <q-icon name="favorite" class="text-grey-6 q-mr-xs" />with love
          </div>

          <div class="text-caption q-mt-md">Using:</div>
          <div>
            <q-icon name="vpn_key" class="text-grey-6 q-mr-xs" />iOS Device
          </div>

          <div class="text-caption q-mt-md">Payload:</div>
          <q-card class="bg-grey-2 q-pa-xs">
            <pre>{{ selectedPayload }}</pre>
          </q-card>
        </q-card-section>

        <q-separator />

        <!-- Signature Information -->
        <q-card-section>
          <div>Signed payload:</div>
          <div>🔑 iOS Device + payload =</div>
          <q-card class="bg-grey-2 q-pa-xs">
            <pre>{{ selectedSignature }}</pre>
          </q-card>
        </q-card-section>

        <!-- Links -->
        <q-card-actions align="left">
          <q-btn flat label="sig/get.json?sig_id=..." color="primary" />
          <q-btn flat label="keybase or clinacl" color="primary" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Timeline data
const timelineEntries = ref([
  {
    id: 1,
    title: 'created fresh Keybase account, adding first key',
    subtitle: 'iOS Device',
    action: 'created fresh Keybase account',
    device: 'iOS Device',
    deviceIcon: 'smartphone',
    deviceColor: 'primary',
    color: 'green',
    payload: `{
  "body": {
    "device": { "id": "0212bf2a..." },
    "key": { "host": "keybase.io", ... },
    ...
  }
    }`,
    signature: 'h9Kk12HpsDH+XhX2m...',
  },
  {
    id: 2,
    title: 'added encryption key for iOS Device',
    action: 'added encryption key',
    device: 'iOS Device',
    deviceIcon: 'vpn_key',
    deviceColor: 'grey-6',
    color: 'blue',
    payload: `{
      "body": {
        "device": { "id": "0212bf2a..." },
        "key": { "host": "keybase.io", ... },
        ...
      }
    }`,
    signature: 'h9Kk12HpsDH+XhX2m...',
  },
  {
    id: 3,
    title: 'auto-generated a new user key',
    action: 'auto-generated a new user key',
    device: '',
    color: 'blue',
    payload: `{
      "body": {
        "device": { "id": "0212bf2a..." },
        "key": { "host": "keybase.io", ... },
        ...
      }
    }`,
    signature: 'h9Kk12HpsDH+XhX2m...',
  },
  {
    id: 4,
    title: 'added Stellar key',
    action: 'added Stellar key',
    device: 'Stellar Key',
    deviceIcon: 'key',
    deviceColor: 'purple',
    color: 'blue',
    payload: `{
      "body": {
        "device": { "id": "0212bf2a..." },
        "key": { "host": "keybase.io", ... },
        ...
      }
    }`,
    signature: 'h9Kk12HpsDH+XhX2m...',
  },
  // Add more entries as needed...
]);

const selectedEntry = ref(null);
const selectedPayload = ref('');
const selectedSignature = ref('');

const hoverEntry = (entry) => {
  entry.color = 'orange'; // Change color on hover
};

const leaveEntry = (entry) => {
  entry.color = entry.deviceColor; // Revert color on leave
};

const selectEntry = (entry) => {
  selectedEntry.value = entry;
  selectedPayload.value = entry.payload;
  selectedSignature.value = entry.signature;
};
</script>

<style scoped>
.q-timeline-entry .row {
  align-items: center;
}
</style>
