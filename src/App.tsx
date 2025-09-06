import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "@/components/Landing.tsx";
import Assessment from "@/components/Assessment.tsx";
import { ThemeProvider } from "./components/theme-provider";

function App() {

    const appRouter=createBrowserRouter([
        {
            path:'/',
            element:<Landing/>
        },
        {
            path:'/quiz',
            element:<Assessment/>
        }
    ])
  return (
      <ThemeProvider defaultTheme={'dark'} storageKey={'vite-ui-theme'}>
          <RouterProvider router={appRouter}>
          </RouterProvider>
      </ThemeProvider>

  )
}

export default App
