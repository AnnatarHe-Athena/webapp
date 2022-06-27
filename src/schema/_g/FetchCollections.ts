/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { venusSource } from "./globalTypes";

// ====================================================
// GraphQL query operation: FetchCollections
// ====================================================

export interface FetchCollections_collections_edges_cell_venus {
  readonly __typename: "Venus";
  readonly id: number;
  readonly uid: string;
  readonly source: venusSource;
  readonly name: string;
  readonly avatar: string;
  readonly bio: string;
  readonly remarks: string;
}

export interface FetchCollections_collections_edges_cell {
  readonly __typename: "Girl";
  readonly id: string;
  readonly img: string;
  readonly content: string;
  readonly text: string;
  readonly permission: number;
  readonly fromID: string;
  readonly fromURL: string;
  readonly isCollected: boolean;
  readonly venus: FetchCollections_collections_edges_cell_venus;
}

export interface FetchCollections_collections_edges {
  readonly __typename: "Collection";
  readonly id: number;
  readonly cell: FetchCollections_collections_edges_cell;
}

export interface FetchCollections_collections {
  readonly __typename: "Collections";
  readonly count: number;
  readonly edges: ReadonlyArray<FetchCollections_collections_edges>;
}

export interface FetchCollections {
  readonly collections: FetchCollections_collections;
}

export interface FetchCollectionsVariables {
  readonly from: number;
  readonly size: number;
  readonly cursor: number;
}
