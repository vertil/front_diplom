export interface Department {
  name: string;
  id: number;
}

export interface DepartmentsResponse {
  [index: number]: Department[];
}
