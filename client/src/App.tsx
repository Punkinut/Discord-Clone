import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route  } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/reset.sass'
import './styles/global.scss'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth';
import DesktopNav from './components/MainNavigation/DesktopNav';
import StoreProvider from './redux/GlobalState';
import UserCard from './components/UserCard/UserCard';
import GuildDiscovery from './pages/Guild-Discovery';
import EnterLoading from './components/EnterLoading/EnterLoading';
import CustomStatusModal from './components/CustomStatusModal/CustomStatusModal';
import EmojiModal from './components/EmojiModal/EmojiModal';
import spinner from './images/spinner.gif';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          friends: {
            merge(existing, incoming){
              return incoming
            }
          },
        },
      },
    },
  })
});
  

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
        <DesktopNav/>
        <UserCard/>
        <CustomStatusModal/>
        <EmojiModal/>
        <EnterLoading spinner={spinner}/>
        <Switch>
          <Route exact path="/">
              <Redirect to="/channels/@me" />
          </Route>
          <ProtectedRoute exact path='/channels/@me' component={Home} />
          <ProtectedRoute exact path='/guild-discovery' component={GuildDiscovery} />
          <ProtectedAuth exact path='/login' component={Login} />
          <ProtectedAuth exact path='/reset-password/:id/:token' component={ResetPassword}/>
          <ProtectedAuth exact path='/register' component={Register} />
        </Switch>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

