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
      <p>
        Last result: <b>{{ result }}</b>
      </p>

      <div style="border: 2px solid black">
        <qrcode-stream
          :track="paintBoundingBox"
          @detect="onDetect"
          @error="onError"
        ></qrcode-stream>
      </div>
      <!-- 
      <q-card-section>
        <q-list separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <div class="text-caption">Field Name 1</div>
              <div class="text-body1">Description 1</div>
            </q-item-section>
            <q-item-section side>Item 4</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <div class="text-caption">Field Name 2</div>
              <div class="text-body1">Description 2</div>
            </q-item-section>
            <q-item-section side>Item 5</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <div class="text-caption">Field Name 3</div>
              <div class="text-body1">Description 3</div>
            </q-item-section>
            <q-item-section side>Item 6</q-item-section>
          </q-item>
        </q-list>
      </q-card-section> -->
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
import { ref } from 'vue';

const props = defineProps<{
  item: MetaItem;
}>();

console.log('item', props.item);

const result = ref('');
const error = ref('');

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
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
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
