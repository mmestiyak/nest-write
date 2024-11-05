import { useData } from "../../contexts/useData";
import SimpleSection from "../SimpleSection";
import { buildHierarchy } from "./Editor";

const Home = () => {
  const { books } = useData();
  let updated = books.map(item => {
    return { ...item, sections: buildHierarchy(item.sections) };
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {updated?.filter(item => item.sections.length)
      .map(item => (
        <div key={item.id} className="mb-8">
          {/* Book Title */}
          <h1 className="text-2xl font-semibold mb-4">{item.title}</h1>

          {/* Sections */}
          <ul className="list-none pl-0">
            {item.sections?.map(section => (
              <SimpleSection key={section.id} section={section} level={0} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
