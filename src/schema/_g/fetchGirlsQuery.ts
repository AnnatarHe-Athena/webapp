/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchGirlsQuery
// ====================================================

export interface fetchGirlsQuery_girls {
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

export interface fetchGirlsQuery {
  readonly girls: ReadonlyArray<fetchGirlsQuery_girls>;
}

export interface fetchGirlsQueryVariables {
  readonly from: number;
  readonly take: number;
  readonly hideOnly: boolean;
  readonly last: string;
}
