import { useState } from "react";
function Skills({ data, change }) {
  const [newSkill, setNewSkill] = useState("");
  function addSkill() {
    change([...data, newSkill]);
    setNewSkill("");
  }
  function deleteSkill(index) {
    const newData = data.filter((_, i) => i !== index);
    change(newData);
  }
  return (
    <>
      {/* form */}
      <div className="bg-white border border-indigo-100 p-6 rounded-2xl shadow-md flex flex-col gap-4 relative mt-4 max-w-xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-4">
          <label className="block text-gray-700 font-medium">
            <span className="block text-lg mb-2">Add a Skill</span>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-3 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-base"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
              }}
              placeholder="e.g. JavaScript, Leadership, Figma"
            />
          </label>
          <div className="flex justify-end items-center">
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all font-semibold"
              onClick={addSkill}
            >
              <span className="hidden sm:inline">Add Skill</span>
              <span className="sm:hidden">+ Skill</span>
            </button>
          </div>
        </div>
      </div>

      {/* skills */}
      <div className="mt-6 flex flex-wrap gap-3 items-center justify-start min-h-12">
        {data.length === 0 ? (
          <div className="text-gray-400 text-center py-6 w-full">
            No skills added yet.
          </div>
        ) : (
          data.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-indigo-600 rounded-full px-5 py-2 shadow hover:shadow-lg transition-all mr-0 mb-2"
            >
              <span className="text-base font-semibold text-white wrap-break-word pr-2">
                {skill}
              </span>
              <button
                onClick={() => deleteSkill(index)}
                className="ml-2 px-2 py-1 rounded-full text-white transition-all text-xs flex items-center justify-center"
                title="Delete skill"
                style={{ minWidth: 20, minHeight: 20 }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Skills;
