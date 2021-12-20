/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { venusSource } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addVenusMutation
// ====================================================

export interface addVenusMutation_addVenus {
  readonly __typename: "Venus";
  readonly id: number;
}

export interface addVenusMutation {
  readonly addVenus: addVenusMutation_addVenus;
}

export interface addVenusMutationVariables {
  readonly uid: string;
  readonly source: venusSource;
  readonly name?: string | null;
  readonly avatar?: string | null;
  readonly bio?: string | null;
  readonly rawData?: string | null;
}
