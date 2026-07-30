import { useState } from "react";

const LEADS_URL = "https://kbutjoxdyolamecjjcny.supabase.co";
const LEADS_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidXRqb3hkeW9sYW1lY2pqY255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTQ1MTMsImV4cCI6MjA4NzE3MDUxM30.SbH2YxcT3AJDC2ztNRLobBOFaWCs8n_xGWAkX5OSVds";
const LOGO_URL = "https://images2.imgbox.com/26/e7/4aGfmDdL_o.jpg";

const STUDY_LEVELS = ["Foundation", "Undergraduate / Bachelor's", "Master's", "PhD", "Language Course"];
const BUDGETS = ["$40,000+/year", "$25,000–$40,000/year", "$15,000–$25,000/year", "Under $15,000/year", "Not sure yet"];
const ENGLISH_LEVELS = ["IELTS 8.0+", "IELTS 7.5", "IELTS 7.0", "IELTS 6.5", "IELTS 6.0", "IELTS 5.5", "IELTS 5.0 or below", "TOEFL 100+", "TOEFL 80–100", "B2 / Upper Intermediate", "B1 / Intermediate", "Currently preparing", "No test yet"];
const INTAKES = ["September 2025", "January 2026", "September 2026", "January 2027", "September 2027"];
const STUDY_COUNTRIES = ["UK", "USA", "UAE", "Canada", "Australia", "New Zealand", "Germany", "Ireland", "Netherlands", "France", "Not decided yet"];

interface FormData {
  full_name: string;
  email: string;
  whatsapp: string;
  postal_address: string;
  country_from: string;
  country: string;
  study_level: string;
  specialisation: string;
  intake: string;
  ielts: string;
  budget: string;
  academic_background: string;
  graduation_year: string;
}

