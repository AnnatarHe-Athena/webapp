import React, { useCallback } from "react";
import Nav from "AthenaComponents/Nav";
import { useQuery } from "@apollo/client";
import {
  InitialDocument,
  InitialQuery,
  InitialQueryVariables,
} from "src/schema/_g/graphql";

function _Girls(props: any) {
  const { data, refetch } = useQuery<InitialQuery, InitialQueryVariables>(
    InitialDocument,
    {
      variables: {
        from: 0,
        take: 20,
        last: (1 << 31).toString(),
      },
    },
  );

  const onChangeCategory = useCallback(() => {
    refetch();
  }, []);

  return (
    <div>
      <Nav
        categories={
          data?.categories.map((x) => ({ id: x.id, name: x.name })) ?? []
        }
        onSelected={onChangeCategory}
      />
    </div>
  );
}

export default _Girls;
