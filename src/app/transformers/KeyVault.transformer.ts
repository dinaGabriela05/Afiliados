import { Service } from "typedi";

@Service()
export default class KeyVaultTransformador {
  public transformador = (keyVault: any) => {
    return {
      keyChekex: keyVault.keyChekex,
      keyCheqscan: keyVault.KeyCheqscann,
    
      
    };
  };

  public selectorTransformador = (keyVault: any) => {
    const transformedActivity = {
      keyChekex: keyVault.keyChekex,
      keyCheqscan: keyVault.KeyCheqscann
    };
    return transformedActivity;
  };
}
