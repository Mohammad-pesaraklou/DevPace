"use client";
import { Stack } from "@mui/material";
import React from "react";
import Tabs from "./compond-components";

function MainComp() {
  return (
    <Stack direction={"column"} spacing={4}>
      <Tabs defaultValue={"one"}>
        <Tabs.List>
          <Tabs.Trigger value="one">one tab</Tabs.Trigger>
          <Tabs.Trigger value="two">two tab</Tabs.Trigger>
          <Tabs.Trigger value="third">third tab</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </Stack>
  );
}

export default MainComp;
