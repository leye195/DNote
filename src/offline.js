import { GET_NOTES } from "./Queries";

export const saveNotes = (cache) => {
  const { notes } = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem("notes", jsonNotes);
  } catch (e) {
    console.log(e);
  }
};
export const loadNotes = () => {
  const notes = localStorage.getItem("notes"); //JSON.parse(localStorage.getItem("notes"));
  if (!notes) return [];
  try {
    const parsedNotes = JSON.parse(notes);
    return parsedNotes;
  } catch (e) {
    console.log(e);
    return [];
  }
};
