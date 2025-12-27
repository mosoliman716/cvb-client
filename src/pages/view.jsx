import ClassicTemplate from "../assets/templates/ClassicTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import MinimalTemplate from "../assets/templates/MinimalTemplate";
import Data from "../assets/assets";

function View() {
    const resumeid =  window.location.pathname.split("/").pop();;

    const resumeData = Data.find((resume) => resume._id === resumeid);

    if (resumeData) {
        console.log("Resume Data:", resumeData);
    }

    return(
        <>
           {resumeData.template === "classic" && <ClassicTemplate data={resumeData} accentColor={resumeData.accent_color}/>}
           {resumeData.template === "modern" && <ModernTemplate data={resumeData} accentColor={resumeData.accent_color}/>}
           {resumeData.template === "minimal" && <MinimalTemplate data={resumeData} accentColor={resumeData.accent_color}/>}
        </>
    )
}

export default View;