interface UserInfo {
  id: number;
  email: string;
  name: string;
  company: {
    id: number;
    name: string;
  };
}
interface UserListItem {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
}
