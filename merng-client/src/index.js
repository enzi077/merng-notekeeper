import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.module.css';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'

const httpLink=createHttpLink({
    uri:'/graphql'
})

const client=new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
        <ApolloProvider client={client}>
            <Root />
        </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
