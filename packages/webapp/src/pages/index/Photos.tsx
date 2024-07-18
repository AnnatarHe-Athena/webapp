import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { legacyCategory } from "@athena/utils/constants/defaults";
import { getPermissionObj } from "@athena/utils/utils/permission"
import PhotoList from "@athena/components/photos/Photos";
import { AppStore } from "@athena/utils/reducers";
import { TUser } from "@athena/utils/types/user"
import {
  FetchGirlsQueryDocument,
  FetchGirlsQueryQuery,
  FetchGirlsQueryQueryVariables,
} from "@athena/network/_g/graphql"
import { useAtomValue } from 'jotai'
import { beautyListFetchOffset } from '@athena/utils/beauty'

type PhotosProps = {
  categoryID: number;
};

function Photos(props: PhotosProps) {
  const user = useSelector<AppStore, TUser>((s) => s.profile.info);
  const offset = useAtomValue(beautyListFetchOffset)

  const query = useQuery<FetchGirlsQueryQuery, FetchGirlsQueryQueryVariables>(
    FetchGirlsQueryDocument,
    {
      variables: {
        from: ~~props.categoryID || 1,
        take: 17,
        hideOnly: false,
        last: offset ? offset.toString() : (1 << 30).toString()
      },
    },
  );

  const loadMore = () => {
    const cells = query.data?.girls ?? [];
    if (cells.length === 0) {
      return;
    }
    let lastId = (cells[cells.length - 1] as any).id
    if (offset && (~~lastId) > offset) {
      lastId = offset.toString()
    }
    query.fetchMore({
      variables: {
        from: ~~props.categoryID || 1,
        take: 20,
        hideOnly: false,
        last: lastId,
      },
      updateQuery(pResult, options) {
        return {
          girls: [...pResult.girls, ...(options.fetchMoreResult?.girls || [])],
        };
      },
    });
  };

  return (
    <PhotoList
      loading={query.loading}
      loadMore={loadMore}
      cells={Array.from(query.data?.girls ?? []) as any}
      forceDeleteable={
        getPermissionObj(user).remove &&
        props.categoryID.toString() === legacyCategory.id
      }
    />
  );
}

export default Photos;
