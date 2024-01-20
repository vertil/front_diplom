export interface CabinetsStatusResponse {
  dep_id: number;
  id: number;
  name: string;
  floor: number;
}

export interface CabinetsStatusPersonIdsResponse {
  [key: string]: number[];
}
