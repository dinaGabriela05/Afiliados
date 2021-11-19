import { Service } from "typedi";

@Service()
export default class CommonService {
  async health() {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
