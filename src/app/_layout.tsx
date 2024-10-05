import { Stack } from "expo-router";
import Provider from "../lib/Provider";

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
