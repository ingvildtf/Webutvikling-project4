import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
  } from '@apollo/client'
  
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: ' http://it2810-47.idi.ntnu.no:3000/graphql',
    
  })
  export default client
  