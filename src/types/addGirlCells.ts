/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CellInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addGirlCells
// ====================================================

export interface addGirlCells_addGirls {
  __typename: "Girl";
  id: string;
  img: string;
  content: string;
  text: string;
  permission: number;
  fromID: string;
  fromURL: string;
}

export interface addGirlCells {
  addGirls: addGirlCells_addGirls[];
}

export interface addGirlCellsVariables {
  cells: CellInput[];
}
