import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import NewsList from './components/NewsList'

const NEWS_FETCH = gql`
    query allNews($country: [ID], $after: String){
        allNews(first:5, country: $country, after: $after){
            edges{
              node{
                id,
                siteName,
                title,
                content,
                publishedDate,
                thumbnail,
                vote,
                link
              }
            }
            pageInfo{
                endCursor,
                hasNextPage
            }
        }
    }
`;

function App() {

  const country = "UK"

  return (

    <div className="row d-flex justify-content-center">
       
       <div className="col-md-8" style={{ height: "250px"}}>
        <h2 style={{ textAlign:"center", margin:"20px"}}> React Graphql Infinite Scroll Tutorial </h2>

        <Query query={NEWS_FETCH} variables={{ country: country, after: "" }}>
            {({ data, loading, fetchMore }) => {

                  const allNews = data ? data.allNews : []
                  const endCursor = data ? data.allNews.pageInfo.endCursor : ""
                  
                  if (data)  
                      if (allNews.edges.length == 0) return (<p>No News Found</p>)
                      
                  return (
                      <NewsList
                      loading={loading}
                      entries={allNews || []}
                      onLoadMore={() =>
                          fetchMore({
                              variables: {
                                  country: country,
                                  after: endCursor
                              },
                              updateQuery: (previousResult, { fetchMoreResult }) => {
                                  const newEdges = fetchMoreResult.allNews.edges;
                                  const pageInfo = fetchMoreResult.allNews.pageInfo;
                      
                                  return newEdges.length
                                      ? {
                                          allNews: {
                                              __typename: previousResult.allNews.__typename,
                                              edges: [...previousResult.allNews.edges, ...newEdges],
                                              pageInfo
                                          }
                                      }
                                      : previousResult;
                                  }
                          })
                      }
                      />
                  );
              }
            }

          </Query>

       </div>
    </div>
  );
}

export default App;
