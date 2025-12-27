import { useState } from "react";
import { api } from "../../config/api";
import { Loader2 } from "lucide-react";
function Experience({ data, change }) {
  const [isloading, setIsLoading] = useState(false);
  function addExperience() {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    change([...data, newExperience]);
  }
  function deleteExperience(index) {
    const newData = data.filter((_, i) => i !== index);
    change(newData);
  }
  async function AiDescriptionEnhance(index){
      setIsLoading(true)
      const Description = data[index].description;
      const response = await api.post("/ai/enhance-job-description", { jobDescription: Description })
      const newData = [...data];
      newData[index].description = response.data.description;
      change(newData);
      setIsLoading(false)
  }
  return (
    <>
      <div className="flex justify-end items-center mb-4 mt-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all font-semibold"
          onClick={addExperience}
        >
          <span className="hidden sm:inline">Add Experience</span>
          <span className="sm:hidden">+ Experience</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-8">
          <h1 className="text-gray-400 text-lg font-semibold mb-2">
            No experience added yet.
          </h1>
          <p className="text-gray-500">
            Click{" "}
            <span className="font-semibold text-indigo-600">
              Add Experience
            </span>{" "}
            to start adding your work history.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.map((exp, index) => (
            <div
              key={index}
              className="bg-white border border-indigo-100 p-6 rounded-2xl shadow-md flex flex-col gap-4 relative"
            >
              <button
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                onClick={() => deleteExperience(index)}
              >
                Delete
              </button>
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-gray-700 font-medium">
                  Company:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={exp.company}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].company = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="block text-gray-700 font-medium">
                  Position:
                  <input
                    type="text"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={exp.position}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].position = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <div className="flex gap-4">
                  <label className="block text-gray-700 font-medium w-1/2">
                    Start Date:
                    <input
                      type="month"
                      className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                      value={exp.start_date}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].start_date = e.target.value;
                        change(newData);
                      }}
                    />
                  </label>
                  <label className="block text-gray-700 font-medium w-1/2">
                    End Date:
                    <input
                      type="month"
                      className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                      value={exp.end_date}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].end_date = e.target.value;
                        change(newData);
                      }}
                    />
                  </label>
                </div>
                <label className="block text-gray-700 font-medium">
                  <span>Description:</span>
                  <textarea
                    placeholder="Describe your job role"
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                    cols={50}
                    rows={4}
                    value={exp.description}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].description = e.target.value;
                      change(newData);
                    }}
                  />
                </label>
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    className="outline-none accent-indigo-600"
                    checked={exp.is_current}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].is_current = e.target.checked;
                      change(newData);
                    }}
                  />
                  Currently Working Here
                </label>
                <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all w-fit self-end" onClick={() => AiDescriptionEnhance(index)}>
                  {isloading ? <Loader2 className="animate-spin"/> : "AI enhance"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Experience;
