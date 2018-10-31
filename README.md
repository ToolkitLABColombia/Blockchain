# Toolkit API

## Environment
For this project to work there must be a `.env` file with the following content, all the data must be provided by whoever is using it:
```
contractAddress=0x6162c82b4ae5108a464425caee41a5cd29f81f6e
mnemonic=d7b34edc31aeeb66a4b7356c6270034e397a1bb9e8641f7b2c584ad9699bb12b
account=0xd01f1c5af9648378288839d59d6f09b8c6109130
host=http://localhost:8545
pin=true
```

1. `contractAddress`: The address where the contract was deployed.
1. `mnemonic`: The private key of the signing account (the owner of the account must provide this information)
1. `account`: The signing account address
1. `host`: The blockchain access point node endpoint address (it must include port and API key if needed)
1. `pin`: Optional. If present, must be set to `true`. Indicates whether or not the uploaded file is pinned into the IPFS network.

## Container
This project has been dockerized. To run you must have [Docker installed](https://docs.docker.com/install/), as well as [docker-compose](https://docs.docker.com/compose/install/).

You must have your user added into the docker users group, so you can run the following commands, otherwise, you will have to precede the command `sudo`.

```bash
docker-compose up
```

## Postman
This project has a postman environment, so all the request are done against `BasePath`. There is also a collection using this environment name. You can import them from the `postman` folder.