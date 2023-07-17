import { GuestUserInterface } from 'interfaces/guest-user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PollInterface {
  id?: string;
  question: string;
  options: string;
  correct_option: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  guest_user?: GuestUserInterface[];
  organization?: OrganizationInterface;
  _count?: {
    guest_user?: number;
  };
}

export interface PollGetQueryInterface extends GetQueryInterface {
  id?: string;
  question?: string;
  options?: string;
  correct_option?: string;
  organization_id?: string;
}
