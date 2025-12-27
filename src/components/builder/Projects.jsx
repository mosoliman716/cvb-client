function Projects({ data, change }) {
  function addProject() {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    change([...data, newProject]);
  }
  function deleteProject(index) {
    const newData = data.filter((_, i) => i !== index);
    change(newData);
  }
  return (
    <>
      <div className="flex justify-end items-center mb-4 mt-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all font-semibold"
          onClick={addProject}
        >
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">+ Project</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-8">
          <h1 className="text-gray-400 text-lg font-semibold mb-2">
            No projects added yet.
          </h1>
          <p className="text-gray-500">
            Click{" "}
            <span className="font-semibold text-indigo-600">Add Project</span>{" "}
            to start adding your projects.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-indigo-100 p-6 rounded-2xl shadow-md flex flex-col gap-4 relative"
            >
              <button
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                onClick={() => deleteProject(index)}
              >
                Delete
              </button>
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-gray-700 font-medium">
                  Name:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={project.name}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].name = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Type:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={project.type}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].type = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Description:
                  <textarea
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={project.description}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].description = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Projects;
