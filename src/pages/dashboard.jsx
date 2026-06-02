import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import pdfToText from "react-pdftotext";
function Dashboard() {
  const [showCreateCV, setShowCreateCV] = useState(false);
  const [showUploadCV, setShowUploadCV] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [CVs, setCVs] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createCV = async (e) => {
    e.preventDefault();
    try {
      const newCV = await api.post(
        "resume/create",
        { title },
        {
          headers: {
            Authorization: `${localStorage.getItem("cvb_token")}`,
          },
        },
      );
      setCVs([...CVs, newCV.data.resume]);
      toast.success(newCV.data.message);
      setShowCreateCV(false);
      navigate(`builder/${newCV.data.resume._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
    }
  };
  const UploadCV = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resumeText = await pdfToText(file);
    try {
      const newCV = await api.post(
        "ai/upload-cv",
        { resumeText },
        {
          headers: {
            Authorization: `${localStorage.getItem("cvb_token")}`,
          },
        },
      );
      setCVs([...CVs, newCV.data.resume]);
      toast.success(newCV.data.message);
      setShowUploadCV(false);
      setIsLoading(false);
      navigate(`builder/${newCV.data.resume._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
      setIsLoading(false);
    }
  };
  const deleteCV = async (id) => {
    try {
      const deletedCV = await api.post(
        "resume/delete",
        { resumeId: id },
        {
          headers: {
            Authorization: `${localStorage.getItem("cvb_token")}`,
          },
        },
      );
      setCVs(CVs.filter((cv) => cv._id !== id));
      toast.success(deletedCV.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
    }
  };

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const response = await api.get("user/data", {
          headers: {
            Authorization: `${localStorage.getItem("cvb_token")}`,
          },
        });
        setCVs(response.data.resume);
        console.log(response.data.resume);
      } catch (error) {
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    };
    loadCVs();
  }, []);
  return (
    <>
      {/* Welcome Page Section */}
      <section
        id="welcome-page"
        className="flex items-center justify-center mt-12 flex-col bg-indigo-600 py-12 rounded-2xl shadow-lg mx-4"
      >
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-4xl mx-auto text-white">
            Welcome to CVB
          </h1>
          <p className="mt-6 text-lg sm:text-2xl text-white font-extralight max-w-xl mx-auto">
            Create, manage, and preview your professional CVs with ease.
          </p>
        </div>
      </section>
      {/* Action Buttons Section */}
      <div
        id="actions"
        className="flex justify-center items-center mt-12 gap-8 px-4"
      >
        <button
          className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg w-48 h-20 flex flex-col items-center justify-center transition-all duration-200 group"
          onClick={() => setShowCreateCV(true)}
        >
          <svg
            className="mb-1"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="text-lg">Create CV</span>
        </button>
        <button
          className="px-7 py-3 rounded bg-white hover:bg-gray-50 text-indigo-700 font-medium shadow border border-indigo-100 w-48 h-20 flex flex-col items-center justify-center transition-all duration-200 group"
          onClick={() => setShowUploadCV(true)}
        >
          <svg
            className="mb-1"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M16 16v6H8v-6M12 12v10M20 12l-8-8-8 8" />
          </svg>
          <span className="text-lg">Upload CV</span>
        </button>
      </div>
      {/* History Section */}
      <section
        id="history"
        className="px-4 flex flex-col mt-14 max-w-4xl mx-auto mb-14"
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Your Recent CVs
        </h2>
        <div className="grid gap-6">
          {CVs.map((cv, idx) => (
            <div
              key={cv._id || idx}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition-shadow duration-200 border"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {cv.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-xl">
                  {cv.professional_summary ||
                    `Last modified: ${cv.updatedAt || "N/A"}`}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  onClick={() => navigate(`builder/${cv._id || idx}`)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium"
                  onClick={() => deleteCV(cv._id || idx)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Create CV Modal */}
      {showCreateCV && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Create CV
            </h2>
            <form>
              <div className="mb-6">
                <label className="block text-base font-medium mb-2 text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter CV title"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  onClick={createCV}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded text-gray-700 hover:text-indigo-700 font-medium"
                  onClick={() => setShowCreateCV(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Upload CV Modal */}
      {showUploadCV && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Upload CV
            </h2>
            <form>
              <div className="mb-6">
                <label className="block text-base font-medium mb-2 text-gray-700 mt-4">
                  Select File
                </label>
                <input
                  type="file"
                  className="border border-gray-300 p-3 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-2"
                  onClick={UploadCV}
                  disabled={isloading ? true : false}
                >
                  {isloading ? <Loader2 className="animate-spin" /> : "Upload"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded text-gray-700 hover:text-indigo-700 font-medium"
                  onClick={() => setShowUploadCV(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
