/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeGirl
// ====================================================

export interface removeGirl_removeGirl {
  __typename: "ReturnOK";
  isOk: boolean;
}

export interface removeGirl {
  removeGirl: removeGirl_removeGirl;
}

export interface removeGirlVariables {
  cells: string[];
  toRemove: boolean;
}
