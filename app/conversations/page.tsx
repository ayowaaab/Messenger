"use client";
import React from "react";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";
import clsx from "clsx";

const Home = () => {
    const {isOpen} = useConversation()
  return (
    <div className={clsx("lg:block lg:pl-80 h-full",isOpen?'block':'hidden')}>
      <EmptyState />
    </div>
  );
};

export default Home;
