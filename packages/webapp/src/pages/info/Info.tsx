import React from "react";
import styled from "styled-components";
import Card from "@athena/components/src/card/Card";
import { useQuery } from "@apollo/client";
import {
  InfoDocument,
  InfoQuery,
  InfoQueryVariables,
} from "@athena/network/_g/graphql"

const InfoTip = styled.p`
  padding: 1rem;
  background-color: #222;
  color: #fff;
  border-radius: 4px;
`;

function InfoPage() {
  const { data, loading } = useQuery<InfoQuery, InfoQueryVariables>(
    InfoDocument,
  );

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center text-lg text-black">
        {/* <Spinner name='circle' /> */}
      </div>
    );
  }

  const { userCount, cellCount, fee, email, copyright } = data.info;
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Card className="max-w-3xl" isFar>
        <InfoTip>
          已有 <strong>{cellCount}</strong> 张图片，和{" "}
          <strong>{userCount}</strong> 名用户。
        </InfoTip>
        <InfoTip>
          暂无法注册，需要联系
          <a
            href={"mailto:" + email}
            className="py-1 text-red-400 hover:underline"
          >
            {copyright}
          </a>{" "}
          申请，如果通过，需要付费可能是 <small>{fee}</small>
        </InfoTip>

        <hr />

        <h3>客户端下载：</h3>
        <InfoTip>敬请期待...</InfoTip>
      </Card>
    </main>
  );
}

// TODO: 加入客户端下载支持的功能
export default InfoPage;
