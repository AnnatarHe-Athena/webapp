/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Device } from "./globalTypes";

// ====================================================
// GraphQL query operation: auth
// ====================================================

export interface auth_auth {
  readonly __typename: "AuthResponse";
  readonly token: string;
  readonly refreshToken: string;
  readonly id: string;
}

export interface auth {
  readonly auth: auth_auth;
}

export interface authVariables {
  readonly email: string;
  readonly password: string;
  readonly device: Device;
}
