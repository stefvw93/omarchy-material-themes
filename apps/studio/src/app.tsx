import { ThemeProvider } from "@/components/theme-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InspectorPage } from "@/features/inspector";
import { MotionPage } from "@/features/motion";
import { PluginsPage } from "@/features/plugins";
import { Seed } from "@/features/seed";
import { TokensPage } from "@/features/tokens";

/** Omaterial Studio: the theme generator, and the hub for the stef plugins. */
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Tabs defaultValue="theme" className="flex flex-col h-screen min-h-0">
        <TabsList className="mx-2 mt-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
          <TabsTrigger value="plugins">Plugins</TabsTrigger>
          <TabsTrigger value="inspector">Inspector</TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="flex flex-col flex-1 min-h-0">
          <Seed />
        </TabsContent>
        <TabsContent value="tokens" className="flex flex-col flex-1 min-h-0">
          <TokensPage />
        </TabsContent>
        <TabsContent value="motion" className="flex flex-col flex-1 min-h-0">
          <MotionPage />
        </TabsContent>
        <TabsContent value="plugins" className="flex flex-col flex-1 min-h-0">
          <PluginsPage />
        </TabsContent>
        <TabsContent value="inspector" className="flex flex-col flex-1 min-h-0">
          <InspectorPage />
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
}

export default App;
