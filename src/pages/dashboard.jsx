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
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setCVs([...CVs, newCV.data.resume]);
      toast.success(newCV.data.message);
      setShowCreateCV(false);
      navigate(`builder/${newCV.data.resume._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
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
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setCVs([...CVs, newCV.data.resume]);
      toast.success(newCV.data.message);
      setShowUploadCV(false);
      setIsLoading(false);
      navigate(`builder/${newCV.data.resume._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
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
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setCVs(CVs.filter((cv) => cv._id !== id));
      toast.success(deletedCV.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const response = await api.get("user/data", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setCVs(response.data.resume);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred");
      }
    };
    loadCVs();
  }, []);
  return (
    <>
      {/* Welcome Page Section */}
      <section
        id="welcome-page"
        className="flex items-center justify-center mt-12 flex-col bg-linear-to-br from-indigo-50 to-white py-12 rounded-2xl shadow-lg mx-4"
      >
        <h1 className="text-6xl font-bold text-indigo-700 text-center tracking-tight drop-shadow-lg">
          Welcome to CVB
        </h1>
        <p className="mt-6 text-2xl text-gray-700 font-light max-w-xl text-center">
          Create, manage, and preview your professional CVs with ease.
        </p>
      </section>
      {/* Action Buttons Section */}
      <div
        id="actions"
        className="flex justify-center items-center mt-12 gap-8"
      >
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg w-48 h-48 flex flex-col items-center justify-center transition-all duration-200 group"
          onClick={() => setShowCreateCV(true)}
        >
          <svg
            className="mb-3 group-hover:scale-110 transition-transform"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="text-xl">Create CV</span>
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-indigo-700 font-semibold py-6 px-8 rounded-2xl shadow-lg w-48 h-48 flex flex-col items-center justify-center border border-indigo-100 transition-all duration-200 group"
          onClick={() => setShowUploadCV(true)}
        >
          <svg
            className="mb-3 group-hover:scale-110 transition-transform"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M16 16v6H8v-6M12 12v10M20 12l-8-8-8 8" />
          </svg>
          <span className="text-xl">Upload CV</span>
        </button>
      </div>
      {/* History Section */}
      <section
        id="history"
        className="px-4 flex flex-col mt-14 max-w-3xl mx-auto mb-14"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">
          Your Recent CVs
        </h2>
        <div className="grid gap-6">
          {CVs.map((cv, idx) => (
            <div
              key={cv._id || idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {cv.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {cv.professional_summary ||
                    "Last modified: " + (cv.updatedAt || "N/A")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg font-medium transition-colors duration-150"
                  onClick={() => navigate(`builder/${cv._id || idx}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg font-medium transition-colors duration-150"
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
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-150"
                  onClick={createCV}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="ml-2 text-gray-600 hover:text-indigo-600 font-medium"
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
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-150"
                  onClick={UploadCV}
                  disabled={ isloading ? true : false }
                >
                  {isloading ? <Loader2 className="animate-spin"/> : "upload" }
                </button>
                <button
                  type="button"
                  className="ml-2 text-gray-600 hover:text-indigo-600 font-medium"
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
