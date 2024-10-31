<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row items-center">
          <q-icon
            :name="item.icon"
            :color="item.color ?? ''"
            size="2.5em"
            class="q-mr-md"
          />
          <div>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.description }}</q-item-label>
          </div>
          <q-space />
          <q-btn flat round dense icon="close" @click="onDialogHide" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- <div class="row items-center q-mt-md">
          <q-icon name="cloud" size="2.5em" class="q-mr-md" />
          <div>
            <q-item-label class="text-h6">Methods</q-item-label>
          </div>
          <q-space />
          <q-btn flat round dense icon="add" />
        </div> -->
        <!-- <q-separator class="q-mt-md" /> -->

        <q-list>
          <!-- <q-item v-for="(method, index) in methods" :key="index">
            <q-item-section>
              <q-item-label>{{ method.name }}</q-item-label>
              <q-item-label caption>{{ method.status }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="method.status === 'offline'" side>
              <q-btn flat round dense icon="link" @click="setOnline(method)" />
            </q-item-section>
          </q-item> -->

          <q-card
            v-for="(method, i) in methods"
            :key="i"
            class="q-pa-md q-my-md"
          >
            <div class="row items-center">
              <div class="text-subtitle1 text-weight-medium">
                {{ method.vendor }}
                <q-badge color="primary" class="q-ml-sm">
                  did:{{ method.prefix }}:...
                </q-badge>
              </div>
              <q-space />
              <q-toggle
                v-model="enabled[method.prefix]"
                color="primary"
                class="q-mr-md"
                @update:model-value="enable(method)"
              />
            </div>
            <div class="text-caption text-grey-6">
              {{ method.description }}
            </div>

            <q-separator class="q-my-md" />

            <div class="row items-center q-gutter-md">
              <q-avatar
                rounded
                :icon="method.icon"
                :color="method.color"
                size="50px"
              />
              <div class="col">
                <div class="text-body1 text-weight-medium">
                  {{ method.title }}
                </div>
                <template
                  v-if="method.promotions && method.promotions.length > 0"
                >
                  <q-chip
                    v-for="(promotion, pi) in method.promotions"
                    :key="pi"
                    :label="promotion.label"
                    :color="promotion.color"
                    text-color="white"
                    dense
                  />
                </template>
              </div>
              <q-btn
                v-if="!doneMethods[method.prefix]"
                flat
                color="primary"
                :label="method.texts.offline"
                @click="setOnline(method)"
              />
              <q-chip
                v-else
                :label="method.texts.online"
                color="green"
                text-color="white"
                dense
              />
            </div>
          </q-card>
        </q-list>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn label="Close" @click="onDialogHide" class="q-mr-md" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { MaskItem } from '../models/entity';
import { useVaultStore } from 'src/stores/vault';
import { computed } from 'vue';

const prop = defineProps<{
  item: MaskItem;
}>();

const store = useVaultStore();
const methods = computed(() => store.didMethods);
const doneMethods = computed(() => {
  return prop.item.methods.reduce(
    (acc, method) => {
      acc[method.name] = method.status === 'online' ? true : false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
});
const enabled = computed(() => {
  let o = prop.item.methods.reduce(
    (acc, method) => {
      acc[method.name] = method.status !== undefined ? true : false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
  methods.value.forEach((method) => {
    if (!o[method.prefix]) {
      o[method.prefix] = false;
    }
  });

  return o;
});
console.log(doneMethods);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOnline(method: any) {
  console.log(method);
}

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

import { useQuasar } from 'quasar';

const $q = useQuasar();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enable(method: any) {
  if (!enabled.value[method.prefix]) {
    $q.notify({
      type: 'negative',
      message: 'Turn off the mask DID is not allowed.',
      position: 'top',
    });
    return;
  }
  // TODO: Enable logic here
}
</script>
