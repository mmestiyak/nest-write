export const books = [
    {
    id: 1,
      title: "JavaScript: The Good Parts",
      ownerEmail: 'meer@demo.com',
      sections: [
        { id: 1, title: "Introduction", parentId: null },
        { id: 2, title: "Grammar", parentId: null },
        { id: 3, title: "Syntax", parentId: 2 },
        { id: 4, title: "Functions", parentId: 2 },
        { id: 5, title: "Objects", parentId: 2 },
        { id: 6, title: "Classes", parentId: 5 },
        { id: 7, title: "Prototypes", parentId: 5 },
        { id: 8, title: "Inheritance", parentId: 7 },
        { id: 9, title: "Closures", parentId: 4 },
        { id: 10, title: "Callbacks", parentId: 9 },
        { id: 11, title: "Promises", parentId: 9 },
        { id: 12, title: "Asynchronous Programming", parentId: null },
        { id: 13, title: "Event Loop", parentId: 12 },
        { id: 14, title: "Call Stack", parentId: 12 }
      ]
    },
    {
        id:2,
      title: "React: Up & Running",
      ownerEmail: 'meer@demo.com',
      sections: [
        { id: 1, title: "Introduction to React", parentId: null },
        { id: 2, title: "Components", parentId: 1 },
        { id: 3, title: "Functional Components", parentId: 2 },
        { id: 4, title: "Class Components", parentId: 2 },
        { id: 5, title: "State Management", parentId: 1 },
        { id: 6, title: "Hooks", parentId: 5 },
        { id: 7, title: "useState", parentId: 6 },
        { id: 8, title: "useEffect", parentId: 6 },
        { id: 9, title: "useReducer", parentId: 6 },
        { id: 10, title: "Context API", parentId: 5 },
        { id: 11, title: "Routing in React", parentId: null },
        { id: 12, title: "React Router", parentId: 11 },
        { id: 13, title: "Dynamic Routes", parentId: 12 },
        { id: 14, title: "Navigation & Links", parentId: 12 },
        { id: 15, title: "Building a Simple App", parentId: null }
      ]
    }
  ];
  