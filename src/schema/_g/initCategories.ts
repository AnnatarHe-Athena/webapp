/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: initCategories
// ====================================================

export interface initCategories_categories {
  readonly __typename: "Category";
  readonly id: string;
  readonly name: string;
  readonly src: number;
  readonly count: number;
}

export interface initCategories {
  readonly categories: ReadonlyArray<initCategories_categories>;
}
