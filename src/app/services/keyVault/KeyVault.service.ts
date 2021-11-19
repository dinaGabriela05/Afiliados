import { Inject, Service } from "typedi";
import { ChainedTokenCredential, ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

@Service()
export default class KeyVaultServicio {


  // async keyVault() {

  //   try {
  //     const KVUri = "https://vaultchekex.vault.azure.net";

  //     const credential = new DefaultAzureCredential();
  //     const client = new SecretClient(KVUri, credential);

  //     // const secretName = "KeyChekex";

  //     // const retrievedSecret = await client.getSecret(secretName);

  //     // return retrievedSecret;
  //     const secretList=["keyChekex"]

  //     let model = {}
  //     for (const secret of secretList) {
  //       const value = await client.getSecret(secret)
  //       model[secret] = value.value || null
  //     }
  //     return model


  //   }
  //   catch (e) {
  //     return null

  //   }


  // }



  async getVault(secretList: any) {
    try {
      const KVUri = "https://vaultchekex.vault.azure.net";
      const tenantId = process.env.tenantId as string;
      const clientId=process.env.clientId as string;
      const clientSecret=process.env.clientSecret as string;
      const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
      const secondCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
      const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
    
      const client = new SecretClient(KVUri, credentialChain)
      let model: any = {}
      for (const secret of secretList) {
        const value = await client.getSecret(secret)
        model[secret] = value.value || null
      }
      return model
    } catch (e) {
      
      return null
    }
  }
}




