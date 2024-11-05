import React from 'react';

const SimpleSection = ({ section, level = 1 }) => {
  return (
    <li className="mb-2" style={{ paddingLeft: `${level * 20}px` }}>
      {/* Section Title */}
      <span className="text-lg">{section.title}</span>

      {/* Render child sections recursively */}
      {section.children?.length > 0 && (
        <ul>
          {section.children.map((child) => (
            <SimpleSection key={child.id} section={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SimpleSection;
