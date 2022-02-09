import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

export default async function apolloQuery(query, variables = null) {
    const result = await apolloClient.query({
        query: gql`
            ${query}
        `,
        variables: variables,
    });

    return result;
}
