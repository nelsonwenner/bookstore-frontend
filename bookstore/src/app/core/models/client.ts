import { CreditCard } from './creditcard';
import { Address } from './address';

export class Client {
  id: number;
  url: string;
  name: string;
  email: string;
  phone: string;
  is_staff: boolean;
  credit_card: CreditCard | null;
  address: Address | null;
}
