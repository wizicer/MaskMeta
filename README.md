# MaskMeta

MaskMeta is an abstracted DID wallet, enabling users to manage their decentralized identities (DIDs) and verifiable credentials (VCs) with greater flexibility and ease.

The name pays homage to MetaMask, and MaskMeta itself combines two key concepts:

- **Mask**: An abstraction that unifies various DIDs across different ecosystems, such as TBD DID and ARC DID, providing a single, cohesive identity. This unified identity simplifies managing and recognizing an individual across multiple platforms.
- **Meta**: Originally another term for VC, we expand "Meta" to encompass any data that can be encapsulated within it, such as links, texts, images, email, and more.

In addition to these two core ideas, we introduce new terminology:

- **Online Status**: This indicates whether a Mask, Meta, or the link between them is online or offline. This supports scenarios where a Meta (VC) is issued offline and later published online.
- **Criteria-Based Meta (VC)**: Using Zero-Knowledge Proofs (ZKP), users can prove they meet certain criteria without disclosing the full Meta (VC).
- **ZKP Issuer**: A Meta (VC) can be issued without relying on trusted third parties by leveraging ZKP. For instance, a user can prove ownership of a Twitter account or email address without involving a trusted party.

## Inspiration

Our dissatisfaction with existing DID wallets and the fragmented DID ecosystem, where multiple ecosystems mean separate DIDs, inspired us to create a more flexible and intuitive way to manage DIDs and VCs.

## What It Does

1. Introduces new terminology like Mask, Meta, Online Status, Criteria-Based Meta (VC), and ZKP Issuer.
2. Integrates issuer functionalities from TBD and Arcblock.
3. Supports DID sources like TBD, Pinata, and Arcblock.
4. Provides multiple storage options for Meta, including local offline storage and online storage, which can be uploaded to a server or stored via Pinata.
5. Offers visual representation in the Graph section, showing relationships between Meta (VC), Masks, and DIDs.
6. Allows users to present Meta (VC) in either a criteria-based (privacy-protected) or full-disclosure manner.

With these features, we envision four primary scenarios:

### Hospital Medical Record

1. A hospital issues a medical record Meta (VC) to a patient.
2. The patient can selectively link this Meta (VC) to one of their DIDs within Mask.
3. The patient can present this Meta (VC) to a doctor through a request (QR code) and response, without disclosing private information.

### Binding an Onchain Address

1. A user can bind an onchain address to one of their DIDs in Mask.
2. All Meta (VC) and Mask data can be published online.
3. Cross-chain explorers can display the user’s total balance and NFTs by aggregating all relevant address balances and NFTs under the user's Mask.

### ZKP Issuer

1. Users can issue a Meta (VC) independently, without relying on trusted parties, such as proving ownership of a Twitter account or email.
2. Users can present this Meta (VC) to verifiers with an associated Groth16 proof.

### Onchain Games

1. The DID within Mask serves as a game account, with Meta (VC) verifying ownership of an NFT.
2. NFT ownership can be linked to a DID within Mask and published online.
3. The game verifies the NFT ownership and issues the corresponding in-game item.
4. If ownership Meta expires or is revoked, the in-game item can also be revoked.

## How We Built It

### Backend

- Built using Node.js and Express, integrating Web5 (TBD), Arcblock, and Pinata SDKs.

### Frontend

1. Created with Quasar and Vue.js 3.
2. Integrated Web5 (TBD) and Arcblock SDKs for client-side self-issuance.
3. Used vis-network for graph visualization.
4. Integrated vue-qrcode-reader for QR code scanning.
5. Used qrcode.vue for QR code generation.
6. Utilized @scure/base for base58 DID generation.

## Challenges We Encountered

Our biggest challenge was determining our unique contribution to the DID ecosystem. We researched extensively on DIDs and VCs, learning how W3C defines these concepts and how different ecosystems implement them. Initially, we planned to create a visualization/builder for proving circuits but found existing DID wallets didn’t meet our expectations. These wallets are often tightly integrated with specific service providers, limiting flexibility.

Inspired by MetaMask's self-custody design, we created MaskMeta as a more versatile and intuitive DID wallet.

Defining and representing our new concepts for user-friendly application also posed challenges.

## Accomplishments We Are Proud Of

We successfully created a more generalized DID wallet, introducing the concepts of Meta and Mask to promote broader adoption of DIDs/VCs among everyday users.

## What We Learned

1. Deepened our understanding of DIDs/VCs.
2. Gained experience with SDKs from TBD, Crossmint, and Arcblock for VC issuance and learned how to use Pinata for online storage.

## What's Next for MaskMeta

### Short Term

1. Integrate additional DID/VC solutions.
2. Implement dApps that consume Meta (VC) with full or ZKP-based privacy disclosure.
3. Allow Meta (VC) to connect to any DID.

### Long Term

We plan to integrate MaskMeta’s core features into our existing wallet product, which manages cryptocurrency assets and NFTs in a self-custody way. 

# Development

## Install the dependencies

```bash
yarn
cd server && yarn
```

## Start the app in development mode
```bash
yarn dev
```

## Build the app for production
```bash
yarn build
```
