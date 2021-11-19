export default class GlobalRepository {
  async exists(
    table: string,
    field: string,
    value: string | number,
    customField: string | null = null,
    customCondition: string | null = null
  ) {
    // const additionalQuery = customCondition ? ` AND ${customCondition}` : "";
    try {
      // const records = await this.manager.query(
      // `SELECT * FROM ${table} WHERE ${snakeCasedField} = '${value}' ${additionalQuery}`
      // );
      // return !!records && !!records.length;
    } catch (error) {
      return false;
    }
  }
}
