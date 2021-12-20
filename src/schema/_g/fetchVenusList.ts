/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Pagination, venusSource } from "./globalTypes";

// ====================================================
// GraphQL query operation: fetchVenusList
// ====================================================

export interface fetchVenusList_venusList_edges {
  readonly __typename: "Venus";
  readonly id: number;
  readonly uid: string;
  readonly name: string;
  readonly source: venusSource;
  readonly avatar: string;
  readonly bio: string;
}

export interface fetchVenusList_venusList {
  readonly __typename: "VenusList";
  readonly count: number;
  readonly edges: ReadonlyArray<fetchVenusList_venusList_edges>;
}

export interface fetchVenusList {
  readonly venusList: fetchVenusList_venusList;
}

export interface fetchVenusListVariables {
  readonly pagination: Pagination;
  readonly source?: venusSource | null;
}
