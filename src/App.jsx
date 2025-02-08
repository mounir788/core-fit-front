import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

function App() {
  // const navigate = useNavigate();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        onError: (error) => {
          // Check for specific error statuses globally
          if (error.response?.status === 401) {
            // Perform specific action (e.g., redirect to login or display toast)
            console.log(error);
            // navigate("/login");
            // modalRef.current.click();
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          // duration: 10000,
          style: {
            minWidth: "350px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
