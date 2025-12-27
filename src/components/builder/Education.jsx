function Education({ data, change }) {
  function addEducation() {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    change([...data, newEducation]);
  }
  function deleteEducation(index) {
    const newData = data.filter((_, i) => i !== index);
    change(newData);
  }
  return (
    <>
      <div className="flex justify-end items-center mb-4 mt-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all font-semibold"
          onClick={addEducation}
        >
          <span className="hidden sm:inline">Add Education</span>
          <span className="sm:hidden">+ Education</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-8">
          <h1 className="text-gray-400 text-lg font-semibold mb-2">
            No education added yet.
          </h1>
          <p className="text-gray-500">
            Click{" "}
            <span className="font-semibold text-indigo-600">Add Education</span>{" "}
            to start adding your education history.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.map((edu, index) => (
            <div
              key={index}
              className="bg-white border border-indigo-100 p-6 rounded-2xl shadow-md flex flex-col gap-4 relative"
            >
              <button
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                onClick={() => deleteEducation(index)}
              >
                Delete
              </button>
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-gray-700 font-medium">
                  Institution:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={edu.institution}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].institution = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Degree:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={edu.degree}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].degree = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Field:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={edu.field}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].field = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Graduation Date:
                  <input
                    type="month"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={edu.graduation_date}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].graduation_date = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  GPA:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={edu.gpa}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].gpa = e.target.value;
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

export default Education;
