export interface Task {
  id: number;
  description: string;
  shouldNotify: boolean;
  date: Date;
  title: string;
  image?: string;
}
