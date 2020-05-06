import { NOTE_FRAGMENT } from "./fragment";
import { GET_NOTES } from "./Queries";
import { saveNotes, loadNotes } from "./offline";
import moment from "moment";

export const defaults = {
  notes: loadNotes(),
};
export const typeDefs = [
  `
    schema {
        query:Query
        mutation:Mutation
    }
    type Query{
        notes:[Note]!
        note(id:Int!): Note
    }
    type Mutation{
        createNote(title:String!, content:String!): Note
        editNote(id:Int!, title:String, content:String) :Note
        deleteNote(id:Int!):Note
        favNote(id:Int!):Note
    }
    type Note{
        id:Int!
        title:String!
        content:String!
        createdAt:String!
        updatedAt:String!
        fav:Boolean!
    }
    `,
];
//schema 형식 정의

export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id,
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      //Cache에서 정보를 가져오는 과정
      return note;
    }, //context는 Cache object에 접근을 부여
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const newNote = {
        __typename: "Note",
        id: notes.length + 1,
        title: variables.title,
        content: variables.content,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: variables.updatedAt,
        fav: false,
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes],
        },
      }); //write data to cache
      saveNotes(cache);
      return newNote;
    },
    editNote: (_, variables, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id,
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      const updatedNote = {
        ...note,
        title: variables.title,
        content: variables.content,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote,
      });
      saveNotes(cache);
      return updatedNote;
    },
    deleteNote: (_, { id }, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const filteredNotes = notes.filter((note) => note.id !== id);
      cache.writeData({
        data: {
          notes: filteredNotes,
        },
      });
      saveNotes(cache);
      return filteredNotes;
    },
    favNote: (_, { id }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id,
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      const updatedNote = {
        ...note,
        fav: !note.fav,
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote,
      });
      saveNotes(cache);
      return updatedNote;
    },
  },
};
