<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">
          <q-icon name="fingerprint" class="q-mr-sm" />
          {{ item.name }}
        </div>
        <q-space />
        <q-btn flat round dense icon="close" @click="onCloseClick" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-mx-md">
        <div class="text-grey">{{ item.description }}</div>
      </q-card-section>
      <q-card-section class="row items-center q-mx-md">
        Issuer:
        <q-badge color="primary">
          {{ issuers[item.issuer].title }}
        </q-badge>
        <q-space />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <template v-if="item.name === 'zkTwitter'">
          <q-file
            v-model="file"
            label="Upload email .eml file"
            accept=".eml"
            outlined
            clearable
          />
        </template>
        <template v-else-if="item.name === 'Medical Report'">
          <q-input v-model="patientId" label="Patient ID" outlined clearable />
          <q-input v-model="reportId" label="Report ID" outlined clearable />
        </template>
        <template v-else-if="item.name === 'Address'">
          <q-input v-model="address" label="Address" outlined clearable />
        </template>
        <template v-else-if="item.name === 'Text'">
          <q-input v-model="text" label="Text" outlined clearable />
        </template>
        <template v-else-if="item.name === 'Image'">
          <q-file
            v-model="imageFile"
            label="Upload Image"
            accept="image/*"
            outlined
            clearable
          />
        </template>

        <q-select
          v-if="maskOptions.length > 0"
          v-model="mask"
          :options="maskOptions"
          label="Mask selection"
          outlined
          clearable
          class="q-mt-md"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.title }}</q-item-label>
                <q-item-label caption>
                  {{ scope.opt.description }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-item-label>{{ scope.opt.title }}</q-item-label>
          </template>
        </q-select>
        <q-select
          v-if="methodOptions.length > 0"
          v-model="method"
          :options="methodOptions"
          label="Method selection"
          outlined
          clearable
          class="q-mt-md"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.title }}</q-item-label>
                <q-item-label caption>
                  {{ scope.opt.description }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-item-label>{{ scope.opt.title }}</q-item-label>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="secondary" label="Prove" @click="onOkClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { Notify, useDialogPluginComponent } from 'quasar';
import { CredentialItem, MaskItem, DIDMethod } from '../models/entity';
import { useVaultStore } from 'src/stores/vault';
import { create } from '@arcblock/vc';
// import { fromSecretKey } from '@ocap/wallet';
import { fromRandom } from '@ocap/wallet';
import { DidJwk } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';

const store = useVaultStore();

const patientId = ref('');
const reportId = ref('');
const address = ref('');
const text = ref('');
const imageFile = ref<File | null>(null);
const method: Ref<DIDMethod | null> = ref(null);

// Define a computed property for maskOptions
const maskOptions = computed(() => store.maskItems);
const mask: Ref<MaskItem | null> = ref(null);

// Define a computed property for methodOptions that filters based on the selected mask
const methodOptions = computed(() => {
  if (!mask.value) return [];
  return store.didMethods.filter((method) =>
    mask.value.methods.some((_) => _.name == method.prefix),
  );
});

const issuers = computed(() => store.issuerDict);

const file = ref<File | null>(null);

const prop = defineProps<{
  item: CredentialItem;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

function onCloseClick() {
  onDialogHide();
}

async function onOkClick() {
  const selectedMethod = mask.value?.methods.find(
    (m) => m.name === method.value?.prefix,
  );

  if (prop.item.name === 'Text') {
    // const issuer = fromSecretKey(mask.value.privateKey);
    const issuer = fromRandom();
    const holder = fromRandom();
    const vc = create({
      type: 'SelfSignedText',
      issuer: {
        name: 'Self-' + mask.value?.title,
        wallet: issuer,
      },
      subject: {
        // id: method.value.did,
        id: holder.address,
        text: text.value,
      },
      issuanceDate: new Date(Date.now()),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      endpoint: '',
      endpointScope: '',
    });

    store.newMetaItem({
      id: -1,
      title: 'Self-Signed Text',
      description: 'A self-signed text credential',
      date: new Date().toISOString(),
      icon: 'fingerprint',
      verified: true,
      payload: JSON.stringify(vc),
      issuer: 'self_arc',
      status: 'offline',
      fields: {
        text: text.value,
      },
      did: selectedMethod.did,
    });

    showMetaAdded();
  } else if (prop.item.name === 'Address') {
    const did = await DidJwk.import({
      portableDid: JSON.parse(selectedMethod.document),
    });

    const vc = await VerifiableCredential.create({
      type: 'AddressCredential',
      issuer: 'Self-' + mask.value?.title,
      subject: selectedMethod.did,
      issuanceDate: toXmlDateTime(new Date(Date.now())),
      expirationDate: toXmlDateTime(
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      ),
      data: {
        address: address.value,
      },
    });
    const svc = await vc.sign({ did });

    store.newMetaItem({
      id: -1,
      title: 'Self-Signed Address: ' + address.value,
      description: 'A self-signed Address credential',
      date: new Date().toISOString(),
      icon: 'rtt',
      verified: true,
      payload: JSON.stringify(svc),
      issuer: 'self_tbd',
      status: 'offline',
      fields: {
        address: address.value,
      },
      did: selectedMethod.did,
    });

    showMetaAdded();
  } else if (prop.item.name === 'Medical Report') {
    const rdid = selectedMethod.did.slice('did:arc:'.length);
    const response = await fetch('http://localhost:3000/request_vc_arcblock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId: patientId.value,
        reportId: reportId.value,
        recipientDid: rdid,
      }),
    });

    if (!response.ok) {
      Notify.create({
        type: 'negative',
        message: 'Failed to fetch medical report',
      });
      return;
    }

    const reportData = await response.json();

    console.log('reportData', reportData);
    store.newMetaItem({
      id: -1,
      title: 'Medical Report',
      description: 'A medical report credential',
      date: new Date().toISOString(),
      icon: 'local_hospital',
      verified: true,
      payload: JSON.stringify(reportData),
      issuer: 'hospital_api',
      status: 'online',
      fields: {
        patientId: patientId.value,
        reportId: reportId.value,
        dateOfBirth: reportData.credentialSubject.patientInfo.dateOfBirth,
        fullName: reportData.credentialSubject.patientInfo.fullName,
        bloodPressure: reportData.credentialSubject.vitalSigns.bloodPressure,
        heartRate: reportData.credentialSubject.vitalSigns.heartRate,
      },
      did: selectedMethod.did,
    });

    showMetaAdded();
  }

  onDialogOK();
}

function showMetaAdded() {
  Notify.create({
    type: 'positive',
    message: 'Meta added successfully!',
    position: 'top',
    timeout: 2500,
  });
}

function toXmlDateTime(date: Date): string {
  // Helper function to pad single digits with a leading zero
  const pad = (num: number) => String(num).padStart(2, '0');

  // Extract date components
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // Months are zero-based
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  // Construct the XML Schema xs:dateTime string
  const xmlDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return xmlDateTime;
}
</script>
