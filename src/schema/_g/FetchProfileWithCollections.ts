/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchProfileWithCollections
// ====================================================

export interface FetchProfileWithCollections_users {
  readonly __typename: "User";
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly pwd: string;
  readonly avatar: string;
  readonly bio: string;
  readonly role: number;
}

export interface FetchProfileWithCollections_collections {
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

export interface FetchProfileWithCollections {
  readonly users: FetchProfileWithCollections_users;
  readonly collections: ReadonlyArray<FetchProfileWithCollections_collections>;
}

export interface FetchProfileWithCollectionsVariables {
  readonly id: string;
  readonly from: number;
  readonly size: number;
}
