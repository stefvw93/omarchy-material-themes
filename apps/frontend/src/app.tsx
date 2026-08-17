import { ThemeProvider } from "@/components/theme-provider";
import { Seed } from "@/features/seed";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Seed />
    </ThemeProvider>
  );
}

export default App;
