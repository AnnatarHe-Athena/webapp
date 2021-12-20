/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchCollections
// ====================================================

export interface FetchCollections_collections {
  readonly __typename: "Girl";
  readonly id: string;
  readonly img: string;
  readonly content: string;
  readonly text: string;
  readonly permission: number;
  readonly fromID: string;
  readonly fromURL: string;
  readonly isCollected: boolean;
}

export interface FetchCollections {
  readonly collections: ReadonlyArray<FetchCollections_collections>;
}

export interface FetchCollectionsVariables {
  readonly id: string;
  readonly from: number;
  readonly size: number;
}
