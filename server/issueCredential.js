const userEmail = "liudi404637575@gmail.com"; // Replace with recipient email
const templateId = "6137fddc-b86e-4a0c-98f2-3e19910a1f5c"; // Replace with ID from previous step
const myApiKey = "sk_staging_9oFsC5gonBStbyGq5tQYWPqsBdEo6PfZgcYRRj9ddoNCJzSUqYsvrh8HCDgfTvPkDiyYyJ25ELqhvQcFRR37djjGxpxWtsetqcGaxQnTencF7n6aS5VVgHjtL8u5vq64WpSJGpa4NX5MDkrkfHHyQ4PEgCsh9jULGbtbQrqGtAEEavacswbAyyBksGMCxMt1hGxMK5AC7bmeqVkoPCeg3EHs"; // Replace with key from step 2

const credentialParams = {
    recipient: `email:${userEmail}:polygon-amoy`,
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

fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options)
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .catch((err) => console.error(err));
