<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ item.title }}</div>
        <q-space />
        <q-btn flat round dense icon="close" @click="onCloseClick" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-mx-md">
        <div>{{ item.description }}</div>
      </q-card-section>
      <q-card-section class="row items-center q-mx-md">
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

      <q-separator />
      <q-expansion-item v-if="result" class="q-ma-md" expand-separator>
        <template v-slot:header>
          <q-item-section>
            <q-item-label>Request</q-item-label>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <pre class="wrappable">{{ result }}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div v-if="!result" style="border: 2px solid black">
        <qrcode-stream
          :track="paintBoundingBox"
          @detect="onDetect"
          @error="onError"
        ></qrcode-stream>
      </div>

      <q-card-section v-if="result">
        <q-list separator>
          <q-item
            v-for="(field, index) in fields"
            :key="index"
            clickable
            v-ripple
          >
            <q-item-section>
              <!-- <div class="text-body1">{{ field.description }}</div> -->
              <div class="text-caption">
                <template v-if="exposureFields.includes(field.name)">
                  <q-icon name="visibility" color="orange" class="q-mr-sm" />
                  <span class="text-orange">Partially Exposure (>1990)</span>
                </template>
                <template v-else>
                  <q-icon name="visibility_off" color="green" class="q-mr-sm" />
                  <span class="text-green">Privacy</span>
                </template>
              </div>
              <div class="text-body1">{{ field.name }}</div>
            </q-item-section>
            <q-item-section side>{{ field.value }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-if="result" class="row justify-center q-mx-md">
        <qrcode-vue :size="250" :value="qrValue"></qrcode-vue>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Close" @click="onCloseClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { MetaItem } from '../models/entity';
// import * as Entity from '../models/entity';
import { QrcodeStream } from 'vue-qrcode-reader';
import QrcodeVue from 'qrcode.vue';
import { Ref, computed, ref } from 'vue';

const props = defineProps<{
  item: MetaItem;
}>();

console.log('item', props.item);

const result = ref('');
const error = ref('');
const qrValue = ref('');

// Function to generate a random base58 string of length 200
function generateBase58String(length: number): string {
  const base58Chars =
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += base58Chars.charAt(
      Math.floor(Math.random() * base58Chars.length),
    );
  }
  return result;
}

// Generate the base58 string and assign it to qrValue
qrValue.value = generateBase58String(200);

const fields: Ref<{ name: string; description: string; value: string }[]> =
  computed(() =>
    Object.keys(props.item.fields).map((_) => ({
      name: _,
      description: '',
      value: props.item.fields[_],
    })),
  );

const exposureFields: Ref<string[]> = ref([]);

interface DetectedCode {
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  rawValue: string;
  format: string;
  cornerPoints: {
    x: number;
    y: number;
  }[];
}

function paintBoundingBox(
  detectedCodes: DetectedCode[],
  ctx: CanvasRenderingContext2D,
) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;

  detectedCodes.forEach((code) => {
    const { x, y, width, height } = code.boundingBox;
    ctx.strokeRect(x, y, width, height);
  });
}

function onError(err: Error) {
  error.value = `[${err.name}]: `;

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission';
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device';
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)';
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?';
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable';
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser';
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
  } else {
    error.value += err.message;
  }
}

function onDetect(detectedCodes: DetectedCode[]) {
  const obj = JSON.parse(detectedCodes[0].rawValue);
  exposureFields.value = obj.request.criterias.map(
    (_: { field: string }) => _.field,
  );
  console.log(exposureFields.value);
  result.value = JSON.stringify(
    detectedCodes.map((code) => JSON.parse(code.rawValue)),
    null,
    2,
  );
}

// const d: MetaItem | null = null;
// console.log('d', d);

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onCloseClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>

<style scoped>
.wrappable {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}
</style>
