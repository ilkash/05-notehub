import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  mySearchNote: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
    params: {
      page,
      search: mySearchNote,
    },
  });
  return response.data;
};

export const deleteNote = async (noteID: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteID}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};
