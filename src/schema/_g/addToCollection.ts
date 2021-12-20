/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addToCollection
// ====================================================

export interface addToCollection_addCollection {
  readonly __typename: "ReturnOK";
  readonly isOk: boolean;
}

export interface addToCollection {
  readonly addCollection: addToCollection_addCollection;
}

export interface addToCollectionVariables {
  readonly cells: ReadonlyArray<string>;
}
