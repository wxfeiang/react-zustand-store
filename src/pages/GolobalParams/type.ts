interface DataType {
  key: string;
  name: string;
  value: string;
  position: 'Header' | 'Body' | 'Query';
  status: boolean;
}

export type { DataType };