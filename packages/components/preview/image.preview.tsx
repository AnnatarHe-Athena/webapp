import { useApolloClient } from "@apollo/client";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useImageDestLink } from '@athena/utils/hooks/useImageDestLink'
import { AppStore } from "@athena/utils/reducers";
import { TUser } from "@athena/utils/types/user";
import { getUserInfoURL, getTitleHref, getRealSrcLink } from "@athena/utils/utils";
import { getPermissionObj } from "@athena/utils/utils/permission";
import HideUntilLoaded from "../HideUntilLoaded";
import {
  AddToCollectionDocument,
  AddToCollectionMutation,
  AddToCollectionMutationVariables,
  FetchGirlsFragment,
  RemoveGirlDocument,
  RemoveGirlMutation,
  RemoveGirlMutationVariables,
} from "@athena/network/_g/graphql"

type PreviewImageProps = {
  cell: FetchGirlsFragment
  onClose: () => void
}

const Extra = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;

const ExtraButton = styled.button`
  border: 0;
  outline: 0;
  padding: 0.5rem;
  border-radius: 1px;
  color: #fff;
  font-weight: 300;
  box-shadow: 0 0 0.5rem #888;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 0.5rem;
  transition: all 0.35s;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`;

function PreviewImage(props: PreviewImageProps) {
  const { id, img, text, fromID, fromURL, content } = props.cell;
  const onClose = props.onClose;
  const user = useSelector<AppStore, TUser>((s) => s.profile.info);

  const { softRemove } = getPermissionObj(user);

  const leftUserInfo = fromID ? (
    <div>
      <a
        className="text-center font-light text-white"
        href={getUserInfoURL(fromID, fromURL)}
        target="_blank"
      >
        🧙‍♀️ 我的信息
      </a>
    </div>
  ) : null;

  const middleTitle = (
    <div className="w-7/12">
      <a href={getTitleHref(fromURL)} target="_blank">
        <h2 className="text-center font-light text-white">{text || "主题"}</h2>
      </a>
    </div>
  );

  const basedLink = useImageDestLink(img);
  const bigSrc = getRealSrcLink(atob(basedLink));
  // const bigSrc = getRealSrcLink(src, 'large')
  const client = useApolloClient();

  const handleCollect = useCallback(() => {
    client
      .mutate<AddToCollectionMutation, AddToCollectionMutationVariables>({
        mutation: AddToCollectionDocument,
        variables: {
          cells: [id.toString()],
        },
      })
      .then(() => {
        toast.info("已收藏");
      });
  }, [id]);
  const handleDelete = useCallback(() => {
    client
      .mutate<RemoveGirlMutation, RemoveGirlMutationVariables>({
        mutation: RemoveGirlDocument,
        variables: {
          cells: [id.toString()],
          toRemove: false,
        },
      })
      .then(() => {
        toast.info("已删除");
        props.onClose();
        // client.resetStore()
        // TODO: delete from cells locally
      });
  }, [id]);
  return (
    <div>
      <Extra className="fixed left-0 right-0 top-0 z-10 box-border flex items-center justify-around p-4">
        {leftUserInfo}
        {middleTitle}
        <div>
          <ExtraButton onClick={props.onClose}>Close</ExtraButton>
          <ExtraButton onClick={() => handleCollect()}>Collect</ExtraButton>
          {softRemove && <ExtraButton
            onClick={() => handleDelete()}
          >
            Delete
          </ExtraButton>}
        </div>
      </Extra>
      <HideUntilLoaded imageToLoad={bigSrc}>
        <div
          className="m-10 flex overflow-auto rounded bg-gray-600 bg-opacity-30 p-10 shadow-lg"
          style={{
            maxHeight: "95vh",
          }}
        >
          <figure className="max-h-screen overflow-auto bg-gray-900 bg-opacity-10">
            <picture onClick={onClose}>
              <source srcSet={bigSrc} />
              <img src={bigSrc} alt={text} className="w-full rounded" />
            </picture>
          </figure>
          <div className="flex w-52 flex-col items-end justify-between">
            <p className=" p-1 text-right text-xs dark:text-gray-200">
              {content}
            </p>
            {props.cell.venus ? (
              <div className=" text-right text-sm text-gray-800 dark:text-gray-200">
                {/* TODO: show avatar */}
                <p>#{props.cell.venus?.uid}</p>
                <h2>{props.cell.venus?.name}</h2>
                <h2>{props.cell.venus?.bio}</h2>
                <p>{props.cell.venus?.remarks}</p>
              </div>
            ) : null}
          </div>
        </div>
      </HideUntilLoaded>
    </div>
  );
}

export default PreviewImage;
