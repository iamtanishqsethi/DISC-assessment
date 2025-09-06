import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "@/components/Landing.tsx";
import Assessment from "@/components/Assessment.tsx";

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
    <RouterProvider router={appRouter}>
    </RouterProvider>
  )
}

export default App
