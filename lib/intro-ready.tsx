"use client";

import { createContext, useContext } from "react";

export const IntroReadyContext = createContext(true);
export const useIntroReady = () => useContext(IntroReadyContext);
