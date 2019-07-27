import {CompanyModel} from './company.model';

export class UserModel {
    email: string;
    password: string;
    company: CompanyModel;
}
