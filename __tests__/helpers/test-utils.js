import { QueryClient, QueryClientProvider } from "react-query";

export const TestQueryProvider = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
        {children}
    </QueryClientProvider>);