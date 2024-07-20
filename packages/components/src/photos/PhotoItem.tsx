import React, { useState } from "react";
import Preview from "../preview/Preview";
import { getRealSrcLink, getAESIVFromUserEmail } from "@athena/utils/utils";
import { useImageDestLink } from "@athena/utils/hooks/useImageDestLink";
import HideUntilLoaded from "../HideUntilLoaded"
import { FetchGirlsFragment } from "@athena/network/_g/graphql"

type PhotoItemProps = {
  cell: FetchGirlsFragment
  forceDeleteable: boolean
}

function PhotoItem(props: PhotoItemProps) {
  const { id, img, text, fromID, fromURL, content } = props.cell;

  const [vis, setVis] = useState(false);
  const basedLink = useImageDestLink(img);
  const bmiddleSrc = getRealSrcLink(atob(basedLink));

  return (
    <picture className=" rounded">
      <HideUntilLoaded imageToLoad={bmiddleSrc}>
        <React.Fragment>
          <source srcSet={bmiddleSrc} onClick={() => setVis(true)} />
          <img
            src={bmiddleSrc}
            alt={text}
            onClick={() => setVis(true)}
            crossOrigin="anonymous"
            className=" mx-auto h-full rounded object-cover"
            style={{
              maxHeight: "650px",
            }}
          />
        </React.Fragment>
      </HideUntilLoaded>
      <Preview
        // data={{ id, src, desc, fromID, fromURL, content }}
        data={{
          cell: props.cell,
          onClose: () => { },
        }}
        visible={vis}
        onClose={() => setVis(false)}
      />
    </picture>
  );
}

export default PhotoItem;
