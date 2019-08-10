export class UnitModel {
  id: number;
  type: number;
  name: string;
  decimalPlaces: number;
  firstUnit: UnitModel;
  secondUnit: UnitModel;
  conversion: number;
}
