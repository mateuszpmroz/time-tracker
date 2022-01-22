export interface TaskWithoutGeneratedParameters {
  name: string;
}

export interface Task extends TaskWithoutGeneratedParameters {
  id: string;
  createdOnTimestamp: number;
  startTimestamp: number;
  spendTimeInSeconds: number;
}

export interface LabeledTasks {
  title: string;
  data: Task[];
}
