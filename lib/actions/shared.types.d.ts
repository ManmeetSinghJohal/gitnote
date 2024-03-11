

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CreatePostParams {
  title: string;
  createType: string;
  tags: string[];
  description: string;
  learned: object[];
  content: string;
  resources: object[];
}
