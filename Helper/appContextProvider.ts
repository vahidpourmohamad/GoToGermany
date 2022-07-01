// AppContextProvider.tsx
import React from "react";
import { AuthProvider } from "./AuthContext";

import { combineComponents } from "./combineComponents";

const providers = [AuthProvider];
export const AppContextProvider = combineComponents(...providers);
