interface InfoItem {
  __typename: string;
  cellCount: number;
  copyright: string;
  email: string;
  fee: string;
  userCount: number;
}

export interface InfoData {
  info: InfoItem;
}


