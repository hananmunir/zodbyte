import React, { useMemo } from "react";
import { InlineWidget } from "react-calendly";

const Calendy = () => {
  const { innerHeight } = window;
  let height = useMemo(() => innerHeight + 350, [innerHeight]);
  return (
    <InlineWidget
      styles={{ height: height + "px", width: "100%" }}
      url="https://calendly.com/zodbyte/30min?hide_gdpr_banner=1"
    />
  );
};

export default Calendy;
