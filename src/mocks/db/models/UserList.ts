export const UserList = {
  content: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    email: `user${i + 1}@wisebirds.ai`,
    name: `사용자${i + 1}`,
    last_login_at: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString(),
  })),
  size: 25,
  total_elements: 100,
  total_pages: 4,
};
