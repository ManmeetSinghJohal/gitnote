

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CheckListItem {
  step_lesson: string;
}

export interface CreatePostParams {
  title: string;
  createType: string;
  tags: string[];
  description: string;
  checkList: CheckListItem[];
  code: string;
  content: string;
  resources: object[];
}
