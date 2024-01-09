import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./App.scss";
import { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./Components/Loading/Loading";
import CheckBrowser from "./Components/CheckBrowser/CheckBrowser";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
      <CheckBrowser />
    </>
  );
};

export default App;
