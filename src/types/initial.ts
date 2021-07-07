/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: initial
// ====================================================

export interface initial_girls {
  __typename: "Girl";
  id: string;
  img: string;
  content: string;
  text: string;
  permission: number;
  fromID: string;
  fromURL: string;
  isCollected: boolean;
}

export interface initial_categories {
  __typename: "Category";
  id: string;
  name: string;
  src: number;
  count: number;
}

export interface initial {
  girls: initial_girls[];
  categories: initial_categories[];
}

export interface initialVariables {
  from: number;
  take: number;
  last: string;
}
