/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeGirl
// ====================================================

export interface removeGirl_removeGirl {
  readonly __typename: "ReturnOK";
  readonly isOk: boolean;
}

export interface removeGirl {
  readonly removeGirl: removeGirl_removeGirl;
}

export interface removeGirlVariables {
  readonly cells: ReadonlyArray<string>;
  readonly toRemove: boolean;
}
