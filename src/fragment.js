//Fragment는 Object로 GraphQL,Apollo Client에서 찾을수 있는 Object 같은 것
//기본적으로 재사용하고 싶을것임
import gql from "graphql-tag";
export const NOTE_FRAGMENT = gql`
  fragment NoteParts on Note {
    id
    title
    content
    createdAt
    updatedAt
  }
`;
