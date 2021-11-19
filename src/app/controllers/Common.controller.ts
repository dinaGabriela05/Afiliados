import { Request, Response } from "express";
import { Service } from "typedi";
import CommonService from "../services/common/Common.service";

@Service()
export default class CommonController {
  constructor(private commonService: CommonService) {}

  public health = async (req: Request, res: Response) => {
    const health: boolean = await this.commonService.health();
    res.status(200).send(health);
  };
}
