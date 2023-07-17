interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Guest User'],
  tenantRoles: ['Content Creator', 'Editor', 'Administrator'],
  tenantName: 'Organization',
  applicationName: 'English Vocabulary App',
  addOns: ['notifications', 'chat'],
};
