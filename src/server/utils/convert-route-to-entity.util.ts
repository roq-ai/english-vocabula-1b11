const mapping: Record<string, string> = {
  'guest-users': 'guest_user',
  organizations: 'organization',
  polls: 'poll',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
