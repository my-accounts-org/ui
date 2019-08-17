export class UnitModel {
  id: number;
  type: number;
  name: string;
  symbol: string;
  decimalPlaces: number;
  firstUnit: UnitModel;
  secondUnit: UnitModel;
  conversion: number;
  config: number;
}
