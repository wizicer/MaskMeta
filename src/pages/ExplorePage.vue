<template>
  <q-page class="row">
    <q-list bordered separator class="full-width" style="max-width: 600px">
      <template v-for="(items, catekey) in itemCategories" :key="catekey">
        <q-item>
          <q-item-section>
            <q-item-label>
              <h6 class="q-my-xs">
                <q-icon :name="categories[catekey].icon" class="q-mr-sm" />
                {{ categories[catekey].name }}
              </h6>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card
          v-for="(item, i) in items"
          :key="i"
          flat
          class="q-ma-md card_with_background"
        >
          <q-card-section class="row items-center">
            <div class="col-3 text-center">
              <div class="relative-position">
                <q-avatar size="64px">
                  <img src="../assets/issuer.jpg" alt="Avatar" />
                </q-avatar>
                <div class="text-black text-center">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="col-9">
              <div class="row justify-between items-start">
                <div>
                  <div class="text-h6">{{ item.name }}</div>
                </div>
                <div>
                  <q-chip
                    dense
                    outline
                    color="secondary"
                    text-color="primary"
                    class="q-ml-sm"
                    :icon="categories[catekey].icon"
                  >
                    {{ categories[catekey].name }}
                  </q-chip>
                </div>
              </div>
              <div class="text-body2 text-grey-7">
                {{ item.description }}
              </div>

              <div>
                Issuer:
                <q-badge color="primary">
                  {{ issuers[item.issuer].title }}
                </q-badge>
              </div>
              <q-btn
                v-if="item.available"
                label="Get Proof Now"
                color="primary"
                class="q-mt-md"
                @click="getProof(item)"
              />
              <q-btn
                v-else
                label="Coming soon"
                outline
                color="grey"
                disable
                class="q-mt-md"
              />
            </div>
          </q-card-section>
        </q-card>
      </template>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { CredentialCategory, CredentialItem, Issuer } from 'src/models/entity';
import { useVaultStore } from 'src/stores/vault';
import { computed } from 'vue';
import { Dialog } from 'quasar';
import IssueProofDialog from 'components/IssueProofDialog.vue';

const store = useVaultStore();

const categories = computed(() => {
  const categoriesDict = store.credentialIssuers.categories.reduce(
    (acc, category) => {
      acc[category.name] = category;
      return acc;
    },
    {} as Record<string, CredentialCategory>,
  );
  return categoriesDict;
});

const issuers = computed(() => {
  const issuersDict = store.credentialIssuers.issuers.reduce(
    (acc, issuer) => {
      acc[issuer.name] = issuer;
      return acc;
    },
    {} as Record<string, Issuer>,
  );
  return issuersDict;
});
const itemCategories = computed(() => {
  return store.credentialIssuers.items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CredentialItem[]>,
  );
});

function getProof(item: CredentialItem) {
  Dialog.create({
    component: IssueProofDialog,
    // item.name == 'zkTwitter'
    //   ? import('src/components/IssueProofDialog.vue')
    //   : import('src/components/IssueProofDialog.vue'),

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
</script>

<style lang="scss" scoped>
.card_with_background {
  background-color: $brown-1;
  border-radius: 10px;
}
</style>
