export type CellItem = {
  id: string;
  src: string;
  desc: string;
  fromURL: string;
  fromID: string;
  content: string;
  img: string;
  text: string;
};

export type TCellsResponse = {
  girls: CellItem[]
}
