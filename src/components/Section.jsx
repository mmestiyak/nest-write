import { useRef, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Section = ({ section, onCreate, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const handleSectionClick = () => {
    setOpen((open) => !open);
  };
  const containerRef = useRef();
  const handleSectionCreate = (id) => {
    const input = containerRef.current.querySelector("input");
    if (input.value) {
      onCreate(input?.value, id);
      input.value = "";
      input.focus();
    }
  };
  const handleEdit = (e, section) => {
    e.stopPropagation();
    const prompt = window.prompt('Update Section Title' +  ' ' + section.title)
    if(prompt){
        onUpdate(prompt, section.id)
    }
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id)
  };
  return (
    <>
      <li className="cursor-pointer" onClick={handleSectionClick}>
        <div className="flex gap-3">
          <span> {open ? "↓ " : "→ "}</span>
          <div>
          <span>{section.title }</span>
          </div>
          <PencilIcon
            aria-hidden="true"
            onClick={(e) => handleEdit(e, section)}
            className="block h-4 w-4 group-data-[open]:hidden"
          />
           <TrashIcon
            aria-hidden="true"
            onClick={(e) => handleDelete(e, section.id)}
            className="block h-4 w-4 group-data-[open]:hidden"
          />
        </div>
      </li>
      {section.children && open ? (
        <ul className="pl-2">
          {section?.children?.map((section) => (
            <Section key={section.id} onCreate={onCreate} onDelete={onDelete} onUpdate={onUpdate} section={section} />
          ))}
          <div ref={containerRef} className="p-1 flex gap-3">
            <input type="text" />
            <button
              onClick={() => handleSectionCreate(section.id)}
              className="border p-1 px-3"
            >
              +
            </button>
          </div>
        </ul>
      ) : null}
    </>
  );
};

export default Section;
