import { Service } from "typedi";

@Service()
export default class TokenTransformador {
  public transformador = (token: any) => {
    return {
      token: token.id
    };
  };
}
