/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: info
// ====================================================

export interface info_info {
  readonly __typename: "Info";
  readonly userCount: number;
  readonly cellCount: number;
  readonly fee: string;
  readonly email: string;
  readonly copyright: string;
}

export interface info {
  readonly info: info_info;
}
