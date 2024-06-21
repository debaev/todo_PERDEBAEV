export interface AddUpdateTodoRequestDto {
  title: string,
  completed: boolean,
  user: number;
}

export interface TodoResponse {
  count: number;
  next: any | null;
  previous: any | null;
  results: TodoDto[];
}

export interface TodoDto {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user: number;
}
