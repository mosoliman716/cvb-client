const ATS_Template = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    // Return a compact, human-readable date (e.g., "Jun 2024")
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const renderBullets = (text) => {
    if (!text) return null;
    // Split on newlines and render as list items for ATS parsing
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return null;
    return (
      <ul>
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{ maxWidth: 800, margin: "0 auto", padding: 20, color: "#111" }}
    >
      {/* Header - keep simple and text-first for ATS */}
      <header>
        <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 6 }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div style={{ fontSize: 13, color: "#444", lineHeight: 1.4 }}>
          {data.personal_info?.email && (
            <div>Email: {data.personal_info.email}</div>
          )}
          {data.personal_info?.phone && (
            <div>Phone: {data.personal_info.phone}</div>
          )}
          {data.personal_info?.location && (
            <div>Location: {data.personal_info.location}</div>
          )}
          {data.personal_info?.linkedin && (
            <div>LinkedIn: {data.personal_info.linkedin}</div>
          )}
          {data.personal_info?.website && (
            <div>Website: {data.personal_info.website}</div>
          )}
           {data.personal_info?.profession && (
            <div>Profession: {data.personal_info.profession}</div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section style={{ marginTop: 16 }}>
          <h2
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Professional Summary
          </h2>
          <p style={{ color: "#333" }}>{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Experience
          </h2>

          {data.experience.map((exp, index) => (
            <div key={index} style={{ marginTop: 12 }}>
              <div>
                <strong>{exp.position}</strong>
                {exp.company && <span> — {exp.company}</span>}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {formatDate(exp.start_date)} -{" "}
                {exp.is_current ? "Present" : formatDate(exp.end_date)}
              </div>
              {exp.description && (
                <div style={{ marginTop: 6 }}>
                  {" "}
                  {renderBullets(exp.description)}{" "}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Projects
          </h2>
          <ul>
            {data.projects.map((proj, index) => (
              <li key={index} style={{ marginTop: 8 }}>
                <strong>{proj.name}</strong>
                {proj.description && <div>{proj.description}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Education
          </h2>
          <ul>
            {data.education.map((edu, index) => (
              <li key={index} style={{ marginTop: 8 }}>
                <div>
                  <strong>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </strong>
                </div>
                <div>{edu.institution}</div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
                {edu.graduation_date && (
                  <div>{formatDate(edu.graduation_date)}</div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Skills
          </h2>
          <ul style={{ columns: 2, gap: 12 }}>
            {data.skills.map((skill, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ATS_Template;
