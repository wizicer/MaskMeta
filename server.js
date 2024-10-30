import express from 'express';
import bodyParser from 'body-parser';
import { create} from '@arcblock/vc';
import { fromRandom, fromSecretKey, fromAddress } from '@ocap/wallet';
import { VerifiableCredential } from "@web5/credentials";
import { DidJwk } from '@web5/dids'
import { PinataSDK } from "pinata";

const app = express();

app.use(express.json());

const issuer = fromRandom();
const holder = fromRandom();


app.post('/request_vc_arcblock', async (req, res) => {
    try {
        const {reportId,patientId} = req.body; 
        const vc = create({
            type: "MedicalReport",
            issuer: {
                name: "Good Hospital",
                wallet: issuer,
            },
            subject: {
                id: holder.address,//这个地方是required，这里使用random holder填充
                reportId,
                patientInfo:{
                    patientId,
                    fullName:"Bob",
                    dateOfBirth:"1998"
                },
                vitalSigns:{
                    bloodPressure:"100",
                    heartRate:"100"
                }
            },
        });

        res.json(vc);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});


app.post('/vc_upload', async (req, res) => {
    try {
        const {vc} = req.body;
        const pinata = new PinataSDK({
            pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NzQ1NTczZS03ZDQ1LTQ0ZWEtOTdmMi1jYmFiYWE4ZjIzYTIiLCJlbWFpbCI6ImxpdWRpNDA0NjM3NTc1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODVmNTVmZWY5MWJmZTJmOTI5MSIsInNjb3BlZEtleVNlY3JldCI6IjlkOWYwZDBjZTdjMzkyZGE0Y2IwMTU0YTc4YjQyYjFiOWM2ZjVmYzFjOTk4MzBhOTA4Y2VkMzJkM2U0NGEzMzIiLCJleHAiOjE3NjE3OTI2MDJ9.UzYEtOAE1kFxISsqCxki5IVrLekDuv0avhN0pzYeTgE",
            pinataGateway: "example-gateway.mypinata.cloud",
        });
        const upload = await pinata.upload.json(vc)

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

//tbd
app.post('/request_vc_tbd', async (req, res) => {
    try {
        
        //Creates a DID using the did:jwk method
        const employer_didJwk = await DidJwk.create();

        const {reportId,patientId} = req.body; 

        const vc = await VerifiableCredential.create({
            type: 'EmploymentCredential',
            issuer: "1",
            subject: "1",
            expirationDate: '2023-09-30T12:34:56Z',
            data: {
              "position": "Software Developer",
              "startDate": "2023-04-01T12:34:56Z",
              "employmentStatus": "Contractor",
              reportId,
                patientInfo:{
                    patientId,
                    fullName:"Bob",
                    dateOfBirth:"1998"
                },
                vitalSigns:{
                    bloodPressure:"100",
                    heartRate:"100"
                }
            }
          });
        const vc_jwt_employment = await vc.sign({ did: employer_didJwk });
        res.json(vc_jwt_employment);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});