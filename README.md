# Toolkit API

For this project to work there must be a `.env` file with the following content:

```
contractAddress=0x6162c82b4ae5108a464421caee41a5cd29f81f6e
mnemonic=d7b34edc31aeeb66a4b7356c627004de397a1bb9e8641f7b2c584ad9699bb12b
account=0xd01f1c5af9648378288839d59d6ff0b8c6109130
host=http://localhost:8545
pin=true
```

1. `contractAddress`: The address where the contract was deployed.
1. `mnemonic`: The private key of the signing account (the owner of the account must provide this information)
1. `account`: The signing account address
1. `host`: The blockchain access point node endpoint address (it must include port and API key if needed)
1. `pin`: Optional. If present, must be set to `true`. Indicates whether or not the uploaded file is pinned into the IPFS network.
