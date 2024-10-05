import React, { ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from './theme/theme'


const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <PaperProvider theme={theme}>
     {children}
    </PaperProvider>
  );
};
export default Provider;
