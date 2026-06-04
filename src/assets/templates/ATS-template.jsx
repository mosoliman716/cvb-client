const ATS_Template = ({ data }) => {
  const styles = {
    container: {
      maxWidth: 820,
      margin: "0 auto",
      padding: 22,
      color: "#111",
      fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    headerGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 260px",
      gap: 12,
      alignItems: "start",
    },
    name: { fontSize: 30, fontWeight: 600, margin: 0, color: "#0b1220" },
    profession: { fontSize: 13, color: "#55606a", marginTop: 6 },
    contact: { fontSize: 13, color: "#334155", lineHeight: 1.5 },
    section: { marginTop: 18 },
    sectionTitle: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: "#334155",
      marginBottom: 8,
      borderBottom: "1px solid #e6e9ee",
      paddingBottom: 6,
    },
    muted: { color: "#55606a", fontSize: 13 },
    date: { fontSize: 12, color: "#6b7280" },
    ul: { marginTop: 6, paddingLeft: 18 },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 6,
      marginTop: 6,
    },
    divider: { height: 1, background: "#eef2f6", margin: "14px 0" },
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    try {
      return new Date(year, (month || 1) - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch (e) {
      console.log(e);
      return dateStr;
    }
  };

  const renderBullets = (text) => {
    if (!text) return null;
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return null;
    return (
      <ul style={styles.ul}>
        {lines.map((line, i) => (
          <li key={i} style={{ marginBottom: 6, color: "#1f2937" }}>
            {line}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.headerGrid}>
        <div>
          <h1 style={styles.name}>
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <div style={styles.profession}>{data.personal_info.profession}</div>
          )}
        </div>

        <div style={styles.contact}>
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
        </div>
      </header>

      <div style={styles.divider} />

      {data.professional_summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.muted}>{data.professional_summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} style={{ marginTop: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: "#0b1220" }}>
                    {exp.position || "Position"}
                  </div>
                  {exp.company && (
                    <div style={{ color: "#475569" }}>{exp.company}</div>
                  )}
                </div>
                <div style={styles.date}>
                  {formatDate(exp.start_date)} —{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </div>
              </div>
              {exp.description && <div>{renderBullets(exp.description)}</div>}
            </div>
          ))}
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          <ul style={styles.ul}>
            {data.projects.map((proj, index) => (
              <li key={index} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{proj.name}</div>
                {proj.description && (
                  <div style={{ color: "#475569" }}>{proj.description}</div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          <ul style={styles.ul}>
            {data.education.map((edu, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 600 }}>
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}
                </div>
                <div style={{ color: "#475569" }}>{edu.institution}</div>
                {edu.gpa && (
                  <div style={{ color: "#6b7280" }}>GPA: {edu.gpa}</div>
                )}
                {edu.graduation_date && (
                  <div style={{ color: "#6b7280" }}>
                    {formatDate(edu.graduation_date)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsGrid}>
            {data.skills.map((skill, i) => (
              <div key={i} style={{ color: "#0b1220" }}>
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ATS_Template;
