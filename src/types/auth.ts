/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Device } from "./globalTypes";

// ====================================================
// GraphQL query operation: auth
// ====================================================

export interface auth_auth {
  __typename: "AuthResponse";
  token: string;
  refreshToken: string;
  id: string;
}

export interface auth {
  auth: auth_auth;
}

export interface authVariables {
  email: string;
  password: string;
  device: Device;
}
