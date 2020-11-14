import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

export const link = createHttpLink({
  uri: 'http://it2810-47.idi.ntnu.no:3000/graphql',
})
//Setting up ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
export default client
