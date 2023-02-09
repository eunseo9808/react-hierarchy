import { storiesOf } from "@storybook/react";
import React from "react";
import { items } from "./data/items";

import Hierarchy from "../hierarchy";

storiesOf("Hierarchy", module).add("Tree", () => {
  return <Hierarchy data={items} />;
});
