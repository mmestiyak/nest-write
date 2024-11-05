import { useMemo, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { books as booksData } from "../../data/books";
import Section from "../Section";
import uuid4 from "uuid4";


const Editor = () => {

    const {user} = useAuth()
    const [books, setBooks] = useState(() => booksData)
    const [selectedBook, setSelectedBook] = useState({})
    
    const buildHierarchy  = (sections) => {
      const map = {}
      const roots = []

      sections.forEach(section => map[section.id] = {...section, children: []})

      sections.forEach(section => {
         if(!section.parentId){
           roots.push(map[section.id])
         }else {
            map[section.parentId].children.push(map[section.id])
         }
      })
      return roots;
    }



    const handleSectionCreate = (value, sectionId) => {
        // Create a new section object
        const newSection = {
          id: uuid4(),
          title: value,
          parentId: sectionId,
        };
    
        const updatedBooks = books.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              sections: [...book.sections, newSection], 
            };
          }
          return book;
        });
    
        setBooks(updatedBooks);
    
        setSelectedBook((prevSelectedBook) => ({
          ...prevSelectedBook,
          sections: [...prevSelectedBook.sections, newSection],
        }));

      };

      const handleSectionUpdate = (value, sectionId) => {
        // Create a new updated section object
        const updatedBooks = books.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              sections: book.sections.map((section) => {
                // Find the section that matches sectionId and update the title
                if (section.id === sectionId) {
                  return { ...section, title: value };
                }
                return section;
              }),
            };
          }
          return book;
        });
      
        // Update the books state
        setBooks(updatedBooks);
      
        // Update the selected book state to reflect the changes
        setSelectedBook((prevSelectedBook) => ({
          ...prevSelectedBook,
          sections: prevSelectedBook.sections.map((section) =>
            section.id === sectionId ? { ...section, title: value } : section
          ),
        }));
      };


      const handleSectionDelete = (sectionId) => {
        console.log('Deleting section with id:', sectionId);
      
        // Remove section and its children
        const updatedBooks = books.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              sections: book.sections
                .filter((section) => section.id !== sectionId) // Remove the section itself
                .filter((section) => section.parentId !== sectionId) // Remove children of the deleted section
            };
          }
          return book;
        });
      
        setBooks(updatedBooks);
        setSelectedBook((prevSelectedBook) => ({
          ...prevSelectedBook,
          sections: prevSelectedBook.sections
            .filter((section) => section.id !== sectionId) // Remove the section itself
            .filter((section) => section.parentId !== sectionId) // Remove children of the deleted section
        }));
      };
      
 
      

      const memorizedSectionHierarchy = useMemo(() => selectedBook?.sections && buildHierarchy(selectedBook?.sections), [selectedBook])


    return ( <>
        <ul role="list" className="divide-y divide-gray-200 p-10">
      {books.filter(item => item.ownerEmail === user.user.email).map((item) => (
        <li onClick={() => setSelectedBook(item)} key={item.id} className="px-4 py-4 sm:px-0">
          {item.title}
        </li>
      ))}
    </ul>

 
    {memorizedSectionHierarchy && Object.keys(memorizedSectionHierarchy).length ? <div className="p-10">   
        <h1 className="text-lg mb-5">{selectedBook?.title}</h1>
        <ul>
            {memorizedSectionHierarchy?.map(section => <Section onDelete={handleSectionDelete} onUpdate={handleSectionUpdate} key={section.id} onCreate={handleSectionCreate} section={section} />)}
        </ul>
     </div> : null}
    
    </> );
}
 
export default Editor;