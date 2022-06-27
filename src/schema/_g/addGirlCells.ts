/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CellInput, venusSource } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addGirlCells
// ====================================================

export interface addGirlCells_addGirls_venus {
  readonly __typename: "Venus";
  readonly id: number;
  readonly uid: string;
  readonly source: venusSource;
  readonly name: string;
  readonly avatar: string;
  readonly bio: string;
  readonly remarks: string;
}

export interface addGirlCells_addGirls {
  readonly __typename: "Girl";
  readonly id: string;
  readonly img: string;
  readonly content: string;
  readonly text: string;
  readonly permission: number;
  readonly fromID: string;
  readonly fromURL: string;
  readonly isCollected: boolean;
  readonly venus: addGirlCells_addGirls_venus;
}

export interface addGirlCells {
  readonly addGirls: ReadonlyArray<addGirlCells_addGirls>;
}

export interface addGirlCellsVariables {
  readonly cells: ReadonlyArray<CellInput>;
}
