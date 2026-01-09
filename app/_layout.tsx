import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Custom dark theme matching Balatro aesthetics
const BalatroTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1a1a2e',
    card: '#16213e',
    primary: '#e94560',
    text: '#eaeaea',
    border: '#2a2a4e',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={BalatroTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
