const myApiKey = "sk_staging_9oFsC5gonBStbyGq5tQYWPqsBdEo6PfZgcYRRj9ddoNCJzSUqYsvrh8HCDgfTvPkDiyYyJ25ELqhvQcFRR37djjGxpxWtsetqcGaxQnTencF7n6aS5VVgHjtL8u5vq64WpSJGpa4NX5MDkrkfHHyQ4PEgCsh9jULGbtbQrqGtAEEavacswbAyyBksGMCxMt1hGxMK5AC7bmeqVkoPCeg3EHs"; // Replace with key from step 2
const credentialId = "urn:uuid:1fd84f88-89df-46c4-943a-92a91eceea1c";
const options = {
    method: "GET",
    headers: {
        "X-API-KEY": myApiKey,
    },
};

fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/${credentialId}`, options)
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .catch((err) => console.error(err));
