import express from 'express';
import bodyParser from 'body-parser';
import { create as createVC } from '@arcblock/vc';
import { fromRandom, fromSecretKey, fromAddress } from '@ocap/wallet';
import { VerifiableCredential } from "@web5/credentials";
import { DidJwk } from '@web5/dids'


const app = express();

app.use(express.json());

const issuer = fromRandom();
const holder = fromRandom();


app.post('/request_vc_arcblock', async (req, res) => {
    try {
        const { subjectId } = req.body;


        holder.address = subjectId;

        const vc = create({
            type: "CourseCertificate",
            issuer: {
                name: "Online Course Platform",
                wallet: issuer,
            },
            subject: {
                id: holder.address,
                completed: {
                    course: "Developer Training Program",
                },
            },
        });


        res.json(vc);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.post('/request_vc_crossmint', async (req, res) => {
    try {
        const { email } = req.body;

        const templateId = "6137fddc-b86e-4a0c-98f2-3e19910a1f5c"; // Replace with ID from previous step
        const myApiKey = process.env.CROSSMINT_API_KEY || "sk_staging_9oFsC5gonBStbyGq5tQYWPqsBdEo6PfZgcYRRj9ddoNCJzSUqYsvrh8HCDgfTvPkDiyYyJ25ELqhvQcFRR37djjGxpxWtsetqcGaxQnTencF7n6aS5VVgHjtL8u5vq64WpSJGpa4NX5MDkrkfHHyQ4PEgCsh9jULGbtbQrqGtAEEavacswbAyyBksGMCxMt1hGxMK5AC7bmeqVkoPCeg3EHs"; // Replace with key from step 2

        const credentialParams = {
            recipient: `email:${email}:polygon-amoy`,
            credential: {
                // The courseCompletionQuickstart credential type requires course and grade declarations
                subject: {
                    course: "Blockchain 101",
                    grade: "A",
                },
                expiresAt: "2034-02-02",
            },
        };

        const options = {
            method: "POST",
            headers: {
                "X-API-KEY": myApiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentialParams),
        };

        // 发起请求
        const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to request credential');
        }

        res.status(200).send(data);
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
        //DID string
        const employer_did = employer_didJwk.uri;

        const {employee_did} = req.body;

        const vc = await VerifiableCredential.create({
            type: 'EmploymentCredential',
            issuer: employer_did,
            subject: employee_did,
            expirationDate: '2023-09-30T12:34:56Z',
            data: {
              "position": "Software Developer",
              "startDate": "2023-04-01T12:34:56Z",
              "employmentStatus": "Contractor"
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