/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchCollections
// ====================================================

export interface FetchCollections_collections {
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

export interface FetchCollections {
  collections: FetchCollections_collections[];
}

export interface FetchCollectionsVariables {
  id: string;
  from: number;
  size: number;
}
