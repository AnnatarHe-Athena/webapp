/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchGirlsQuery
// ====================================================

export interface fetchGirlsQuery_girls {
  __typename: "Girl";
  id: string;
  img: string;
  content: string;
  text: string;
  permission: number;
  fromID: string;
  fromURL: string;
}

export interface fetchGirlsQuery {
  girls: fetchGirlsQuery_girls[];
}

export interface fetchGirlsQueryVariables {
  from: number;
  take: number;
  hideOnly: boolean;
  last: string;
}
