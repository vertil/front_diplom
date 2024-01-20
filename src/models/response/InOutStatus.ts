export interface InOutStatusObj {
  time: string;
  cam_id: number;
  per_id: number;
}

export interface InOutStatusResponse {
  [index: number]: InOutStatusObj[];
}
