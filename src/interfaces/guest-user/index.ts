import { PollInterface } from 'interfaces/poll';
import { GetQueryInterface } from 'interfaces';

export interface GuestUserInterface {
  id?: string;
  username: string;
  password: string;
  poll_id?: string;
  created_at?: any;
  updated_at?: any;

  poll?: PollInterface;
  _count?: {};
}

export interface GuestUserGetQueryInterface extends GetQueryInterface {
  id?: string;
  username?: string;
  password?: string;
  poll_id?: string;
}
