export interface Cameras {
  cab_id: number;
  id: number;
  pass_num: number;
  cam_model: string;
  addr: string;
  in_pos: boolean;
  status: boolean;
}

export interface CamerasStatusResponse {
  [index: number]: Cameras[];
}
