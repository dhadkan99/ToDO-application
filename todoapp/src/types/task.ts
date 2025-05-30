export interface Task {
  _id: string;
  text: string;
  date: string;
  completed: boolean;
  description?: string;
}
