export interface AuthUserType {
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string | null;
    createdAt?: string;
  };
}
