import { useRef, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/useAuth";

const Section = ({ section, onCreate, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  const isAuthor = user?.user?.role === "author";

  // Toggle the visibility of child sections
  const handleSectionClick = () => setOpen((prev) => !prev);

  // Handle creating a new section under this section
  const handleSectionCreate = (parentId) => {
    const input = containerRef.current?.querySelector("input");
    if (input?.value) {
      onCreate(input.value, parentId);
      input.value = ""; // Clear the input
      input.focus(); // Refocus the input field
    }
  };

  // Handle editing the section's title
  const handleEdit = (e, section) => {
    e.stopPropagation();
    const newTitle = window.prompt("Update Section Title:", section.title);
    if (newTitle) onUpdate(newTitle, section.id);
  };

  // Handle deleting the section
  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <>
      <li className="cursor-pointer" onClick={handleSectionClick}>
        <div className="flex gap-3">
          <span>{open ? "↓ " : "→ "}</span>
          <div>
            <span>{section.title}</span>
          </div>

          {/* Edit and Delete Icons */}
          <div className="flex items-center gap-2">
            <PencilIcon
              aria-hidden="true"
              onClick={(e) => handleEdit(e, section)}
              className="h-4 w-4 cursor-pointer"
            />
            {isAuthor && (
              <TrashIcon
                aria-hidden="true"
                onClick={(e) => handleDelete(e, section.id)}
                className="h-4 w-4 cursor-pointer"
              />
            )}
          </div>
        </div>
      </li>

      {/* Render child sections if open */}
      {open && section.children && (
        <ul className="pl-4">
          {section.children.map((child) => (
            <Section
              key={child.id}
              section={child}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}

          {/* Input for creating new section (only for authors) */}
          {isAuthor && (
            <div ref={containerRef} className="p-1 flex gap-3 mt-2">
              <input
                type="text"
                className="border p-1 px-3"
                placeholder="New section title"
              />
              <button
                onClick={() => handleSectionCreate(section.id)}
                className="border p-1 px-3"
              >
                +
              </button>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default Section;
