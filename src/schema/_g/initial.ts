/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: initial
// ====================================================

export interface initial_girls {
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

export interface initial_categories {
  readonly __typename: "Category";
  readonly id: string;
  readonly name: string;
  readonly src: number;
  readonly count: number;
}

export interface initial {
  readonly girls: ReadonlyArray<initial_girls>;
  readonly categories: ReadonlyArray<initial_categories>;
}

export interface initialVariables {
  readonly from: number;
  readonly take: number;
  readonly last: string;
}
