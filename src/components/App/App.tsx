import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchNote, setSearchNote] = useState("");

  const { data } = useQuery({
    queryKey: ["note", currentPage, searchNote],
    queryFn: () => fetchNotes(currentPage + 1, searchNote),
    placeholderData: keepPreviousData,
  });
  const updateSearchNote = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchNote(e.target.value);
      setCurrentPage(0);
    },
    300
  );
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={css.app}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSuccess={closeModal} />
        </Modal>
      )}
      <header className={css.toolbar}>
        <SearchBox value={searchNote} onChange={updateSearchNote} />
        {data && data?.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages}
            forcePage={currentPage}
            onPageChange={(event) => setCurrentPage(event.selected)}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
