import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { updateCategories } from "@athena/utils/actions/category"
import Header from "./header/Header";
import {
  InitialDocument,
  InitialQuery,
  InitialQueryVariables,
} from "@athena/network/_g/graphql"
import { Outlet } from "react-router-dom";

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
`;

function Root() {
  const q = useQuery<InitialQuery, InitialQueryVariables>(InitialDocument, {
    variables: {
      from: 2,
      take: 20,
      last: (1 << 20).toString(),
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!q.data) {
      return;
    }
    dispatch(updateCategories(q.data.categories));
  }, [q.data]);
  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-900 bg-purple-700'>
      <Header />
      <TransitionGroup className="transition-group">
        <CSSTransition
          // key={props.location.key}
          component={BodyContainer}
          classNames="slide" timeout={350}>
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Root
