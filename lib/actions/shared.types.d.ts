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

export interface Resource {
  name: string;
  link: string;
}

export interface PostParams {
  _id: string;
  title: string;
  createType: string;
  tags: string[];
  description: string;
  checkList: string[];
  content: string;
  resources: Resource[];
  code?: string;
  __v: number;
}
