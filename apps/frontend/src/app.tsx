import { ThemeProvider } from "@/components/theme-provider";
import { Seed } from "@/features/seed";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Seed />
      </div>
    </ThemeProvider>
  );
}

export default App;
