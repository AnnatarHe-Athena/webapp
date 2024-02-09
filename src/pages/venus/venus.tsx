import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AddVenusMutationDocument,
  AddVenusMutationMutation,
  AddVenusMutationMutationVariables,
  FetchVenusListDocument,
  FetchVenusListQuery,
  FetchVenusListQueryVariables,
  VenusSource,
} from "src/schema/_g/graphql";

type VenusPageProps = {};

function VenusPage(props: VenusPageProps) {
  const { data, refetch } = useQuery<
    FetchVenusListQuery,
    FetchVenusListQueryVariables
  >(FetchVenusListDocument, {
    pollInterval: 20_000,
    variables: {
      hasRemarks: false,
      pagination: {
        limit: 20,
        lastID: 1 << 30,
      },
    },
  });

  const [doAdd] = useMutation<
    AddVenusMutationMutation,
    AddVenusMutationMutationVariables
  >(AddVenusMutationDocument);
  const [waitingVenusListText, setWaitingList] = useState("");
  const submitVenusToServer = useCallback(() => {
    const vs = waitingVenusListText.split("\n");
    if (vs.length === 0) {
      return;
    }

    const uidReqList = vs
      .filter((x) => x)
      .map((v) => new URL(v).pathname)
      .map((x) => {
        const xs = x.split("/");
        return xs[xs.length - 1];
      })
      .map((x) =>
        doAdd({
          variables: {
            uid: x,
            source: VenusSource.Weibo,
          },
        }),
      );

    Promise.allSettled(uidReqList).then(res => {
      toast.success('done')
      refetch()
      setWaitingList('')
    })
  }, [doAdd, waitingVenusListText, refetch])

  useEffect(() => {
    const regexp = /weibo\.c\w{1,2}\/u\/(\d{10})/;
    async function onVisibilityChange() {
      if (document.hidden) {
        return;
      }
      const text = await navigator.clipboard.readText();
      const matched = text.match(regexp);
      if (!matched) {
        return;
      }
      if (matched.length != 2) {
        return;
      }

      const uid = matched[1];
      setWaitingList((w) => {
        if (w.includes(uid)) {
          return w;
        }
        return w + `https://weibo.com/u/${uid}\n`
      })
      toast.success('read from clipboard')
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="container m-auto flex flex-col items-center justify-center pt-10">
      <div className="mb-4 flex w-full flex-col">
        <textarea
          value={waitingVenusListText}
          onChange={(v) => setWaitingList(v.target.value)}
          className="w-full rounded bg-gray-200 bg-opacity-20 p-4 text-gray-800 dark:text-gray-200"
          rows={10}
        />
        <button
          className="mt-4 w-full rounded bg-blue-400 py-4 text-gray-800 hover:bg-blue-500"
          disabled={waitingVenusListText.length === 0}
          onClick={submitVenusToServer}
        >
          submit venus to server
        </button>
      </div>
      <span className="dark:text-gray-200">count: {data?.venusList.count}</span>
      <ul className="dark:text-gray-200">
        {data?.venusList.edges.map((v) => (
          <li key={v.id} className="my-2">
            <p>
              {v.source} {v.name.length > 2 ? v.name : v.uid}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenusPage;
