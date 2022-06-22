export interface Task {
  id: number;
  author: string;
  description: string;
  shouldNotify: boolean;
  date: Date;
  title: string;
}
