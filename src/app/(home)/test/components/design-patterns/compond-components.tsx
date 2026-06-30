"use client";
import { Button, Grid2, Paper } from "@mui/material";
import React, { useState, createContext, useContext, ReactNode } from "react";

interface TabContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("Tabs components must be used within a <Tabs />");

  return context;
}

const List = ({ children }: { children: ReactNode }) => {
  return (
    <Grid2 container spacing={6} className="">
      {children}
    </Grid2>
  );
};

const Trigger = ({ value, children }: { value: string; children: string }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <Grid2 size={{ sm: 6, md: 4 }}>
      <Button
        className={`pb-2 text-lg w-full transition-all ${
          isActive ? "border-b-2 border-blue-600 text-blue-600" : ""
        }`}
        onClick={() => setActiveTab(value)}
      >
        {children}
      </Button>
    </Grid2>
  );
};

const Tabs = ({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabContext.Provider>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;

export default Tabs;
