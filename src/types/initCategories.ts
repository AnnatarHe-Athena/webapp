/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: initCategories
// ====================================================

export interface initCategories_categories {
  __typename: "Category";
  id: string;
  name: string;
  src: number;
  count: number;
}

export interface initCategories {
  categories: initCategories_categories[];
}