const EMPTY: FormData = {
  full_name: "",
  email: "",
  whatsapp: "",
  postal_address: "",
  country_from: "",
  country: "",
  study_level: "",
  specialisation: "",
  intake: "",
  ielts: "",
  budget: "",
  academic_background: "",
  graduation_year: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.whatsapp) {
      setError("Please fill in your name, email and WhatsApp number.");
      return;
    }
    setLoading(true);
    try {
      const notes = [
        form.postal_address ? `Postal address: ${form.postal_address}` : "",
        form.graduation_year ? `Graduated: ${form.graduation_year}` : "",
      ].filter(Boolean).join(" | ");

      // Calculate score directly from form data
      const budget = form.budget.toLowerCase();
      const intake = form.intake.toLowerCase();
      let score = 0;
      if (budget.includes("40,000")) score += 45;
      else if (budget.includes("25,000")) score += 35;
      else if (budget.includes("15,000") && !budget.includes("under")) score += 20;
      else if (budget.includes("under")) score += 8;
      else score += 5;
      if (intake.includes("2026")) score += 25;
      else if (intake.includes("january 2027") || intake.includes("jan 2027")) score += 18;
      else if (intake.includes("2027")) score += 10;
      else if (intake.includes("2028")) score += 5;
      else score += 2;
      if (form.whatsapp && form.email) score += 20;
      else if (form.whatsapp || form.email) score += 10;
      if (form.country) score += 10;
      else score += 3;
      const scoreLabel = score >= 70 ? "Hot" : score >= 40 ? "Warm" : "Cold";

      await fetch(`${LEADS_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": LEADS_KEY,
          "Authorization": `Bearer ${LEADS_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          whatsapp: form.whatsapp,
          phone: form.whatsapp,
          country_from: form.country_from,
          country: form.country,
          study_level: form.study_level,
          specialisation: form.specialisation,
          intake: form.intake,
          ielts: form.ielts,
          budget: form.budget,
          academic_background: form.academic_background
            ? `${form.academic_background}${form.graduation_year ? `, graduated ${form.graduation_year}` : ""}`
            : "",
          notes: notes || null,
          source: "Enquiry Form",
          status: "new",
          contacted: false,
          score_value: score,
          score_label: scoreLabel,
          score_reasoning: "Scored from enquiry form data.",
        }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1.5px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: 14,
    color: "#111",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  };

  const sectionStyle: React.CSSProperties = {
    background: "#fff",
    border: "1.5px solid #e5e7eb",
    borderRadius: 20,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 800,
    color: "#FF5A0A",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    paddingBottom: 12,
    borderBottom: "1px solid #f3f4f6",
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 24, padding: 48, textAlign: "center", maxWidth: 480, width: "100%" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #FF5A0A, #ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>✓</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#111", marginBottom: 10 }}>Application Received!</h2>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 28 }}>
            Thank you for reaching out to Universe In. One of our consultants will personally contact you on WhatsApp within 24 hours with your personalised university options.
          </p>
          <div style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: 16, marginBottom: 28 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Questions? Contact us at</p>
            <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700, color: "#FF5A0A" }}>info@universein.uk</p>
            <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 700, color: "#FF5A0A" }}>+44 7459 639803</p>
          </div>
          <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #FF5A0A, #ff8c00)", color: "#fff", padding: "12px 32px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <img src={LOGO_URL} alt="Universe In" style={{ width: 36, height: 36, borderRadius: 9, objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>Universe<span style={{ color: "#FF5A0A" }}>.in</span></div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Student Enquiry Form</div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #FF5A0A, #ff8c00)", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.5px" }}>
          Student Enquiry Form
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, margin: 0, lineHeight: 1.7, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
          Fill in your details below and our team will get back to you within 24 hours with personalised university options.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          {["Free consultation", "No commitment", "Response within 24h"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 600 }}>
              <span style={{ color: "#fff", fontWeight: 900 }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 16px 64px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* PERSONAL INFO */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Student Information</div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name <span style={{ color: "#FF5A0A" }}>*</span></label>
              <input
                style={inputStyle}
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                placeholder="e.g. Aziz Karimov"
                required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address <span style={{ color: "#FF5A0A" }}>*</span></label>
              <input
                style={inputStyle}
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>WhatsApp / Telephone <span style={{ color: "#FF5A0A" }}>*</span></label>
              <input
                style={inputStyle}
                type="tel"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="+998 XX XXX XXXX"
                required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Postal Address</label>
              <input
                style={inputStyle}
                value={form.postal_address}
                onChange={(e) => set("postal_address", e.target.value)}
                placeholder="Your current address"
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Country of Citizenship</label>
              <input
                style={inputStyle}
                value={form.country_from}
                onChange={(e) => set("country_from", e.target.value)}
                placeholder="e.g. Uzbekistan"
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>

          {/* STUDY PREFERENCES */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Study Preferences</div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Preferred Study Country</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select a country</option>
                {STUDY_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Preferred Course Level</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.study_level}
                onChange={(e) => set("study_level", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select a level</option>
                {STUDY_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Specialty / Subject</label>
              <input
                style={inputStyle}
                value={form.specialisation}
                onChange={(e) => set("specialisation", e.target.value)}
                placeholder="e.g. Business, Engineering, Medicine"
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Start Intake Date</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.intake}
                onChange={(e) => set("intake", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select intake</option>
                {INTAKES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>English Proficiency (IELTS/TOEFL score or level)</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.ielts}
                onChange={(e) => set("ielts", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select your English level</option>
                {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Annual Budget (tuition + living)</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select a budget range</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* ACADEMIC BACKGROUND */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Academic Background</div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Completed School / University</label>
              <input
                style={inputStyle}
                value={form.academic_background}
                onChange={(e) => set("academic_background", e.target.value)}
                placeholder="e.g. Tashkent State Technical University"
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Date and Year of Completion</label>
              <input
                style={inputStyle}
                value={form.graduation_year}
                onChange={(e) => set("graduation_year", e.target.value)}
                placeholder="e.g. June 2023"
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,90,10,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#dc2626", fontWeight: 500 }}>
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 14,
              border: "none",
              background: loading ? "#f3f4f6" : "linear-gradient(135deg, #FF5A0A, #ff8c00)",
              color: loading ? "#9ca3af" : "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? "default" : "pointer",
              fontFamily: "inherit",
              boxShadow: loading ? "none" : "0 8px 32px rgba(255,90,10,0.3)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Submitting..." : "Submit Enquiry →"}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", margin: 0 }}>
            By submitting this form you agree to be contacted by Universe In regarding your study abroad enquiry.
          </p>

        </form>

        {/* FOOTER */}
        <div style={{ marginTop: 40, padding: "24px 0", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Universe In Limited</p>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 4px" }}>27 Inglis Way, Wrest House NW7 1TP, London, UK</p>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 4px" }}>
            <a href="tel:+447459639803" style={{ color: "#FF5A0A", textDecoration: "none" }}>+44 7459 639803</a>
            {" · "}
            <a href="mailto:info@universein.uk" style={{ color: "#FF5A0A", textDecoration: "none" }}>info@universein.uk</a>
          </p>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
            <a href="https://uni-in.co.uk" style={{ color: "#FF5A0A", textDecoration: "none" }}>uni-in.co.uk</a>
            {" · "}
            <a href="https://t.me/UNIVERSITY_IN" style={{ color: "#FF5A0A", textDecoration: "none" }}>t.me/UNIVERSITY_IN</a>
            {" · "}
            <span style={{ color: "#9ca3af" }}>@uni.in.uk</span>
          </p>
        </div>
      </div>
    </div>
  );
}