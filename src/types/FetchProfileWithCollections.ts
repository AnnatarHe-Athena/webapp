/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchProfileWithCollections
// ====================================================

export interface FetchProfileWithCollections_users {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  pwd: string;
  avatar: string;
  bio: string;
  role: number;
}

export interface FetchProfileWithCollections_collections {
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

export interface FetchProfileWithCollections {
  users: FetchProfileWithCollections_users;
  collections: FetchProfileWithCollections_collections[];
}

export interface FetchProfileWithCollectionsVariables {
  id: string;
  from: number;
  size: number;
}
