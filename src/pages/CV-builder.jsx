import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalInfo from "../components/builder/PersonalInfo";
import ProfessionalSummary from "../components/builder/ProfessionalSummary";
import Experience from "../components/builder/Experience";
import Education from "../components/builder/Education";
import Projects from "../components/builder/Projects";
import Skills from "../components/builder/Skills";
import ClassicTemplate from "../assets/templates/ClassicTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import { toast } from "react-hot-toast";

function CVBuilder() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    title: "",
    personal_info: {},
    professinal_summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    templates: "",
    accent_color: "red",
  });

  const [selectedSectionindex, setSelectedSectionindex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [selectedColor, setSelectedColor] = useState("red");

  async function saveResume() {
    try {
      const id = window.location.href.split("/").pop();
      const response = await api.put(`resume/update`, {
        resumeId: id,
        resumeData,
      },{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
    } catch(error){
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  }
  function nextFormSection() {
    if (selectedSectionindex < 5) {
      setSelectedSectionindex(selectedSectionindex + 1);
    }
  }
  function prevFormSection() {
    if (selectedSectionindex > 0) {
      setSelectedSectionindex(selectedSectionindex - 1);
    }
  }
  function shareCv() {
    const frontendUrl = window.location.href.split("/");
    const resumeUrl = `${frontendUrl[0]}//${frontendUrl[2]}/view/${resumeData._id}`;
    navigator.clipboard.writeText(resumeUrl);
    navigate(`${resumeUrl}`);
  }

  const sections = [
    { id: "personalInfo", title: "Personal Information" },
    { id: "professional_summary", title: "Professional Summary" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "projects", title: "Projects" },
    { id: "skills", title: "Skills" },
  ];

  useEffect(() => {
    async function loadExsistingResume() {
      try {
        const id = window.location.href.split("/").pop();
        const response = await api.get(`resume/data/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.resume);
        setResumeData(response.data.resume);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Failed to load resume");
      }
    }
    loadExsistingResume();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-left">
        <button className="btn btn-ghost normal-case text-xl bg-indigo-500 border-l-white p-3 rounded-lg text-white hover:bg-indigo-600">
          <Link to="/app">back</Link>
        </button>
      </div>
      {/* controls */}
      <div className="flex flex-row justify-end items-end mt-3 gap-3">
        <button
          className="cursor-pointer normal-case text-xl bg-white-500 p-3 rounded-lg text-indigo-600 border-indigo-600 border-2"
          onClick={() => nextFormSection()}
          disabled={selectedSectionindex === sections.length - 1}
        >
          next
        </button>
        <button
          className="cursor-pointer normal-case text-xl bg-white-500 p-3 rounded-lg text-indigo-600 border-indigo-600 border-2"
          onClick={() => prevFormSection()}
          disabled={selectedSectionindex === 0}
        >
          previous
        </button>
        <button
          className="cursor-pointer normal-case text-xl bg-white-500 p-3 rounded-lg text-indigo-600 border-indigo-600 border-2"
          onClick={() => shareCv()}
        >
          share
        </button>
      </div>
      <div className="flex md:flex-row  flex-col justify-center items-center p-3 gap-3 mt-5 relative">
        {/* forms content */}
        <div className="md:w-3/5 w-full flex flex-col p-3 rounded-lg border-2 border-indigo-500 md:absolute top-0 left-0 bg-white z-10 h-[700px] overflow-y-auto">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold mb-4">
              {sections[selectedSectionindex].title}
            </h2>
            <div className="text-sm">
              <select
                name="template"
                id="template"
                className="border border-gray-300 p-2 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                onClick={(e) =>
                  setResumeData({ ...resumeData, templates: e.target.value })
                }
              >
                <option value="classic" className="">
                  Classic Template
                </option>
                <option value="modern" className="">
                  Modern Template
                </option>
                <option value="minimal" className="">
                  Minimal Template
                </option>
              </select>
              <select
                name="color"
                id="color"
                className="border ml-3 border-gray-300 p-2 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                onClick={(e) =>
                  setResumeData({ ...resumeData, accent_color: e.target.value })
                }
              >
                <option value="red" className="text-red-500">
                  Red
                </option>
                <option value="blue" className="text-blue-500">
                  Blue
                </option>
                <option value="green" className="text-green-500">
                  Green
                </option>
                <option value="purple" className="text-purple-500">
                  Purple
                </option>
              </select>
            </div>
          </div>
          {/* form fields based on selected section */}
          {selectedSectionindex === 0 && (
            <PersonalInfo
              data={resumeData.personal_info}
              change={(newData) =>
                setResumeData({ ...resumeData, personal_info: newData })
              }
            />
          )}
          {selectedSectionindex === 1 && (
            <ProfessionalSummary
              data={resumeData.professional_summary}
              change={(newData) =>
                setResumeData({ ...resumeData, professional_summary: newData })
              }
            />
          )}
          {selectedSectionindex === 2 && (
            <Experience
              data={resumeData.experience}
              change={(newData) =>
                setResumeData({ ...resumeData, experience: newData })
              }
            />
          )}
          {selectedSectionindex === 3 && (
            <Education
              data={resumeData.education}
              change={(newData) =>
                setResumeData({ ...resumeData, education: newData })
              }
            />
          )}
          {selectedSectionindex === 4 && (
            <Projects
              data={resumeData.projects}
              change={(newData) =>
                setResumeData({ ...resumeData, projects: newData })
              }
            />
          )}
          {selectedSectionindex === 5 && (
            <Skills
              data={resumeData.skills}
              change={(newData) =>
                setResumeData({ ...resumeData, skills: newData })
              }
            />
          )}
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all font-semibold"
            onClick={() => saveResume()}
          >
            Save changes
          </button>
        </div>
        {/* preview content */}
        <div className="md:w-1/3 w-full flex flex-col p-3 md:absolute top-0 right-0 z-10 border-2 border-indigo-500 rounded-lg bg-white h-[700px] overflow-y-auto">
          {selectedTemplate === "classic" && (
            <ClassicTemplate
              data={resumeData}
              accentColor={resumeData.accent_color}
            />
          )}
          {selectedTemplate === "modern" && (
            <ModernTemplate
              data={resumeData}
              accentColor={resumeData.accent_color}
            />
          )}
          {selectedTemplate === "minimal" && (
            <MinimalTemplate
              data={resumeData}
              accentColor={resumeData.accent_color}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CVBuilder;
