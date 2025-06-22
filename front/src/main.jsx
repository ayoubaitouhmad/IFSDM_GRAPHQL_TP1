import { createRoot } from 'react-dom/client'
import './index.css'

import ApolloProvider from "./graphql/ApolloProvider.jsx";
import UserManagement from "./components/UserManagement.jsx";

createRoot(document.getElementById('root')).render(
  <ApolloProvider>
    <UserManagement />
  </ApolloProvider>,
);
