import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccountsConstants {
  public COMPANY_CREATE = 'Company created';
  public COMPANY_DELETED = 'Company deleted';
  public LEDGER_CREATED = 'Ledger created';
  public SUCCESS_MESSAGE = 'SUCCESS';
  public FAILUR_MESSAGE = 'FAILED';
  public SET_AS_DEFAULT = 'set as default';
}
