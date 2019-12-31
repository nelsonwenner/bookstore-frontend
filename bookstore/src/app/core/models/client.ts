import { Address } from './address';

export class Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_staff: boolean;
  address: Address | null;
}
