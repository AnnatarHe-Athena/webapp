/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum venusSource {
  douban = "douban",
  instgream = "instgream",
  jike = "jike",
  red = "red",
  unknown = "unknown",
  weibo = "weibo",
  zhihu = "zhihu",
}

export interface CellInput {
  readonly img: string;
  readonly text: string;
  readonly cate: number;
  readonly permission: number;
  readonly fromID: string;
  readonly fromURL: string;
}

export interface Device {
  readonly os: string;
  readonly version: string;
  readonly appVersion: string;
  readonly id: string;
  readonly lang: string;
}

export interface Pagination {
  readonly lastID: number;
  readonly limit: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
