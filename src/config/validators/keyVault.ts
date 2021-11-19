import { ChainedTokenCredential, ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export const keyVault = async (secretList: any) => {

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

};
