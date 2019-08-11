import {UnitModel} from './unit.model';

export class StockItemModel {
  id: number;
  config: number;
  name: string;
  under: number;
  unit: UnitModel;
  openingBalance: number;
  quantity: number;
  ratePerUnit: number;
  stockGroupUnderName: string;
}
