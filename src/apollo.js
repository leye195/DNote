import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { typeDefs, defaults, resolvers } from "./clientState";
const cache = new InMemoryCache(); //apollo-boost를 쓸 경우 알아서 설정해줌
const stateLink = withClientState({
  //앱 필요한 모든 로직을 작성
  cache, //clientState를 어디에 저장할 것인가
  typeDefs,
  defaults,
  resolvers,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink]), //http 링크 생성 or subscribtion을 위한 websocket을 넣어줌
});

export default client;
