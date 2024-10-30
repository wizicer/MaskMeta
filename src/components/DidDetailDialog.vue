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
        <div class="row items-center q-mt-md">
          <q-icon name="cloud" size="2.5em" class="q-mr-md" />
          <div>
            <q-item-label class="text-h6">Methods</q-item-label>
          </div>
          <q-space />
          <q-btn flat round dense icon="add" />
        </div>
        <q-separator class="q-mt-md" />
        <q-list>
          <q-item v-for="(method, index) in item.methods" :key="index">
            <q-item-section>
              <q-item-label>{{ method.name }}</q-item-label>
              <q-item-label caption>{{ method.status }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="method.status === 'offline'" side>
              <q-btn flat round dense icon="link" @click="setOnline(method)" />
            </q-item-section>
          </q-item>
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

defineProps<{
  item: MaskItem;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOnline(method: any) {
  console.log(method);
}

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>
