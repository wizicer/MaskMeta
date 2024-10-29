const myApiKey = "sk_staging_9oFsC5gonBStbyGq5tQYWPqsBdEo6PfZgcYRRj9ddoNCJzSUqYsvrh8HCDgfTvPkDiyYyJ25ELqhvQcFRR37djjGxpxWtsetqcGaxQnTencF7n6aS5VVgHjtL8u5vq64WpSJGpa4NX5MDkrkfHHyQ4PEgCsh9jULGbtbQrqGtAEEavacswbAyyBksGMCxMt1hGxMK5AC7bmeqVkoPCeg3EHs"; // Replace with key from step 2

const templateParams = {
    credentials: {
        // "type" is set to an example type already created by Crossmint for this quickstart
        type: "crossmint:5fe6040e-07a1-48bb-97a3-b588a7e927d2:courseCompletionQuickstart",
        encryption: "none",
        storage: "crossmint",
    },
    metadata: {
        name: "Satoshi University Credentials",
        description: "Credentials accredited by Satoshi University",
        imageUrl: "https://picsum.photos/400",
    },
    chain: "polygon-amoy",
};

const options = {
    method: "POST",
    headers: {
        "X-API-KEY": myApiKey,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(templateParams),
};

fetch("https://staging.crossmint.com/api/v1-alpha1/credentials/templates/", options)
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .catch((err) => console.error(err));
