import { useState } from "react";
import { api } from "../../config/api";
import { Loader2 } from "lucide-react";

function ProfessionalSummary({ data, change }) {
  const [isloading, setIsLoading] = useState(false);

  const AiSummaryEnhance = async () => {
    setIsLoading(true)
    try {
      const response = await api.post("/ai/enhance-professional-summary", { summary: data });
      change(response.data.summary);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-6">
      <label className="mb-6 block text-gray-700 font-semibold relative w-full">
        <span className="block text-lg mb-2">Professional Summary</span>
        <span className="text-gray-400 text-sm mb-2 block">
          A brief paragraph highlighting your skills, experience, and career
          goals.
        </span>
        <button className="absolute top-0 right-0 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all font-semibold cursor-pointer" onClick={AiSummaryEnhance}>
          {isloading ? <Loader2 className="animate-spin"/> : "AI enhance"}
        </button>
        <textarea
          className="border mt-4 border-gray-300 p-4 w-full rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none text-base"
          placeholder="Enter your professional summary"
          rows={8}
          value={data}
          onChange={(e) => change(e.target.value)}
        />
        <p className="text-gray-500 mt-2 text-sm">
          Tip: Use clear and concise language to effectively communicate your
          professional background.
        </p>
      </label>
    </div>
  );
}

export default ProfessionalSummary;
