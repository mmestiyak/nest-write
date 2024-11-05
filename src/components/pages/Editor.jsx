import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo, useRef } from "react";
import uuid4 from "uuid4";
import { useData } from "../../contexts/useData";
import Section from "../Section";

// Utility function to build a hierarchical structure of sections
export const buildHierarchy = (sections) => {
  const sectionMap = {};
  const rootSections = [];

  sections.forEach((section) => {
    sectionMap[section.id] = { ...section, children: [] };
  });

  sections.forEach((section) => {
    if (!section.parentId) {
      rootSections.push(sectionMap[section.id]);
    } else {
      sectionMap[section.parentId]?.children?.push(sectionMap[section.id]);
    }
  });

  return rootSections;
};

const Editor = () => {
  const { books, setBooks } = useData();
  const [selectedBook, setSelectedBook] = useLocalStorage("selectedBook", {});
  const inputRef = useRef();

  // Handles creating a new section
  const handleSectionCreate = (title, parentId = null) => {
    if (!title) return;

    const newSection = {
      id: uuid4(),
      title,
      parentId,
    };

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id
        ? { ...book, sections: [...book.sections, newSection] }
        : book
    );

    setBooks(updatedBooks);
    setSelectedBook((prevSelectedBook) => ({
      ...prevSelectedBook,
      sections: [...prevSelectedBook.sections, newSection],
    }));
  };

  // Handles updating an existing section's title
  const handleSectionUpdate = (newTitle, sectionId) => {
    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          sections: book.sections.map((section) =>
            section.id === sectionId
              ? { ...section, title: newTitle }
              : section
          ),
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    setSelectedBook((prevSelectedBook) => ({
      ...prevSelectedBook,
      sections: prevSelectedBook.sections.map((section) =>
        section.id === sectionId
          ? { ...section, title: newTitle }
          : section
      ),
    }));
  };

  // Handles deleting a section and its children
  const handleSectionDelete = (sectionId) => {
    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          sections: book.sections
            .filter((section) => section.id !== sectionId) // Remove the section itself
            .filter((section) => section.parentId !== sectionId), // Remove children of the deleted section
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    setSelectedBook((prevSelectedBook) => ({
      ...prevSelectedBook,
      sections: prevSelectedBook.sections
        .filter((section) => section.id !== sectionId)
        .filter((section) => section.parentId !== sectionId),
    }));
  };

  // Memoized hierarchy of sections for better performance and readability
  const memoizedSectionHierarchy = useMemo(() => {
    return selectedBook?.sections?.length
      ? buildHierarchy(selectedBook.sections)
      : [];
  }, [selectedBook]);

  return (
    <>
      {/* Book List */}
      <ul role="list" className="divide-y divide-gray-200 p-10">
        {books.map((book) => (
          <li
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="px-4 py-4 sm:px-0 cursor-pointer"
          >
            {book.title}
          </li>
        ))}
      </ul>

      {/* Section List */}
      {memoizedSectionHierarchy.length > 0 && (
        <div className="p-10">
          <h1 className="text-lg mb-5">{selectedBook?.title}</h1>

          <ul>
            {memoizedSectionHierarchy.map((section) => (
              <Section
                key={section.id}
                section={section}
                onCreate={handleSectionCreate}
                onUpdate={handleSectionUpdate}
                onDelete={handleSectionDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Section Creation Input */}
      {Object.keys(selectedBook).length > 0 && (
        <div className="pl-10 flex gap-5">
          <input
            ref={inputRef}
            type="text"
            className="border p-1 px-3"
            placeholder="New section title"
          />
          <button
            onClick={() => {
              handleSectionCreate(inputRef.current.value);
              inputRef.current.value = "";
              inputRef.current.focus();
            }}
            className="border p-1 px-3"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default Editor;
