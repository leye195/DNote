import gql from "graphql-tag";
import { NOTE_FRAGMENT } from "./fragment";

export const GET_NOTES = gql`
  {
    notes @client {
      id
      title
      content
      createdAt
    }
  }
`;
export const GET_NOTE = gql`
  query getNote($id: Int!) {
    note(id: $id) @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;
