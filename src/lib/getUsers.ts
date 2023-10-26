import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://us-east-2.aws.realm.mongodb.com/api/client/v2.0/app/data-ksuni/graphql',
  cache: new InMemoryCache(),
});
