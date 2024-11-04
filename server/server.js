import express from 'express';
// import bodyParser from 'body-parser';
import { create } from '@arcblock/vc';
// import { fromRandom, fromSecretKey, fromAddress } from '@ocap/wallet';
import { fromRandom } from '@ocap/wallet';
import { VerifiableCredential } from '@web5/credentials';
import { DidJwk } from '@web5/dids';
import { fileURLToPath } from 'url';
import { isValid } from '@arcblock/did';
import { PinataSDK } from 'pinata';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const issuer = fromRandom();
const holder = fromRandom();

app.post('/request_vc_arcblock', async (req, res) => {
  try {
    const { reportId, patientId, recipientDid } = req.body;
    if (!isValid(recipientDid) && recipientDid !== undefined) {
      console.error('Invalid recipient DID', recipientDid);
      return res.status(400).send({ error: 'Invalid recipient DID' });
    }
    const vc = create({
      type: 'MedicalReport',
      issuer: {
        name: 'Good Hospital',
        wallet: issuer,
      },
      subject: {
        id: recipientDid || holder.address, //这个地方是required，这里使用random holder填充
        reportId,
        patientInfo: {
          patientId,
          fullName: 'Bob',
          dateOfBirth: '1998',
        },
        vitalSigns: {
          bloodPressure: '100',
          heartRate: '100',
        },
      },
    });

    res.json(vc);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

//tbd
app.post('/request_vc_tbd', async (req, res) => {
  try {
    //Creates a DID using the did:jwk method
    const employer_didJwk = await DidJwk.create();

    const { reportId, patientId, recipientDid } = req.body;

    const vc = await VerifiableCredential.create({
      type: 'EmploymentCredential',
      issuer: '1',
      subject: '1',
      expirationDate: '2023-09-30T12:34:56Z',
      data: {
        position: 'Software Developer',
        startDate: '2023-04-01T12:34:56Z',
        employmentStatus: 'Contractor',
        id: recipientDid || '',
        reportId,
        patientInfo: {
          patientId,
          fullName: 'Bob',
          dateOfBirth: '1998',
        },
        vitalSigns: {
          bloodPressure: '100',
          heartRate: '100',
        },
      },
    });
    const vc_jwt_employment = await vc.sign({ did: employer_didJwk });
    res.json(vc_jwt_employment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/vc_upload_server', async (req, res) => {
  try {
    const { vc } = req.body;
    // Define the file path
    const filePath = path.join(__dirname, 'vc.json');

    // Write the VC to a file
    fs.writeFileSync(filePath, JSON.stringify(vc, null, 2));

    res.json({ message: 'VC stored locally', path: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/vc_upload_pinata', async (req, res) => {
  try {
    const { vc } = req.body;
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
      pinataGateway: 'example-gateway.mypinata.cloud',
    });
    const upload = await pinata.upload.json(vc);

    res.json(upload);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// app.post('/request_vc_crossmint', async (req, res) => {
//     try {
//         const { email } = req.body;

//         const templateId = "6137fddc-b86e-4a0c-98f2-3e19910a1f5c"; // Replace with ID from previous step
//         const myApiKey = process.env.CROSSMINT_API_KEY || "sk_staging_9oFsC5gonBStbyGq5tQYWPqsBdEo6PfZgcYRRj9ddoNCJzSUqYsvrh8HCDgfTvPkDiyYyJ25ELqhvQcFRR37djjGxpxWtsetqcGaxQnTencF7n6aS5VVgHjtL8u5vq64WpSJGpa4NX5MDkrkfHHyQ4PEgCsh9jULGbtbQrqGtAEEavacswbAyyBksGMCxMt1hGxMK5AC7bmeqVkoPCeg3EHs"; // Replace with key from step 2

//         const credentialParams = {
//             recipient: `email:${email}:polygon-amoy`,
//             credential: {
//                 // The courseCompletionQuickstart credential type requires course and grade declarations
//                 subject: {
//                     course: "Blockchain 101",
//                     grade: "A",
//                 },
//                 expiresAt: "2034-02-02",
//             },
//         };

//         const options = {
//             method: "POST",
//             headers: {
//                 "X-API-KEY": myApiKey,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(credentialParams),
//         };

//         // 发起请求
//         const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options);
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || 'Failed to request credential');
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
