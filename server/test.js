const { create } = require("@arcblock/vc");
const { fromRandom, fromSecretKey, fromAddress } = require("@ocap/wallet");

// the verifiable credential issuer,
// in real word applications, you should replace fromRandom with fromSecretKey
// const issuer = fromSecretKey(process.env.VC_ISSUER_SK);
const issuer = fromRandom();

// the verifiable credential holder
// in real word applications, you should replace fromRandom with fromAddress
// const holder = fromAddress(process.env.ENV_HOLDER);
const holder = fromRandom();

const vc = create({
  type: "CourseCertificate",
  issuer: {
    name: "Online Course Platform",
    wallet: issuer,
  },
  subject: {
    // the only required field in subject, the id of the holder
    id: holder.address,
    // other fields can be customized
    completed: {
      course: "Developer Training Program",
    },
  },
});

console.log(vc);