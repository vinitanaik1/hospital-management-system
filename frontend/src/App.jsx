import { useEffect, useState } from "react";
import "./App.css";
import hospitalPhoto from "./assets/hospital-photo.jpeg";
import hospitalLogo from "./assets/hospital-logo.jpeg";

const API = "http://localhost:8083/api/v1";

const modules = [
  { name: "Patients", icon: "👤", key: "patient" },
  { name: "Doctors", icon: "👨‍⚕️", key: "doctor" },
  { name: "Appointments", icon: "📅", key: "appointment" },
  { name: "Admissions", icon: "🏥", key: "admission" },
  { name: "Bills", icon: "💳", key: "bill" },
  { name: "Departments", icon: "🏢", key: "department" },
  { name: "Lab Tests", icon: "🧪", key: "labTest" },
  { name: "Medicines", icon: "💊", key: "medicine" },
  { name: "Prescriptions", icon: "📋", key: "prescription" },
  { name: "Rooms", icon: "🛏️", key: "room" },
  { name: "Treatments", icon: "🩺", key: "treatment" },
];

const emptyPatient = {
  patientId: "",
  patientName: "",
  age: "",
  gender: "",
  phoneNumber: "",
  address: "",
  bloodGroup: "",
  emergencyContact: "",
  medicalHistory: "",
};

const emptyDoctor = {
  doctorId: "",
  doctorName: "",
  specialization: "",
  qualification: "",
  phoneNumber: "",
  email: "",
  departmentId: "",
};

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API}/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );


      if (response.ok) {

        const admin = await response.json();

        localStorage.setItem(
          "admin",
          JSON.stringify(admin)
        );

        onLogin(admin);

      } else {

        setError(
          "Invalid username or password."
        );

      }

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to backend."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

      <div className="login-page"
  style={{ "--hospital-photo": `url(${hospitalPhoto})` }}
>

      <div className="login-card">
        <div className="login-image">
  <img src={hospitalPhoto} alt="Hospital" />
</div>

        <div className="login-icon">
  <img src={hospitalLogo} alt="Hospital Logo" />
</div>

        <h1>
          Hospital Management
        </h1>

        <p className="login-subtitle">
          Administrator Login
        </p>


        <form onSubmit={handleLogin}>

          <div className="login-field">

            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
              autoComplete="username"
            />

          </div>


          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
            />

          </div>


          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        <div className="login-footer">
          Hospital Management System
        </div>

      </div>

    </div>

  );
}

function App() {
  
  const [admin, setAdmin] = useState(() => {

  const savedAdmin =
    localStorage.getItem("admin");

  return savedAdmin
    ? JSON.parse(savedAdmin)
    : null;
});


  const [selectedModule, setSelectedModule] = useState(null);

  const handleLogout = () => {
  localStorage.removeItem("admin");
  setAdmin(null);
  setSelectedModule(null);
};

  const selected =
    modules.find((module) => module.key === selectedModule);

    if (!admin) {
  return (
    <Login
      onLogin={setAdmin}
    />
  );
}

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="logo">
          <span className="logo-icon">🏥</span>
          <div>
            <strong>Hospital</strong>
            <span>Management</span>
          </div>
        </div>

        <button
          className={!selectedModule ? "menu active" : "menu"}
          onClick={() => setSelectedModule(null)}
        >
          <span>🏠</span>
          Dashboard
        </button>

        <p className="menu-title">MODULES</p>

        {modules.map((module) => (
          <button
            key={module.key}
            className={
              selectedModule === module.key
                ? "menu active"
                : "menu"
            }
            onClick={() => setSelectedModule(module.key)}
          >
            <span>{module.icon}</span>
            {module.name}
          </button>
        ))}

      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">

        <header className="header">

          <div>
            <h1>
              {selected ? selected.name : "Hospital Dashboard"}
            </h1>

            <p>
              {selected
                ? `Manage hospital ${selected.name.toLowerCase()}`
                : "Hospital Management System"}
            </p>
          </div>

       <div className="admin">
  <span>👤</span>

  <div>
    <strong>Admin</strong>
    <small>Administrator</small>
  </div>

  <button
    className="admin-logout"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

        </header>

        {!selectedModule && (
          <Dashboard
  onSelectModule={setSelectedModule}
  
/>
        )}

        {selectedModule && (
          <ModulePage module={selected} />
        )}

      </main>
    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ onSelectModule}) {

  return (
    <div className="dashboard">

      <section className="welcome">

        <div>
          <span className="welcome-label">
            HOSPITAL MANAGEMENT SYSTEM
          </span>

          <h2>
            Welcome back, Admin 👋
          </h2>

         

          <p>
            Manage patients, doctors, appointments and
            hospital operations from one centralized system.
          </p>
        </div>

        <div className="welcome-icon">
          🏥
        </div>

      </section>


      <h2 className="section-title">
        Hospital Modules
      </h2>

      <div className="cards">

        {modules.map((module) => (

          <button
            className="card"
            key={module.key}
            onClick={() => onSelectModule(module.key)}
          >

            <div className="card-top">

              <div className="card-icon">
                {module.icon}
              </div>

              <span className="arrow">
                →
              </span>

            </div>

            <div>
              <h3>{module.name}</h3>

              <p>
                Manage {module.name.toLowerCase()}
              </p>
            </div>

          </button>

        ))}

      </div>

    </div>
  );
}


/* =====================================================
   MODULE PAGE
===================================================== */

function ModulePage({ module }) {

  /*
   * Patient functionality is connected to the
   * existing Spring Boot backend.
   *
   * Other modules currently show the professional
   * management UI and can be connected to their
   * respective controllers one by one.
   */

  if (module.key === "patient") {
    return <PatientManagement />;
  }

  if (module.key === "doctor") {
  return <DoctorManagement />;
}
if (module.key === "appointment") {
  return <AppointmentManagement />;
}

if (module.key === "admission") {
  return <AdmissionManagement />;
}
  
if (module.key === "bill") {
  return <BillManagement />;
}

if (module.key === "department") {
  return <DepartmentManagement />;
}

if (module.key === "labTest") {
  return <LabTestManagement />;
}

if (module.key === "medicine") {
  return <MedicineManagement />;
}

if (module.key === "prescription") {
  return <PrescriptionManagement />;
}

if (module.key === "room") {
  return <RoomManagement />;
}

if (module.key === "treatment") {
  return <TreatmentManagement />;
}
  return (
    <div className="module-page">

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            {module.icon}
          </div>

          <div>
            <span className="page-label">
              HOSPITAL MODULE
            </span>

            <h2>
              {module.name} Management
            </h2>

            <p>
              Manage hospital {module.name.toLowerCase()}
              efficiently.
            </p>
          </div>

        </div>

        <button className="primary-button">
          + Add {module.name.slice(0, -1)}
        </button>

      </section>


      <section className="coming-card">

        <div className="coming-icon">
          {module.icon}
        </div>

        <h3>
          {module.name} Management
        </h3>

        <p>
          The {module.name.toLowerCase()} management
          interface is ready for backend integration.
        </p>

      </section>

    </div>
  );

  
}


/* =====================================================
   PATIENT MANAGEMENT
===================================================== */

function PatientManagement() {

  const [patients, setPatients] = useState([]);
   const [allPatients, setAllPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editing, setEditing] = useState(false);

  const [patientForm, setPatientForm] =
    useState(emptyPatient);

  const [searchId, setSearchId] = useState("");

  const [searchName, setSearchName] = useState("");
const [searchPhone, setSearchPhone] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] =
    useState("success");


  /* ================= GET ALL ================= */

  const loadPatients = async () => {

    try {

      const response = await fetch(
        `${API}/patient/getAllPatients`
      );

      const data = await response.json();

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        /*
         * Only show valid ages.
         * Age 0 and negative values are excluded.
         */

        const validPatients =
          data.content.filter(
            (patient) =>
              Number(patient.age) > 0
          );

        setAllPatients(validPatients);
        setPatients(validPatients);

      } else {

        setPatients([]);

      }

    } catch (error) {

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );

    }
  };


  useEffect(() => {
    loadPatients();
  }, []);


  /* ================= MESSAGE ================= */

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setPatientForm({
      ...patientForm,
      [name]: value,
    });
  };


  /* ================= OPEN ADD ================= */

  const openAddForm = () => {

    setPatientForm(emptyPatient);
    setEditing(false);
    setShowForm(true);
    setMessage("");
  };


  /* ================= EDIT ================= */

  const editPatient = (patient) => {

    setPatientForm({
      patientId: patient.patientId,
      patientName: patient.patientName || "",
      age: patient.age || "",
      gender: patient.gender || "",
      phoneNumber: patient.phoneNumber || "",
      address: patient.address || "",
      bloodGroup: patient.bloodGroup || "",
      emergencyContact:
        patient.emergencyContact || "",
      medicalHistory:
        patient.medicalHistory || "",
    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* ================= SAVE / UPDATE ================= */

  const savePatient = async (e) => {

    e.preventDefault();

    const age = Number(patientForm.age);

    /* AGE VALIDATION */

    if (!Number.isInteger(age) || age < 1 || age > 120) {

      showMessage(
        "Age must be between 1 and 120.",
        "error"
      );

      return;
    }


    /* PHONE VALIDATION */

    if (
      patientForm.phoneNumber &&
      !/^[0-9]{10}$/.test(
        patientForm.phoneNumber
      )
    ) {

      showMessage(
        "Phone number must contain exactly 10 digits.",
        "error"
      );

      return;
    }


    /* EMERGENCY CONTACT */

    if (
      patientForm.emergencyContact &&
      !/^[0-9]{10}$/.test(
        patientForm.emergencyContact
      )
    ) {

      showMessage(
        "Emergency contact must contain exactly 10 digits.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${API}/patient/updatePatient`
        : `${API}/patient/savePatient`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {
        ...patientForm,
        age: age,
        patientId:
          patientForm.patientId
            ? Number(patientForm.patientId)
            : null,
      };


      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });


      const result = await response.json();


      if (response.ok) {

        showMessage(
          editing
            ? "Patient updated successfully."
            : "Patient saved successfully.",
          "success"
        );

        setPatientForm(emptyPatient);
        setEditing(false);
        setShowForm(false);

        await loadPatients();

      } else {

        showMessage(
          result.message ||
          "Unable to save patient.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  /* ================= SEARCH ================= */
   const searchPatient = () => {
    const id = searchId.trim();
    const name = searchName.trim().toLowerCase();
    const phone = searchPhone.trim();

    if (!id && !name && !phone) {
        loadPatients();
        return;
    }

    const filteredPatients = allPatients.filter((patient) => {
        const patientId = String(patient.patientId || "");
        const patientName = String(patient.patientName || "").toLowerCase();
        const patientPhone = String(patient.phoneNumber || "");

return (
    (!id || patientId === id) &&
    (!name || patientName.includes(name)) &&
    (!phone || patientPhone.includes(phone))
);
    });

    setPatients(filteredPatients);

    if (filteredPatients.length === 0) {
        showMessage("No patients found", "error");
    } else {
        showMessage(
            `${filteredPatients.length} patient(s) found`,
            "success"
        );
    }
};
  
          

   

  /* ================= DELETE ================= */

  const deletePatient = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this patient?"
      );

    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/patient/deletePatient/${id}`,
        {
          method: "DELETE",
        }
      );


      if (response.ok) {

        showMessage(
          "Patient deleted successfully.",
          "success"
        );

        await loadPatients();

      } else {

        showMessage(
          "Unable to delete patient.",
          "error"
        );

      }

    } catch (error) {

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  /* ================= CANCEL ================= */

  const cancelForm = () => {

    setPatientForm(emptyPatient);
    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  return (

    <div className="module-page">

      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            👤
          </div>

          <div>

            <span className="page-label">
              PATIENT MANAGEMENT
            </span>

            <h2>
              Patients
            </h2>

            <p>
              Add, search, update and manage patient
              information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Patient
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">
                {editing
                  ? "UPDATE PATIENT"
                  : "NEW PATIENT"}
              </span>

              <h3>
                {editing
                  ? "Update Patient Details"
                  : "Add New Patient"}
              </h3>

            </div>

            {editing && (

              <span className="patient-id">
                ID #{patientForm.patientId}
              </span>

            )}

          </div>


          <form
            onSubmit={savePatient}
            className="patient-form"
          >

            {/* NAME */}

            <div className="field">

              <label>
                Patient Name *
              </label>

              <input
                type="text"
                name="patientName"
                value={patientForm.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />

            </div>


            {/* AGE */}

            <div className="field">

              <label>
                Age *
              </label>

              <input
                type="number"
                name="age"
                value={patientForm.age}
                onChange={handleChange}
                placeholder="Age"
                min="1"
                max="120"
                required
              />

              <small>
                Age must be between 1 and 120.
              </small>

            </div>


            {/* GENDER */}

            <div className="field">

              <label>
                Gender *
              </label>

              <select
                name="gender"
                value={patientForm.gender}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* PHONE */}

            <div className="field">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={patientForm.phoneNumber}
                onChange={handleChange}
                placeholder="10-digit phone number"
                maxLength="10"
                required
              />

            </div>


            {/* BLOOD GROUP */}

            <div className="field">

              <label>
                Blood Group *
              </label>

              <select
                name="bloodGroup"
                value={patientForm.bloodGroup}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select blood group
                </option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>

              </select>

            </div>


            {/* EMERGENCY */}

            <div className="field">

              <label>
                Emergency Contact
              </label>

              <input
                type="tel"
                name="emergencyContact"
                value={patientForm.emergencyContact}
                onChange={handleChange}
                placeholder="10-digit contact number"
                maxLength="10"
              />

            </div>


            {/* ADDRESS */}

            <div className="field full">

              <label>
                Address
              </label>

              <input
                type="text"
                name="address"
                value={patientForm.address}
                onChange={handleChange}
                placeholder="Enter patient address"
              />

            </div>


            {/* MEDICAL HISTORY */}

            <div className="field full">

              <label>
                Medical History
              </label>

              <textarea
                name="medicalHistory"
                value={patientForm.medicalHistory}
                onChange={handleChange}
                placeholder="Enter relevant medical history"
                rows="4"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editing
                  ? "Update Patient"
                  : "Save Patient"}
              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= SEARCH ================= */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              PATIENT RECORDS
            </span>

            <h3>
              Patient List
            </h3>

          </div>

          <span className="record-count">
            {patients.length} Records
          </span>

        </div>

       <div className="search-bar">

  <div className="search-input">
    <span>🔎</span>
    <input
      type="number"
      min="1"
      value={searchId}
      onChange={(e) => setSearchId(e.target.value)}
      placeholder="Search by Patient ID"
    />
  </div>

  <div className="search-input">
    <span>🔎</span>
    <input
      type="text"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      placeholder="Search by Patient Name"
    />
  </div>

  <div className="search-input">
    <span>📞</span>
    <input
      type="tel"
      value={searchPhone}
      onChange={(e) => setSearchPhone(e.target.value)}
      placeholder="Search by Phone Number"
      maxLength="10"
    />
  </div>

  <button
    className="search-button"
    onClick={searchPatient}
  >
    Search
  </button>

  <button
    className="secondary-button"
    onClick={() => {
      setSearchId("");
      setSearchName("");
      setSearchPhone("");
      loadPatients();
    }}
  >
    Show All
  </button>

</div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Address</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {patients.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty"
                  >
                    <div className="empty-icon">
                      👤
                    </div>

                    <strong>
                      No patients found
                    </strong>

                    <span>
                      Add a patient or search using
                      a Patient ID.
                    </span>

                  </td>

                </tr>

              ) : (

                patients.map((patient) => (

                  <tr
                    key={patient.patientId}
                  >

                    <td>
                      <span className="id-badge">
                        #{patient.patientId}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {patient.patientName}
                      </strong>
                    </td>

                    <td>
                      {patient.age}
                    </td>

                    <td>
                      {patient.gender}
                    </td>

                    <td>
                      {patient.phoneNumber}
                    </td>

                    <td>

                      <span className="blood-badge">
                        {patient.bloodGroup || "N/A"}
                      </span>

                    </td>

                    <td>
                      {patient.address || "N/A"}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editPatient(patient)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            deletePatient(
                              patient.patientId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

// =====================================================
// DOCTOR MANAGEMENT
// =====================================================

/* =====================================================
   DOCTOR MANAGEMENT
===================================================== */

function DoctorManagement() {

  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [doctorForm, setDoctorForm] =
    useState(emptyDoctor);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");


  /* ================= GET ALL DOCTORS ================= */

  const loadDoctors = async () => {

    try {

      const response = await fetch(
        `${API}/doctor/getAllDoctors`
      );

      const data = await response.json();

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAllDoctors(data.content);
        setDoctors(data.content);

      } else {

        setAllDoctors([]);
        setDoctors([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  useEffect(() => {
    loadDoctors();
  }, []);


  /* ================= MESSAGE ================= */

  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };


  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setDoctorForm({
      ...doctorForm,
      [name]: value,
    });

  };


  /* ================= OPEN ADD FORM ================= */

  const openAddForm = () => {

    setDoctorForm(emptyDoctor);
    setEditing(false);
    setShowForm(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ================= EDIT DOCTOR ================= */

  const editDoctor = (doctor) => {

    setDoctorForm({
      doctorId: doctor.doctorId || "",
      doctorName: doctor.doctorName || "",
      specialization: doctor.specialization || "",
      qualification: doctor.qualification || "",
      phoneNumber: doctor.phoneNumber || "",
      email: doctor.email || "",
      departmentId: doctor.departmentId || "",
    });

    setEditing(true);
    setShowForm(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ================= SAVE / UPDATE ================= */

  const saveDoctor = async (e) => {

    e.preventDefault();


    /* PHONE VALIDATION */

    if (
      doctorForm.phoneNumber &&
      !/^[0-9]{10}$/.test(
        doctorForm.phoneNumber
      )
    ) {

      showMessage(
        "Phone number must contain exactly 10 digits.",
        "error"
      );

      return;
    }


    /* EMAIL VALIDATION */

    if (
      doctorForm.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        doctorForm.email
      )
    ) {

      showMessage(
        "Please enter a valid email address.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${API}/doctor/updateDoctor`
        : `${API}/doctor/saveDoctor`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {
        ...doctorForm,

        doctorId:
          doctorForm.doctorId
            ? Number(doctorForm.doctorId)
            : null,

        departmentId:
          doctorForm.departmentId
            ? Number(doctorForm.departmentId)
            : null,
      };


      const response = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        }
      );


      const result =
        await response.json();


      if (response.ok) {

        showMessage(
          editing
            ? "Doctor updated successfully."
            : "Doctor saved successfully.",
          "success"
        );

        setDoctorForm(emptyDoctor);
        setEditing(false);
        setShowForm(false);

        await loadDoctors();

      } else {

        showMessage(
          result.message ||
          "Unable to save doctor.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= SEARCH DOCTORS ================= */

  const searchDoctor = () => {

    const id =
      searchId.trim();

    const name =
      searchName.trim().toLowerCase();

    const phone =
      searchPhone.trim();


    if (!id && !name && !phone) {

      loadDoctors();
      return;

    }


    const filteredDoctors =
      allDoctors.filter((doctor) => {

        const doctorId =
          String(
            doctor.doctorId || ""
          );

        const doctorName =
          String(
            doctor.doctorName || ""
          ).toLowerCase();

        const doctorPhone =
          String(
            doctor.phoneNumber || ""
          );


        return (

          (!id ||
            doctorId === id) &&

          (!name ||
            doctorName.includes(name)) &&

          (!phone ||
            doctorPhone.includes(phone))

        );

      });


    setDoctors(filteredDoctors);


    if (filteredDoctors.length === 0) {

      showMessage(
        "No doctors found.",
        "error"
      );

    } else {

      showMessage(
        `${filteredDoctors.length} doctor(s) found.`,
        "success"
      );

    }

  };


  /* ================= DELETE DOCTOR ================= */

  const deleteDoctor = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this doctor?"
      );


    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/doctor/deleteDoctor/${id}`,
        {
          method: "DELETE",
        }
      );


      if (response.ok) {

        showMessage(
          "Doctor deleted successfully.",
          "success"
        );

        await loadDoctors();

      } else {

        showMessage(
          "Unable to delete doctor.",
          "error"
        );

      }

    } catch (error) {

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= CANCEL FORM ================= */

  const cancelForm = () => {

    setDoctorForm(emptyDoctor);
    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  /* ================= UI ================= */

  return (

    <div className="module-page">


      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            👨‍⚕️
          </div>

          <div>

            <span className="page-label">
              DOCTOR MANAGEMENT
            </span>

            <h2>
              Doctors
            </h2>

            <p>
              Add, search, update and manage doctor
              information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Doctor
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE DOCTOR"
                  : "NEW DOCTOR"}

              </span>

              <h3>

                {editing
                  ? "Update Doctor Details"
                  : "Add New Doctor"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{doctorForm.doctorId}

              </span>

            )}

          </div>


          <form
            onSubmit={saveDoctor}
            className="patient-form"
          >


            {/* DOCTOR NAME */}

            <div className="field">

              <label>
                Doctor Name *
              </label>

              <input
                type="text"
                name="doctorName"
                value={doctorForm.doctorName}
                onChange={handleChange}
                placeholder="Enter doctor name"
                required
              />

            </div>


            {/* SPECIALIZATION */}

            <div className="field">

              <label>
                Specialization *
              </label>

              <input
                type="text"
                name="specialization"
                value={doctorForm.specialization}
                onChange={handleChange}
                placeholder="e.g. Cardiologist"
                required
              />

            </div>


            {/* QUALIFICATION */}

            <div className="field">

              <label>
                Qualification *
              </label>

              <input
                type="text"
                name="qualification"
                value={doctorForm.qualification}
                onChange={handleChange}
                placeholder="e.g. MBBS, MD"
                required
              />

            </div>


            {/* PHONE */}

            <div className="field">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={doctorForm.phoneNumber}
                onChange={handleChange}
                placeholder="10-digit phone number"
                maxLength="10"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="field">

              <label>
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={doctorForm.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />

            </div>


            {/* DEPARTMENT */}

            <div className="field">

              <label>
                Department ID *
              </label>

              <input
                type="number"
                name="departmentId"
                value={doctorForm.departmentId}
                onChange={handleChange}
                placeholder="Enter department ID"
                min="1"
                required
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Doctor"
                  : "Save Doctor"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= DOCTOR RECORDS ================= */}

      <section className="patient-list-card">


        <div className="list-header">

          <div>

            <span className="page-label">
              DOCTOR RECORDS
            </span>

            <h3>
              Doctor List
            </h3>

          </div>


          <span className="record-count">
            {doctors.length} Records
          </span>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-bar">


          <div className="search-input">

            <span>
              🔎
            </span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Doctor ID"
            />

          </div>


          <div className="search-input">

            <span>
              🔎
            </span>

            <input
              type="text"
              value={searchName}
              onChange={(e) =>
                setSearchName(e.target.value)
              }
              placeholder="Search by Doctor Name"
            />

          </div>


          <div className="search-input">

            <span>
              📞
            </span>

            <input
              type="tel"
              value={searchPhone}
              onChange={(e) =>
                setSearchPhone(e.target.value)
              }
              placeholder="Search by Phone Number"
              maxLength="10"
            />

          </div>


          <button
            className="search-button"
            onClick={searchDoctor}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");
              setSearchName("");
              setSearchPhone("");

              loadDoctors();

            }}
          >
            Show All
          </button>

        </div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {doctors.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty"
                  >

                    <div className="empty-icon">
                      👨‍⚕️
                    </div>

                    <strong>
                      No doctors found
                    </strong>

                    <span>
                      Add a doctor or search using
                      a Doctor ID.
                    </span>

                  </td>

                </tr>

              ) : (

                doctors.map((doctor) => (

                  <tr
                    key={doctor.doctorId}
                  >


                    {/* ID */}

                    <td>

                      <span className="id-badge">
                        #{doctor.doctorId}
                      </span>

                    </td>


                    {/* NAME */}

                    <td>

                      <strong>
                        {doctor.doctorName}
                      </strong>

                    </td>


                    {/* SPECIALIZATION */}

                    <td>
                      {doctor.specialization}
                    </td>


                    {/* QUALIFICATION */}

                    <td>
                      {doctor.qualification}
                    </td>


                    {/* PHONE */}

                    <td>
                      {doctor.phoneNumber}
                    </td>


                    {/* EMAIL */}

                    <td>
                      {doctor.email}
                    </td>


                    {/* DEPARTMENT */}

                    <td>

                      <span className="blood-badge">
                        {doctor.departmentId || "N/A"}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editDoctor(doctor)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteDoctor(
                              doctor.doctorId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

// =====================================================
// APPOINTMENT MANAGEMENT
// =====================================================

function AppointmentManagement() {

  const [appointments, setAppointments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    appointmentId: "",
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    status: ""
  });

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


  // =====================================================
  // LOAD ALL APPOINTMENTS
  // =====================================================

  const loadAppointments = async () => {

    try {

      const response = await fetch(
        `${API}/appointment/getAllAppointments`
      );

      const data = await response.json();

        if (Array.isArray(data.content)) {
        setAppointments(data.content);
      } else {
        setAppointments([]);
      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );

      setAppointments([]);
    }
  };


  useEffect(() => {
    loadAppointments();
  }, []);


  // =====================================================
  // MESSAGE
  // =====================================================

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleAppointmentChange = (e) => {

    const { name, value } = e.target;

    setAppointmentForm({
      ...appointmentForm,
      [name]: value
    });
  };


  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {

    setAppointmentForm({
      appointmentId: "",
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      status: ""
    });

    setEditing(false);
    setShowForm(true);
    setMessage("");
  };


  // =====================================================
  // EDIT APPOINTMENT
  // =====================================================

  const editAppointment = (appointment) => {

    setAppointmentForm({
      appointmentId: appointment.appointmentId || "",
      patientId: appointment.patientId || "",
      doctorId: appointment.doctorId || "",
      appointmentDate: appointment.appointmentDate || "",
      appointmentTime: appointment.appointmentTime || "",
      reason: appointment.reason || "",
      status: appointment.status || ""
    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // =====================================================
  // SAVE / UPDATE
  // =====================================================

  const saveAppointment = async (e) => {

    e.preventDefault();

    if (!appointmentForm.patientId) {

      showMessage(
        "Patient ID is required.",
        "error"
      );

      return;
    }

    if (!appointmentForm.doctorId) {

      showMessage(
        "Doctor ID is required.",
        "error"
      );

      return;
    }

    if (!appointmentForm.appointmentDate) {

      showMessage(
        "Appointment date is required.",
        "error"
      );

      return;
    }

    if (!appointmentForm.appointmentTime) {

      showMessage(
        "Appointment time is required.",
        "error"
      );

      return;
    }

    if (!appointmentForm.status) {

      showMessage(
        "Appointment status is required.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${API}/appointment/updateAppointment`
        : `${API}/appointment/saveAppointment`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {
        appointmentId:
          appointmentForm.appointmentId
            ? Number(appointmentForm.appointmentId)
            : null,

        patientId:
          Number(appointmentForm.patientId),

        doctorId:
          Number(appointmentForm.doctorId),

        appointmentDate:
          appointmentForm.appointmentDate,

        appointmentTime:
          appointmentForm.appointmentTime,

        reason:
          appointmentForm.reason,

        status:
          appointmentForm.status
      };


      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

      });


      const result = await response.json();


      if (response.ok) {

        showMessage(
          editing
            ? "Appointment updated successfully."
            : "Appointment saved successfully.",
          "success"
        );

        setAppointmentForm({
          appointmentId: "",
          patientId: "",
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          reason: "",
          status: ""
        });

        setEditing(false);
        setShowForm(false);

        await loadAppointments();

      } else {

        showMessage(
          result.message ||
          "Unable to save appointment.",
          "error"
        );
      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );
    }
  };


  // =====================================================
  // SEARCH APPOINTMENT
  // =====================================================

  const searchAppointment = async () => {

    const id = searchId.trim();

    if (!id) {

      await loadAppointments();
      return;
    }


    try {

      const response = await fetch(
        `${API}/appointment/searchAppointment/${id}`
      );

      const data = await response.json();
      
      if (data.content) {

        setAppointments([data.content]);

        showMessage(
          "Appointment found.",
          "success"
        );

      } else {

        setAppointments([]);

        showMessage(
          "Appointment not found.",
          "error"
        );
      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );
    }
  };


  // =====================================================
  // DELETE APPOINTMENT
  // =====================================================

  const deleteAppointment = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/appointment/deleteAppointment/${id}`,
        {
          method: "DELETE"
        }
      );


      if (response.ok) {

        showMessage(
          "Appointment deleted successfully.",
          "success"
        );

        await loadAppointments();

      } else {

        showMessage(
          "Unable to delete appointment.",
          "error"
        );
      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );
    }
  };


  // =====================================================
  // CANCEL FORM
  // =====================================================

  const cancelForm = () => {

    setAppointmentForm({
      appointmentId: "",
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      status: ""
    });

    setEditing(false);
    setShowForm(false);
    setMessage("");
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="module-page">

      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            📅
          </div>

          <div>

            <span className="page-label">
              APPOINTMENT MANAGEMENT
            </span>

            <h2>
              Appointments
            </h2>

            <p>
              Add, search, update and manage appointment
              information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Appointment
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">
                {editing
                  ? "UPDATE APPOINTMENT"
                  : "NEW APPOINTMENT"}
              </span>

              <h3>
                {editing
                  ? "Update Appointment Details"
                  : "Add New Appointment"}
              </h3>

            </div>


            {editing && (

              <span className="patient-id">
                ID #{appointmentForm.appointmentId}
              </span>

            )}

          </div>


          <form
            onSubmit={saveAppointment}
            className="patient-form"
          >

            {/* PATIENT ID */}

            <div className="field">

              <label>
                Patient ID *
              </label>

              <input
                type="number"
                name="patientId"
                value={appointmentForm.patientId}
                onChange={handleAppointmentChange}
                placeholder="Enter patient ID"
                min="1"
                required
              />

            </div>


            {/* DOCTOR ID */}

            <div className="field">

              <label>
                Doctor ID *
              </label>

              <input
                type="number"
                name="doctorId"
                value={appointmentForm.doctorId}
                onChange={handleAppointmentChange}
                placeholder="Enter doctor ID"
                min="1"
                required
              />

            </div>


            {/* DATE */}

            <div className="field">

              <label>
                Appointment Date *
              </label>

              <input
                type="date"
                name="appointmentDate"
                value={appointmentForm.appointmentDate}
                onChange={handleAppointmentChange}
                required
              />

            </div>


            {/* TIME */}

            <div className="field">

              <label>
                Appointment Time *
              </label>

              <input
                type="time"
                name="appointmentTime"
                value={appointmentForm.appointmentTime}
                onChange={handleAppointmentChange}
                required
              />

            </div>


            {/* STATUS */}

            <div className="field">

              <label>
                Status *
              </label>

              <select
                name="status"
                value={appointmentForm.status}
                onChange={handleAppointmentChange}
                required
              >

                <option value="">
                  Select status
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>


            {/* REASON */}

            <div className="field">

              <label>
                Reason
              </label>

              <input
                type="text"
                name="reason"
                value={appointmentForm.reason}
                onChange={handleAppointmentChange}
                placeholder="Enter appointment reason"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editing
                  ? "Update Appointment"
                  : "Save Appointment"}
              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= APPOINTMENT LIST ================= */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              APPOINTMENT RECORDS
            </span>

            <h3>
              Appointment List
            </h3>

          </div>

          <span className="record-count">
            {appointments.length} Records
          </span>

        </div>


        {/* SEARCH */}

        <div className="search-bar">

          <div className="search-input">

            <span>🔎</span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Appointment ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchAppointment}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");
              loadAppointments();

            }}
          >
            Show All
          </button>

        </div>


        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {appointments.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty"
                  >

                    <div className="empty-icon">
                      📅
                    </div>

                    <strong>
                      No appointments found
                    </strong>

                    <span>
                      Add an appointment or search
                      using an Appointment ID.
                    </span>

                  </td>

                </tr>

              ) : (

                appointments.map((appointment) => (

                  <tr
                    key={appointment.appointmentId}
                  >

                    <td>

                      <span className="id-badge">
                        #{appointment.appointmentId}
                      </span>

                    </td>


                    <td>
                      #{appointment.patientId}
                    </td>


                    <td>
                      #{appointment.doctorId}
                    </td>


                    <td>
                      {appointment.appointmentDate}
                    </td>


                    <td>
                      {appointment.appointmentTime}
                    </td>


                    <td>
                      {appointment.reason || "N/A"}
                    </td>


                    <td>

                      <span className="blood-badge">
                        {appointment.status || "N/A"}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editAppointment(
                              appointment
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteAppointment(
                              appointment.appointmentId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

/* =====================================================
   ADMISSION MANAGEMENT
===================================================== */

function AdmissionManagement() {

  const [admissions, setAdmissions] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editing, setEditing] = useState(false);

  const [admissionForm, setAdmissionForm] = useState({
    admissionId: null,
    patientId: "",
    doctorId: "",
    roomId: "",
    admissionDate: "",
    dischargeDate: "",
    admissionReason: "",
    status: ""
  });

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] =
    useState("success");


  /* =====================================================
     LOAD ALL ADMISSIONS
  ===================================================== */

  const loadAdmissions = async () => {

    try {

      const response = await fetch(
        `${API}/admission/getAllAdmissions`
      );

      const data = await response.json();

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAdmissions(data.content);

      } else if (Array.isArray(data)) {

        setAdmissions(data);

      } else {

        setAdmissions([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );

    }
  };


  /* =====================================================
     LOAD WHEN PAGE OPENS
  ===================================================== */

  useEffect(() => {

    loadAdmissions();

  }, []);


  /* =====================================================
     MESSAGE
  ===================================================== */

  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage(text);

    setMessageType(type);

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setAdmissionForm({

      ...admissionForm,

      [name]: value

    });

  };


  /* =====================================================
     OPEN ADD FORM
  ===================================================== */

  const openAddForm = () => {

    setAdmissionForm({

      admissionId: null,
      patientId: "",
      doctorId: "",
      roomId: "",
      admissionDate: "",
      dischargeDate: "",
      admissionReason: "",
      status: ""

    });

    setEditing(false);

    setShowForm(true);

    setMessage("");

  };


  /* =====================================================
     EDIT ADMISSION
  ===================================================== */

  const editAdmission = (admission) => {

    setAdmissionForm({

      admissionId:
        admission.admissionId,

      patientId:
        admission.patientId || "",

      doctorId:
        admission.doctorId || "",

      roomId:
        admission.roomId || "",

      admissionDate:
        admission.admissionDate || "",

      dischargeDate:
        admission.dischargeDate || "",

      admissionReason:
        admission.admissionReason || "",

      status:
        admission.status || ""

    });

    setEditing(true);

    setShowForm(true);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };


  /* =====================================================
     SAVE / UPDATE
  ===================================================== */

  const saveAdmission = async (e) => {

    e.preventDefault();


    /* ================= VALIDATION ================= */

    if (!admissionForm.patientId) {

      showMessage(
        "Patient ID is required.",
        "error"
      );

      return;

    }


    if (!admissionForm.doctorId) {

      showMessage(
        "Doctor ID is required.",
        "error"
      );

      return;

    }


    if (!admissionForm.roomId) {

      showMessage(
        "Room ID is required.",
        "error"
      );

      return;

    }


    if (!admissionForm.admissionDate) {

      showMessage(
        "Admission date is required.",
        "error"
      );

      return;

    }


    /* DISCHARGE DATE VALIDATION */

    if (
      admissionForm.dischargeDate &&
      admissionForm.dischargeDate <
        admissionForm.admissionDate
    ) {

      showMessage(
        "Discharge date cannot be before admission date.",
        "error"
      );

      return;

    }


    try {

      const url = editing

        ? `${API}/admission/updateAdmission`

        : `${API}/admission/saveAdmission`;


      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...admissionForm,

        admissionId:
          admissionForm.admissionId
            ? Number(
                admissionForm.admissionId
              )
            : null,

        patientId:
          Number(
            admissionForm.patientId
          ),

        doctorId:
          Number(
            admissionForm.doctorId
          ),

        roomId:
          Number(
            admissionForm.roomId
          )

      };


      const response = await fetch(

        url,

        {

          method,

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(body)

        }

      );


      const result =
        await response.json();


      if (response.ok) {

        showMessage(

          editing

            ? "Admission updated successfully."

            : "Admission saved successfully.",

          "success"

        );


        setAdmissionForm({

          admissionId: null,
          patientId: "",
          doctorId: "",
          roomId: "",
          admissionDate: "",
          dischargeDate: "",
          admissionReason: "",
          status: ""

        });


        setEditing(false);

        setShowForm(false);


        await loadAdmissions();

      } else {

        showMessage(

          result.message ||
          "Unable to save admission.",

          "error"

        );

      }

    } catch (error) {

      console.error(error);

      showMessage(

        "Unable to connect to backend.",

        "error"

      );

    }

  };


  /* =====================================================
     SEARCH ADMISSION
  ===================================================== */

  const searchAdmission = async () => {

    const id =
      searchId.trim();


    /* SHOW ALL */

    if (!id) {

      loadAdmissions();

      return;

    }


    try {

      const response =
        await fetch(

          `${API}/admission/searchAdmission/${id}`

        );


      const data =
        await response.json();


      if (!response.ok) {

        showMessage(
          "Admission not found.",
          "error"
        );

        setAdmissions([]);

        return;

      }


      /*
       * Your ResponseDTO may return
       * the actual admission inside
       * "content".
       */

      if (data.content) {

        setAdmissions(
          Array.isArray(data.content)
            ? data.content
            : [data.content]
        );

      } else {

        setAdmissions([data]);

      }


      showMessage(
        "Admission found successfully.",
        "success"
      );


    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to search admission.",
        "error"
      );

    }

  };


  /* =====================================================
     DELETE ADMISSION
  ===================================================== */

  const deleteAdmission = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this admission?"
      );


    if (!confirmed) return;


    try {

      const response =
        await fetch(

          `${API}/admission/deleteAdmission/${id}`,

          {
            method: "DELETE"
          }

        );


      if (response.ok) {

        showMessage(
          "Admission deleted successfully.",
          "success"
        );


        await loadAdmissions();

      } else {

        const result =
          await response.json();

        showMessage(

          result.message ||
          "Unable to delete admission.",

          "error"

        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* =====================================================
     CANCEL FORM
  ===================================================== */

  const cancelForm = () => {

    setAdmissionForm({

      admissionId: null,
      patientId: "",
      doctorId: "",
      roomId: "",
      admissionDate: "",
      dischargeDate: "",
      admissionReason: "",
      status: ""

    });

    setEditing(false);

    setShowForm(false);

    setMessage("");

  };


  /* =====================================================
     RETURN UI
  ===================================================== */

  return (

    <div className="module-page">


      {/* =================================================
         HERO
      ================================================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            🏥
          </div>


          <div>

            <span className="page-label">
              ADMISSION MANAGEMENT
            </span>


            <h2>
              Admissions
            </h2>


            <p>
              Add, search, update and manage
              hospital admission information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >

          + Add Admission

        </button>

      </section>



      {/* =================================================
         MESSAGE
      ================================================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >

          {message}

        </div>

      )}



      {/* =================================================
         ADD / UPDATE FORM
      ================================================= */}

      {showForm && (

        <section className="patient-form-card">


          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE ADMISSION"
                  : "NEW ADMISSION"}

              </span>


              <h3>

                {editing
                  ? "Update Admission Details"
                  : "Add New Admission"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{admissionForm.admissionId}

              </span>

            )}

          </div>



          <form
            onSubmit={saveAdmission}
            className="patient-form"
          >


            {/* =================================================
               PATIENT ID
            ================================================= */}

            <div className="field">

              <label>
                Patient ID *
              </label>


              <input

                type="number"

                name="patientId"

                value={
                  admissionForm.patientId
                }

                onChange={handleChange}

                placeholder="Enter patient ID"

                min="1"

                required

              />

            </div>



            {/* =================================================
               DOCTOR ID
            ================================================= */}

            <div className="field">

              <label>
                Doctor ID *
              </label>


              <input

                type="number"

                name="doctorId"

                value={
                  admissionForm.doctorId
                }

                onChange={handleChange}

                placeholder="Enter doctor ID"

                min="1"

                required

              />

            </div>



            {/* =================================================
               ROOM ID
            ================================================= */}

            <div className="field">

              <label>
                Room ID *
              </label>


              <input

                type="number"

                name="roomId"

                value={
                  admissionForm.roomId
                }

                onChange={handleChange}

                placeholder="Enter room ID"

                min="1"

                required

              />

            </div>



            {/* =================================================
               ADMISSION DATE
            ================================================= */}

            <div className="field">

              <label>
                Admission Date *
              </label>


              <input

                type="date"

                name="admissionDate"

                value={
                  admissionForm.admissionDate
                }

                onChange={handleChange}

                required

              />

            </div>



            {/* =================================================
               DISCHARGE DATE
            ================================================= */}

            <div className="field">

              <label>
                Discharge Date
              </label>


              <input

                type="date"

                name="dischargeDate"

                value={
                  admissionForm.dischargeDate
                }

                onChange={handleChange}

              />

            </div>



            {/* =================================================
               STATUS
            ================================================= */}

            <div className="field">

              <label>
                Status *
              </label>


              <select

                name="status"

                value={
                  admissionForm.status
                }

                onChange={handleChange}

                required

              >

                <option value="">
                  Select status
                </option>


                <option value="ADMITTED">
                  ADMITTED
                </option>


                <option value="DISCHARGED">
                  DISCHARGED
                </option>


                <option value="CANCELLED">
                  CANCELLED
                </option>

              </select>

            </div>



            {/* =================================================
               REASON
            ================================================= */}

            <div className="field full">

              <label>
                Admission Reason
              </label>


              <input

                type="text"

                name="admissionReason"

                value={
                  admissionForm.admissionReason
                }

                onChange={handleChange}

                placeholder="Enter reason for admission"

              />

            </div>



            {/* =================================================
               BUTTONS
            ================================================= */}

            <div className="form-actions">


              <button

                type="button"

                className="secondary-button"

                onClick={cancelForm}

              >

                Cancel

              </button>


              <button

                type="submit"

                className="primary-button"

              >

                {editing
                  ? "Update Admission"
                  : "Save Admission"}

              </button>


            </div>


          </form>

        </section>

      )}



      {/* =================================================
         ADMISSION LIST
      ================================================= */}

      <section className="patient-list-card">


        <div className="list-header">


          <div>

            <span className="page-label">
              ADMISSION RECORDS
            </span>


            <h3>
              Admission List
            </h3>

          </div>


          <span className="record-count">

            {admissions.length} Records

          </span>


        </div>



        {/* =================================================
           SEARCH
        ================================================= */}

        <div className="search-bar">


          <div className="search-input">

            <span>
              🔎
            </span>


            <input

              type="number"

              min="1"

              value={searchId}

              onChange={(e) =>
                setSearchId(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  searchAdmission();

                }

              }}

              placeholder="Search by Admission ID"

            />

          </div>


          <button

            className="search-button"

            onClick={
              searchAdmission
            }

          >

            Search

          </button>


          <button

            className="secondary-button"

            onClick={() => {

              setSearchId("");

              loadAdmissions();

            }}

          >

            Show All

          </button>


        </div>



        {/* =================================================
           TABLE
        ================================================= */}

        <div className="table-container">


          <table>


            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Patient
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Room
                </th>

                <th>
                  Admission Date
                </th>

                <th>
                  Discharge Date
                </th>

                <th>
                  Reason
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>



            <tbody>


              {admissions.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    className="empty"
                  >

                    <div className="empty-icon">
                      🏥
                    </div>


                    <strong>
                      No admissions found
                    </strong>


                    <span>
                      Add an admission or search
                      using an Admission ID.
                    </span>

                  </td>

                </tr>

              ) : (


                admissions.map(
                  (admission) => (

                    <tr
                      key={
                        admission.admissionId
                      }
                    >


                      {/* ID */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            admission.admissionId
                          }

                        </span>

                      </td>



                      {/* PATIENT */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            admission.patientId
                          }

                        </span>

                      </td>



                      {/* DOCTOR */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            admission.doctorId
                          }

                        </span>

                      </td>



                      {/* ROOM */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            admission.roomId
                          }

                        </span>

                      </td>



                      {/* ADMISSION DATE */}

                      <td>

                        {
                          admission.admissionDate
                          || "N/A"
                        }

                      </td>



                      {/* DISCHARGE DATE */}

                      <td>

                        {
                          admission.dischargeDate
                          || "N/A"
                        }

                      </td>



                      {/* REASON */}

                      <td>

                        {
                          admission.admissionReason
                          || "N/A"
                        }

                      </td>



                      {/* STATUS */}

                      <td>

                        <span className="status-badge">

                          {
                            admission.status
                            || "N/A"
                          }

                        </span>

                      </td>



                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">


                          <button

                            className="edit-button"

                            onClick={() =>
                              editAdmission(
                                admission
                              )
                            }

                          >

                            Edit

                          </button>


                          <button

                            className="delete-button"

                            onClick={() =>
                              deleteAdmission(
                                admission.admissionId
                              )
                            }

                          >

                            Delete

                          </button>


                        </div>

                      </td>


                    </tr>

                  )

                )

              )}


            </tbody>

          </table>


        </div>


      </section>


    </div>

  );

}

/* =====================================================
   BILL MANAGEMENT
===================================================== */

function BillManagement() {

  const [bills, setBills] = useState([]);
  const [allBills, setAllBills] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [billForm, setBillForm] = useState({
    billId: null,
    patientId: "",
    admissionId: "",
    billDate: "",
    consultationCharge: "",
    roomCharge: "",
    medicineCharge: "",
    labCharge: "",
    otherCharge: "",
    totalAmount: "",
    paymentStatus: ""
  });


  /* ================= MESSAGE ================= */

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };


  /* ================= GET ALL BILLS ================= */

  const loadBills = async () => {

    try {

      const response = await fetch(
        `${API}/bill/getAllBills`
      );

      const data = await response.json();

      /*
       * Your backend ResponseDTO contains
       * the actual list inside "content".
       */

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAllBills(data.content);
        setBills(data.content);

      } else if (Array.isArray(data)) {

        setAllBills(data);
        setBills(data);

      } else {

        setAllBills([]);
        setBills([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );

    }

  };


  useEffect(() => {
    loadBills();
  }, []);


  /* ================= FORM CHANGE ================= */

  const handleBillChange = (e) => {

    const { name, value } = e.target;

    setBillForm({
      ...billForm,
      [name]: value
    });

  };


  /* ================= OPEN ADD FORM ================= */

  const openAddBillForm = () => {

    setBillForm({
      billId: null,
      patientId: "",
      admissionId: "",
      billDate: "",
      consultationCharge: "",
      roomCharge: "",
      medicineCharge: "",
      labCharge: "",
      otherCharge: "",
      totalAmount: "",
      paymentStatus: ""
    });

    setEditing(false);
    setShowForm(true);
    setMessage("");

  };


  /* ================= EDIT ================= */

  const editBill = (bill) => {

    setBillForm({

      billId:
        bill.billId || null,

      patientId:
        bill.patientId || "",

      admissionId:
        bill.admissionId || "",

      billDate:
        bill.billDate || "",

      consultationCharge:
        bill.consultationCharge || "",

      roomCharge:
        bill.roomCharge || "",

      medicineCharge:
        bill.medicineCharge || "",

      labCharge:
        bill.labCharge || "",

      otherCharge:
        bill.otherCharge || "",

      totalAmount:
        bill.totalAmount || "",

      paymentStatus:
        bill.paymentStatus || ""

    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* ================= TOTAL ================= */

  const calculateTotal = () => {

    return (
      Number(billForm.consultationCharge || 0) +
      Number(billForm.roomCharge || 0) +
      Number(billForm.medicineCharge || 0) +
      Number(billForm.labCharge || 0) +
      Number(billForm.otherCharge || 0)
    );

  };


  /* ================= SAVE / UPDATE ================= */

  const saveBill = async (e) => {

    e.preventDefault();

    const total = calculateTotal();

    try {

      const url = editing
        ? `${API}/bill/updateBill`
        : `${API}/bill/saveBill`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...billForm,

        billId:
          billForm.billId
            ? Number(billForm.billId)
            : null,

        patientId:
          Number(billForm.patientId),

        admissionId:
          Number(billForm.admissionId),

        consultationCharge:
          Number(
            billForm.consultationCharge || 0
          ),

        roomCharge:
          Number(
            billForm.roomCharge || 0
          ),

        medicineCharge:
          Number(
            billForm.medicineCharge || 0
          ),

        labCharge:
          Number(
            billForm.labCharge || 0
          ),

        otherCharge:
          Number(
            billForm.otherCharge || 0
          ),

        totalAmount:
          total

      };


      const response = await fetch(
        url,
        {
          method: method,

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(body)

        }
      );


      const result =
        await response.json();


      if (response.ok) {

        showMessage(
          editing
            ? "Bill updated successfully."
            : "Bill saved successfully.",
          "success"
        );

        setShowForm(false);
        setEditing(false);

        setBillForm({
          billId: null,
          patientId: "",
          admissionId: "",
          billDate: "",
          consultationCharge: "",
          roomCharge: "",
          medicineCharge: "",
          labCharge: "",
          otherCharge: "",
          totalAmount: "",
          paymentStatus: ""
        });

        await loadBills();

      } else {

        showMessage(
          result.message ||
          "Unable to save bill.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= SEARCH ================= */

  const searchBill = async () => {

    const id = searchId.trim();

    if (!id) {

      loadBills();

      return;

    }

    try {

      const response = await fetch(
        `${API}/bill/searchBill/${id}`
      );


      if (!response.ok) {

        setBills([]);

        showMessage(
          "Bill not found.",
          "error"
        );

        return;

      }


      const data =
        await response.json();


      if (data.content) {

        setBills([data.content]);

      } else {

        setBills([data]);

      }


      showMessage(
        "Bill found successfully.",
        "success"
      );

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to search bill.",
        "error"
      );

    }

  };


  /* ================= DELETE ================= */

  const deleteBill = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this bill?"
      );

    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/bill/deleteBill/${id}`,
        {
          method: "DELETE"
        }
      );


      if (response.ok) {

        showMessage(
          "Bill deleted successfully.",
          "success"
        );

        await loadBills();

      } else {

        showMessage(
          "Unable to delete bill.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= CANCEL ================= */

  const cancelBillForm = () => {

    setBillForm({
      billId: null,
      patientId: "",
      admissionId: "",
      billDate: "",
      consultationCharge: "",
      roomCharge: "",
      medicineCharge: "",
      labCharge: "",
      otherCharge: "",
      totalAmount: "",
      paymentStatus: ""
    });

    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="module-page">


      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            💳
          </div>

          <div>

            <span className="page-label">
              BILL MANAGEMENT
            </span>

            <h2>
              Bills
            </h2>

            <p>
              Add, search, update and manage hospital billing information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddBillForm}
        >
          + Add Bill
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >

          {message}

        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE BILL"
                  : "NEW BILL"}

              </span>

              <h3>

                {editing
                  ? "Update Bill Details"
                  : "Create New Bill"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{billForm.billId}

              </span>

            )}

          </div>


          <form
            onSubmit={saveBill}
            className="patient-form"
          >


            {/* PATIENT ID */}

            <div className="field">

              <label>
                Patient ID *
              </label>

              <input
                type="number"
                name="patientId"
                value={billForm.patientId}
                onChange={handleBillChange}
                placeholder="Enter patient ID"
                min="1"
                required
              />

            </div>


            {/* ADMISSION ID */}

            <div className="field">

              <label>
                Admission ID *
              </label>

              <input
                type="number"
                name="admissionId"
                value={billForm.admissionId}
                onChange={handleBillChange}
                placeholder="Enter admission ID"
                min="1"
                required
              />

            </div>


            {/* BILL DATE */}

            <div className="field">

              <label>
                Bill Date *
              </label>

              <input
                type="date"
                name="billDate"
                value={billForm.billDate}
                onChange={handleBillChange}
                required
              />

            </div>


            {/* PAYMENT STATUS */}

            <div className="field">

              <label>
                Payment Status *
              </label>

              <select
                name="paymentStatus"
                value={billForm.paymentStatus}
                onChange={handleBillChange}
                required
              >

                <option value="">
                  Select payment status
                </option>

                <option value="PAID">
                  PAID
                </option>

                <option value="PENDING">
                  PENDING
                </option>

                <option value="PARTIALLY_PAID">
                  PARTIALLY PAID
                </option>

              </select>

            </div>


            {/* CONSULTATION */}

            <div className="field">

              <label>
                Consultation Charge
              </label>

              <input
                type="number"
                name="consultationCharge"
                value={
                  billForm.consultationCharge
                }
                onChange={handleBillChange}
                placeholder="Enter consultation charge"
                min="0"
              />

            </div>


            {/* ROOM */}

            <div className="field">

              <label>
                Room Charge
              </label>

              <input
                type="number"
                name="roomCharge"
                value={
                  billForm.roomCharge
                }
                onChange={handleBillChange}
                placeholder="Enter room charge"
                min="0"
              />

            </div>


            {/* MEDICINE */}

            <div className="field">

              <label>
                Medicine Charge
              </label>

              <input
                type="number"
                name="medicineCharge"
                value={
                  billForm.medicineCharge
                }
                onChange={handleBillChange}
                placeholder="Enter medicine charge"
                min="0"
              />

            </div>


            {/* LAB */}

            <div className="field">

              <label>
                Lab Charge
              </label>

              <input
                type="number"
                name="labCharge"
                value={
                  billForm.labCharge
                }
                onChange={handleBillChange}
                placeholder="Enter lab charge"
                min="0"
              />

            </div>


            {/* OTHER */}

            <div className="field">

              <label>
                Other Charge
              </label>

              <input
                type="number"
                name="otherCharge"
                value={
                  billForm.otherCharge
                }
                onChange={handleBillChange}
                placeholder="Enter other charge"
                min="0"
              />

            </div>


            {/* TOTAL */}

            <div className="field">

              <label>
                Total Amount
              </label>

              <input
                type="number"
                value={calculateTotal()}
                readOnly
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelBillForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Bill"
                  : "Save Bill"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= BILL RECORDS ================= */}

      <section className="patient-list-card">


        <div className="list-header">

          <div>

            <span className="page-label">
              BILLING RECORDS
            </span>

            <h3>
              Bill List
            </h3>

          </div>


          <span className="record-count">
            {bills.length} Records
          </span>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-bar">

          <div className="search-input">

            <span>
              🔎
            </span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Bill ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchBill}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");
              setBills(allBills);

            }}
          >
            Show All
          </button>

        </div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>PATIENT ID</th>
                <th>ADMISSION ID</th>
                <th>BILL DATE</th>
                <th>CONSULTATION</th>
                <th>ROOM</th>
                <th>MEDICINE</th>
                <th>LAB</th>
                <th>OTHER</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {bills.length === 0 ? (

                <tr>

                  <td
                    colSpan="12"
                    className="empty"
                  >

                    <div className="empty-icon">
                      💳
                    </div>

                    <strong>
                      No bills found
                    </strong>

                    <span>
                      Add a bill or search using
                      a Bill ID.
                    </span>

                  </td>

                </tr>

              ) : (

                bills.map((bill) => (

                  <tr
                    key={bill.billId}
                  >

                    <td>

                      <span className="id-badge">
                        #{bill.billId}
                      </span>

                    </td>


                    <td>
                      #{bill.patientId}
                    </td>


                    <td>
                      #{bill.admissionId}
                    </td>


                    <td>
                      {bill.billDate || "N/A"}
                    </td>


                    <td>
                      ₹{bill.consultationCharge || 0}
                    </td>


                    <td>
                      ₹{bill.roomCharge || 0}
                    </td>


                    <td>
                      ₹{bill.medicineCharge || 0}
                    </td>


                    <td>
                      ₹{bill.labCharge || 0}
                    </td>


                    <td>
                      ₹{bill.otherCharge || 0}
                    </td>


                    <td>

                      <strong>
                        ₹{bill.totalAmount || 0}
                      </strong>

                    </td>


                    <td>

                      <span className="blood-badge">
                        {bill.paymentStatus || "N/A"}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editBill(bill)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteBill(
                              bill.billId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );
}


/* =====================================================
   DEPARTMENT MANAGEMENT
===================================================== */

function DepartmentManagement() {

  const DEPARTMENT_API =
    "http://localhost:8083/api/v1/department";

  const emptyDepartment = {
    departmentId: null,
    departmentName: "",
    location: "",
    description: ""
  };

  const [departments, setDepartments] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [departmentForm, setDepartmentForm] =
    useState(emptyDepartment);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");


  /* =====================================================
     MESSAGE
  ===================================================== */

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  /* =====================================================
     GET ALL DEPARTMENTS
  ===================================================== */

  const loadDepartments = async () => {

    try {

      const response = await fetch(
        `${DEPARTMENT_API}/getAllDepartments`
      );

      if (!response.ok) {
        throw new Error("Unable to load departments");
      }

      const data = await response.json();

      console.log("Department API response:", data);

      let departmentList = [];

      /*
       * Your backend uses ResponseDTO.
       * Depending on the response, data may be:
       *
       * data.content
       * data.data
       * or directly an array.
       */

      if (Array.isArray(data)) {

        departmentList = data;

      } else if (Array.isArray(data.content)) {

        departmentList = data.content;

      } else if (Array.isArray(data.data)) {

        departmentList = data.data;

      }

      setAllDepartments(departmentList);
      setDepartments(departmentList);

    } catch (error) {

      console.error(
        "Error loading departments:",
        error
      );

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );
    }
  };


  /* =====================================================
     LOAD ON PAGE OPEN
  ===================================================== */

  useEffect(() => {
    loadDepartments();
  }, []);


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setDepartmentForm({
      ...departmentForm,
      [name]: value
    });
  };


  /* =====================================================
     OPEN ADD FORM
  ===================================================== */

  const openAddForm = () => {

    setDepartmentForm(emptyDepartment);
    setEditing(false);
    setShowForm(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /* =====================================================
     EDIT DEPARTMENT
  ===================================================== */

  const editDepartment = (department) => {

    setDepartmentForm({
      departmentId:
        department.departmentId,

      departmentName:
        department.departmentName || "",

      location:
        department.location || "",

      description:
        department.description || ""
    });

    setEditing(true);
    setShowForm(true);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /* =====================================================
     SAVE / UPDATE
  ===================================================== */

  const saveDepartment = async (e) => {

    e.preventDefault();

    if (
      !departmentForm.departmentName.trim()
    ) {

      showMessage(
        "Department name is required.",
        "error"
      );

      return;
    }


    if (
      !departmentForm.location.trim()
    ) {

      showMessage(
        "Location is required.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${DEPARTMENT_API}/updateDepartment`
        : `${DEPARTMENT_API}/saveDepartment`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {
        departmentId:
          editing
            ? Number(
                departmentForm.departmentId
              )
            : null,

        departmentName:
          departmentForm.departmentName.trim(),

        location:
          departmentForm.location.trim(),

        description:
          departmentForm.description.trim()
      };


      console.log(
        "Sending department:",
        body
      );


      const response = await fetch(url, {

        method: method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

      });


      /*
       * Try to read backend response.
       */

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }


      console.log(
        "Save department response:",
        result
      );


      if (!response.ok) {

        throw new Error(
          result.message ||
          "Unable to save department."
        );
      }


      showMessage(
        editing
          ? "Department updated successfully."
          : "Department saved successfully.",
        "success"
      );


      setDepartmentForm(emptyDepartment);
      setEditing(false);
      setShowForm(false);

      await loadDepartments();


    } catch (error) {

      console.error(
        "Department save error:",
        error
      );

      showMessage(
        error.message ||
        "Unable to connect to backend.",
        "error"
      );
    }
  };


  /* =====================================================
     SEARCH DEPARTMENT
  ===================================================== */

  const searchDepartment = async () => {

    const id = searchId.trim();


    if (!id) {

      loadDepartments();
      return;
    }


    try {

      const response = await fetch(
        `${DEPARTMENT_API}/searchDepartment/${id}`
      );


      if (!response.ok) {

        showMessage(
          "Department not found.",
          "error"
        );

        setDepartments([]);

        return;
      }


      const data = await response.json();

      console.log(
        "Search department response:",
        data
      );


      let department = null;


      if (data.content) {

        department = data.content;

      } else if (data.data) {

        department = data.data;

      } else if (data.departmentId) {

        department = data;
      }


      if (department) {

        setDepartments([department]);

        showMessage(
          "Department found.",
          "success"
        );

      } else {

        setDepartments([]);

        showMessage(
          "Department not found.",
          "error"
        );
      }


    } catch (error) {

      console.error(
        "Search department error:",
        error
      );

      showMessage(
        "Unable to connect to backend.",
        "error"
      );
    }
  };


  /* =====================================================
     DELETE DEPARTMENT
  ===================================================== */

  const deleteDepartment = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this department?"
      );


    if (!confirmed) {
      return;
    }


    try {

      const response = await fetch(
        `${DEPARTMENT_API}/deleteDepartment/${id}`,
        {
          method: "DELETE"
        }
      );


      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }


      if (!response.ok) {

        throw new Error(
          result.message ||
          "Unable to delete department."
        );
      }


      showMessage(
        "Department deleted successfully.",
        "success"
      );


      await loadDepartments();


    } catch (error) {

      console.error(
        "Delete department error:",
        error
      );

      showMessage(
        error.message ||
        "Unable to connect to backend.",
        "error"
      );
    }
  };


  /* =====================================================
     CANCEL FORM
  ===================================================== */

  const cancelForm = () => {

    setDepartmentForm(emptyDepartment);
    setEditing(false);
    setShowForm(false);
    setMessage("");
  };


  /* =====================================================
     RETURN UI
  ===================================================== */

  return (

    <div className="module-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            🏥
          </div>


          <div>

            <span className="page-label">
              DEPARTMENT MANAGEMENT
            </span>

            <h2>
              Departments
            </h2>

            <p>
              Add, search, update and manage hospital
              department information.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Department
        </button>

      </section>


      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* =================================================
          ADD / UPDATE FORM
      ================================================= */}

      {showForm && (

        <section className="patient-form-card">


          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE DEPARTMENT"
                  : "NEW DEPARTMENT"}

              </span>


              <h3>

                {editing
                  ? "Update Department Details"
                  : "Add New Department"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #
                {departmentForm.departmentId}

              </span>

            )}

          </div>


          <form
            onSubmit={saveDepartment}
            className="patient-form"
          >


            {/* DEPARTMENT NAME */}

            <div className="field">

              <label>
                Department Name *
              </label>

              <input
                type="text"
                name="departmentName"
                value={
                  departmentForm.departmentName
                }
                onChange={handleChange}
                placeholder="Enter department name"
                required
              />

            </div>


            {/* LOCATION */}

            <div className="field">

              <label>
                Location *
              </label>

              <input
                type="text"
                name="location"
                value={
                  departmentForm.location
                }
                onChange={handleChange}
                placeholder="Enter department location"
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={
                  departmentForm.description
                }
                onChange={handleChange}
                placeholder="Enter department description"
                rows="4"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Department"
                  : "Save Department"}

              </button>

            </div>


          </form>

        </section>

      )}


      {/* =================================================
          DEPARTMENT LIST
      ================================================= */}

      <section className="patient-list-card">


        <div className="list-header">

          <div>

            <span className="page-label">
              DEPARTMENT RECORDS
            </span>

            <h3>
              Department List
            </h3>
          </div>


          <span className="record-count">

            {departments.length} Records

          </span>

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="search-bar">


          <div className="search-input">

            <span>
              🔎
            </span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Department ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchDepartment}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");

              loadDepartments();

            }}
          >
            Show All
          </button>


        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Department
                </th>

                <th>
                  Location
                </th>

                <th>
                  Description
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>


              {departments.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty"
                  >

                    <div className="empty-icon">
                      🏥
                    </div>


                    <strong>
                      No departments found
                    </strong>


                    <span>
                      Add a department or search using
                      a Department ID.
                    </span>

                  </td>

                </tr>

              ) : (

                departments.map(
                  (department) => (

                    <tr
                      key={
                        department.departmentId
                      }
                    >


                      {/* ID */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            department.departmentId
                          }

                        </span>

                      </td>


                      {/* NAME */}

                      <td>

                        <strong>

                          {
                            department.departmentName
                          }

                        </strong>

                      </td>


                      {/* LOCATION */}

                      <td>

                        {
                          department.location ||
                          "N/A"
                        }

                      </td>


                      {/* DESCRIPTION */}

                      <td>

                        {
                          department.description ||
                          "N/A"
                        }

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">


                          <button
                            className="edit-button"
                            onClick={() =>
                              editDepartment(
                                department
                              )
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteDepartment(
                                department.departmentId
                              )
                            }
                          >
                            Delete
                          </button>


                        </div>

                      </td>


                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </section>


    </div>
  );
}


/* =====================================================
   LAB TEST MANAGEMENT
===================================================== */

function LabTestManagement() {

  const emptyLabTest = {
    labTestId: null,
    patientId: "",
    doctorId: "",
    testName: "",
    testDate: "",
    result: "",
    normalRange: "",
    status: "",
    testCharge: "",
  };

  const [labTests, setLabTests] = useState([]);
  const [allLabTests, setAllLabTests] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [labTestForm, setLabTestForm] =
    useState(emptyLabTest);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");


  /* ================= GET ALL ================= */

  const loadLabTests = async () => {

    try {

      const response = await fetch(
        `${API}/labTest/getAllLabTests`
      );

      const data = await response.json();

      console.log("Lab Test response:", data);

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAllLabTests(data.content);
        setLabTests(data.content);

      } else {

        setAllLabTests([]);
        setLabTests([]);

      }

    } catch (error) {

      console.error("Error loading lab tests:", error);

      showMessage(
        "Unable to connect to the backend.",
        "error"
      );

    }
  };


  useEffect(() => {

    loadLabTests();

  }, []);


  /* ================= MESSAGE ================= */

  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };


  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setLabTestForm({

      ...labTestForm,

      [name]: value,

    });

  };


  /* ================= OPEN ADD ================= */

  const openAddForm = () => {

    setLabTestForm(emptyLabTest);

    setEditing(false);

    setShowForm(true);

    setMessage("");

  };


  /* ================= EDIT ================= */

  const editLabTest = (labTest) => {

    setLabTestForm({

      labTestId:
        labTest.labTestId,

      patientId:
        labTest.patientId || "",

      doctorId:
        labTest.doctorId || "",

      testName:
        labTest.testName || "",

      testDate:
        labTest.testDate || "",

      result:
        labTest.result || "",

      normalRange:
        labTest.normalRange || "",

      status:
        labTest.status || "",

      testCharge:
        labTest.testCharge ?? "",

    });

    setEditing(true);

    setShowForm(true);

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };


  /* ================= SAVE / UPDATE ================= */

  const saveLabTest = async (e) => {

    e.preventDefault();


    /* PATIENT ID VALIDATION */

    const patientId =
      Number(labTestForm.patientId);

    if (
      !Number.isInteger(patientId) ||
      patientId < 1
    ) {

      showMessage(
        "Please enter a valid Patient ID.",
        "error"
      );

      return;

    }


    /* DOCTOR ID VALIDATION */

    const doctorId =
      Number(labTestForm.doctorId);

    if (
      !Number.isInteger(doctorId) ||
      doctorId < 1
    ) {

      showMessage(
        "Please enter a valid Doctor ID.",
        "error"
      );

      return;

    }


    /* TEST CHARGE VALIDATION */

    const testCharge =
      Number(labTestForm.testCharge);

    if (
      Number.isNaN(testCharge) ||
      testCharge < 0
    ) {

      showMessage(
        "Test charge must be a valid amount.",
        "error"
      );

      return;

    }


    try {

      const url = editing

        ? `${API}/labTest/updateLabTest`

        : `${API}/labTest/saveLabTest`;


      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...labTestForm,

        labTestId:
          labTestForm.labTestId
            ? Number(labTestForm.labTestId)
            : null,

        patientId:
          patientId,

        doctorId:
          doctorId,

        testCharge:
          testCharge,

      };


      console.log(
        "Sending Lab Test:",
        body
      );


      const response = await fetch(

        url,

        {

          method,

          headers: {

            "Content-Type":
              "application/json",

          },

          body:
            JSON.stringify(body),

        }

      );


      const result =
        await response.json();


      console.log(
        "Lab Test result:",
        result
      );


      if (response.ok) {

        showMessage(

          editing

            ? "Lab Test updated successfully."

            : "Lab Test saved successfully.",

          "success"

        );


        setLabTestForm(
          emptyLabTest
        );

        setEditing(false);

        setShowForm(false);


        await loadLabTests();


      } else {

        showMessage(

          result.message ||
          "Unable to save lab test.",

          "error"

        );

      }


    } catch (error) {

      console.error(
        "Lab Test error:",
        error
      );


      showMessage(

        "Unable to connect to backend.",

        "error"

      );

    }

  };


  /* ================= SEARCH ================= */

  const searchLabTest = () => {

    const id =
      searchId.trim();


    if (!id) {

      loadLabTests();

      return;

    }


    const filteredLabTests =
      allLabTests.filter(

        (labTest) =>

          String(
            labTest.labTestId || ""
          ) === id

      );


    setLabTests(
      filteredLabTests
    );


    if (
      filteredLabTests.length === 0
    ) {

      showMessage(
        "No lab test found.",
        "error"
      );

    } else {

      showMessage(

        `${filteredLabTests.length} lab test(s) found.`,

        "success"

      );

    }

  };


  /* ================= DELETE ================= */

  const deleteLabTest = async (id) => {

    const confirmed =
      window.confirm(

        "Are you sure you want to delete this lab test?"

      );


    if (!confirmed)
      return;


    try {

      const response =
        await fetch(

          `${API}/labTest/deleteLabTest/${id}`,

          {

            method:
              "DELETE",

          }

        );


      if (response.ok) {

        showMessage(

          "Lab Test deleted successfully.",

          "success"

        );


        await loadLabTests();


      } else {

        const result =
          await response.json();

        showMessage(

          result.message ||
          "Unable to delete lab test.",

          "error"

        );

      }


    } catch (error) {

      console.error(error);


      showMessage(

        "Unable to connect to backend.",

        "error"

      );

    }

  };


  /* ================= CANCEL ================= */

  const cancelForm = () => {

    setLabTestForm(
      emptyLabTest
    );

    setEditing(false);

    setShowForm(false);

    setMessage("");

  };


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="module-page">


      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            🧪
          </div>


          <div>

            <span className="page-label">

              LAB TEST MANAGEMENT

            </span>


            <h2>
              Lab Tests
            </h2>


            <p>

              Add, search, update and manage
              laboratory test information.

            </p>

          </div>

        </div>


        <button

          className="primary-button"

          onClick={openAddForm}

        >

          + Add Lab Test

        </button>

      </section>



      {/* ================= MESSAGE ================= */}

      {message && (

        <div

          className={

            messageType === "error"

              ? "alert error"

              : "alert success"

          }

        >

          {message}

        </div>

      )}



      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">


          <div className="form-header">

            <div>

              <span className="page-label">

                {editing

                  ? "UPDATE LAB TEST"

                  : "NEW LAB TEST"}

              </span>


              <h3>

                {editing

                  ? "Update Lab Test Details"

                  : "Add New Lab Test"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{labTestForm.labTestId}

              </span>

            )}

          </div>



          <form

            onSubmit={saveLabTest}

            className="patient-form"

          >


            {/* PATIENT ID */}

            <div className="field">

              <label>
                Patient ID *
              </label>


              <input

                type="number"

                name="patientId"

                value={
                  labTestForm.patientId
                }

                onChange={
                  handleChange
                }

                placeholder="Enter Patient ID"

                min="1"

                required

              />

            </div>



            {/* DOCTOR ID */}

            <div className="field">

              <label>
                Doctor ID *
              </label>


              <input

                type="number"

                name="doctorId"

                value={
                  labTestForm.doctorId
                }

                onChange={
                  handleChange
                }

                placeholder="Enter Doctor ID"

                min="1"

                required

              />

            </div>



            {/* TEST NAME */}

            <div className="field">

              <label>
                Test Name *
              </label>


              <input

                type="text"

                name="testName"

                value={
                  labTestForm.testName
                }

                onChange={
                  handleChange
                }

                placeholder="Enter test name"

                required

              />

            </div>



            {/* TEST DATE */}

            <div className="field">

              <label>
                Test Date *
              </label>


              <input

                type="date"

                name="testDate"

                value={
                  labTestForm.testDate
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>



            {/* RESULT */}

            <div className="field">

              <label>
                Result
              </label>


              <input

                type="text"

                name="result"

                value={
                  labTestForm.result
                }

                onChange={
                  handleChange
                }

                placeholder="Enter test result"

              />

            </div>



            {/* NORMAL RANGE */}

            <div className="field">

              <label>
                Normal Range
              </label>


              <input

                type="text"

                name="normalRange"

                value={
                  labTestForm.normalRange
                }

                onChange={
                  handleChange
                }

                placeholder="Example: 70-100 mg/dL"

              />

            </div>



            {/* STATUS */}

            <div className="field">

              <label>
                Status *
              </label>


              <select

                name="status"

                value={
                  labTestForm.status
                }

                onChange={
                  handleChange
                }

                required

              >

                <option value="">
                  Select status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="In Progress">
                  In Progress
                </option>

              </select>

            </div>



            {/* TEST CHARGE */}

            <div className="field">

              <label>
                Test Charge *
              </label>


              <input

                type="number"

                name="testCharge"

                value={
                  labTestForm.testCharge
                }

                onChange={
                  handleChange
                }

                placeholder="Enter test charge"

                min="0"

                step="0.01"

                required

              />

            </div>



            {/* BUTTONS */}

            <div className="form-actions">


              <button

                type="button"

                className="secondary-button"

                onClick={
                  cancelForm
                }

              >

                Cancel

              </button>


              <button

                type="submit"

                className="primary-button"

              >

                {editing

                  ? "Update Lab Test"

                  : "Save Lab Test"}

              </button>


            </div>

          </form>

        </section>

      )}



      {/* ================= LIST ================= */}

      <section className="patient-list-card">


        <div className="list-header">

          <div>

            <span className="page-label">

              LAB TEST RECORDS

            </span>


            <h3>
              Lab Test List
            </h3>

          </div>


          <span className="record-count">

            {labTests.length}
            {" "}Records

          </span>

        </div>



        {/* ================= SEARCH ================= */}

        <div className="search-bar">


          <div className="search-input">

            <span>
              🔎
            </span>


            <input

              type="number"

              min="1"

              value={searchId}

              onChange={(e) =>
                setSearchId(
                  e.target.value
                )
              }

              placeholder="Search by Lab Test ID"

            />

          </div>



          <button

            className="search-button"

            onClick={
              searchLabTest
            }

          >

            Search

          </button>



          <button

            className="secondary-button"

            onClick={() => {

              setSearchId("");

              loadLabTests();

            }}

          >

            Show All

          </button>


        </div>



        {/* ================= TABLE ================= */}

        <div className="table-container">


          <table>


            <thead>

              <tr>

                <th>ID</th>

                <th>Patient ID</th>

                <th>Doctor ID</th>

                <th>Test Name</th>

                <th>Test Date</th>

                <th>Result</th>

                <th>Normal Range</th>

                <th>Status</th>

                <th>Charge</th>

                <th>Actions</th>

              </tr>

            </thead>



            <tbody>


              {labTests.length === 0 ? (

                <tr>

                  <td

                    colSpan="10"

                    className="empty"

                  >

                    <div className="empty-icon">
                      🧪
                    </div>


                    <strong>

                      No lab tests found

                    </strong>


                    <span>

                      Add a lab test or
                      search using a Lab Test ID.

                    </span>

                  </td>

                </tr>


              ) : (


                labTests.map(

                  (labTest) => (

                    <tr

                      key={
                        labTest.labTestId
                      }

                    >


                      {/* ID */}

                      <td>

                        <span className="id-badge">

                          #
                          {
                            labTest.labTestId
                          }

                        </span>

                      </td>



                      {/* PATIENT */}

                      <td>

                        #
                        {
                          labTest.patientId
                        }

                      </td>



                      {/* DOCTOR */}

                      <td>

                        #
                        {
                          labTest.doctorId
                        }

                      </td>



                      {/* TEST */}

                      <td>

                        <strong>

                          {
                            labTest.testName
                          }

                        </strong>

                      </td>



                      {/* DATE */}

                      <td>

                        {
                          labTest.testDate
                        }

                      </td>



                      {/* RESULT */}

                      <td>

                        {
                          labTest.result ||
                          "Pending"
                        }

                      </td>



                      {/* NORMAL RANGE */}

                      <td>

                        {
                          labTest.normalRange ||
                          "N/A"
                        }

                      </td>



                      {/* STATUS */}

                      <td>

                        <span className="blood-badge">

                          {
                            labTest.status ||
                            "N/A"
                          }

                        </span>

                      </td>



                      {/* CHARGE */}

                      <td>

                        ₹
                        {
                          Number(
                            labTest.testCharge || 0
                          ).toFixed(2)
                        }

                      </td>



                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">


                          <button

                            className="edit-button"

                            onClick={() =>
                              editLabTest(
                                labTest
                              )
                            }

                          >

                            Edit

                          </button>


                          <button

                            className="delete-button"

                            onClick={() =>
                              deleteLabTest(
                                labTest.labTestId
                              )
                            }

                          >

                            Delete

                          </button>


                        </div>

                      </td>


                    </tr>

                  )

                )

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );

}

/* =====================================================
   MEDICINE MANAGEMENT
===================================================== */

function MedicineManagement() {

  const emptyMedicine = {
    medicineId: null,
    medicineName: "",
    category: "",
    manufacturer: "",
    quantity: "",
    unitPrice: "",
    expiryDate: "",
  };

  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [medicineForm, setMedicineForm] =
    useState(emptyMedicine);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");


  /* ================= MESSAGE ================= */

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  /* ================= GET ALL ================= */

  const loadMedicines = async () => {

    try {

      const response = await fetch(
        `${API}/medicine/getAllMedicines`
      );

      const data = await response.json();

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAllMedicines(data.content);
        setMedicines(data.content);

      } else {

        setMedicines([]);
        setAllMedicines([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  useEffect(() => {
    loadMedicines();
  }, []);


  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setMedicineForm({
      ...medicineForm,
      [name]: value,
    });

  };


  /* ================= OPEN ADD ================= */

  const openAddForm = () => {

    setMedicineForm(emptyMedicine);
    setEditing(false);
    setShowForm(true);
    setMessage("");

  };


  /* ================= EDIT ================= */

  const editMedicine = (medicine) => {

    setMedicineForm({
      medicineId: medicine.medicineId,

      medicineName:
        medicine.medicineName || "",

      category:
        medicine.category || "",

      manufacturer:
        medicine.manufacturer || "",

      quantity:
        medicine.quantity || "",

      unitPrice:
        medicine.unitPrice || "",

      expiryDate:
        medicine.expiryDate || "",
    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ================= SAVE / UPDATE ================= */

  const saveMedicine = async (e) => {

    e.preventDefault();

    const quantity =
      Number(medicineForm.quantity);

    const unitPrice =
      Number(medicineForm.unitPrice);


    /* QUANTITY VALIDATION */

    if (
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {

      showMessage(
        "Quantity must be a valid number.",
        "error"
      );

      return;
    }


    /* PRICE VALIDATION */

    if (
      isNaN(unitPrice) ||
      unitPrice < 0
    ) {

      showMessage(
        "Unit price must be a valid amount.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${API}/medicine/updateMedicine`
        : `${API}/medicine/saveMedicine`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...medicineForm,

        medicineId:
          medicineForm.medicineId
            ? Number(medicineForm.medicineId)
            : null,

        quantity: quantity,

        unitPrice: unitPrice,

      };


      const response = await fetch(url, {

        method: method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });


      const result =
        await response.json();


      if (response.ok) {

        showMessage(
          editing
            ? "Medicine updated successfully."
            : "Medicine saved successfully.",
          "success"
        );

        setMedicineForm(emptyMedicine);
        setEditing(false);
        setShowForm(false);

        await loadMedicines();

      } else {

        showMessage(
          result.message ||
          "Unable to save medicine.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= SEARCH ================= */

  const searchMedicine = () => {

    const id =
      searchId.trim();

    const name =
      searchName.trim().toLowerCase();


    if (!id && !name) {

      loadMedicines();
      return;

    }


    const filteredMedicines =
      allMedicines.filter((medicine) => {

        const medicineId =
          String(
            medicine.medicineId || ""
          );

        const medicineName =
          String(
            medicine.medicineName || ""
          ).toLowerCase();


        return (
          (!id || medicineId === id) &&
          (!name ||
            medicineName.includes(name))
        );

      });


    setMedicines(filteredMedicines);


    if (filteredMedicines.length === 0) {

      showMessage(
        "No medicines found.",
        "error"
      );

    } else {

      showMessage(
        `${filteredMedicines.length} medicine(s) found.`,
        "success"
      );

    }

  };


  /* ================= DELETE ================= */

  const deleteMedicine = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this medicine?"
      );


    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/medicine/deleteMedicine/${id}`,
        {
          method: "DELETE",
        }
      );


      if (response.ok) {

        showMessage(
          "Medicine deleted successfully.",
          "success"
        );

        await loadMedicines();

      } else {

        showMessage(
          "Unable to delete medicine.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= CANCEL ================= */

  const cancelForm = () => {

    setMedicineForm(emptyMedicine);
    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  return (

    <div className="module-page">

      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            💊
          </div>

          <div>

            <span className="page-label">
              MEDICINE MANAGEMENT
            </span>

            <h2>
              Medicines
            </h2>

            <p>
              Add, search, update and manage
              hospital medicines.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Medicine
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE MEDICINE"
                  : "NEW MEDICINE"}

              </span>

              <h3>

                {editing
                  ? "Update Medicine Details"
                  : "Add New Medicine"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{medicineForm.medicineId}

              </span>

            )}

          </div>


          <form
            onSubmit={saveMedicine}
            className="patient-form"
          >

            {/* MEDICINE NAME */}

            <div className="field">

              <label>
                Medicine Name *
              </label>

              <input
                type="text"
                name="medicineName"
                value={medicineForm.medicineName}
                onChange={handleChange}
                placeholder="Enter medicine name"
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="field">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={medicineForm.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="Tablet">
                  Tablet
                </option>

                <option value="Capsule">
                  Capsule
                </option>

                <option value="Syrup">
                  Syrup
                </option>

                <option value="Injection">
                  Injection
                </option>

                <option value="Ointment">
                  Ointment
                </option>

                <option value="Drops">
                  Drops
                </option>

              </select>

            </div>


            {/* MANUFACTURER */}

            <div className="field">

              <label>
                Manufacturer *
              </label>

              <input
                type="text"
                name="manufacturer"
                value={medicineForm.manufacturer}
                onChange={handleChange}
                placeholder="Enter manufacturer"
                required
              />

            </div>


            {/* QUANTITY */}

            <div className="field">

              <label>
                Quantity *
              </label>

              <input
                type="number"
                name="quantity"
                value={medicineForm.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="0"
                required
              />

            </div>


            {/* UNIT PRICE */}

            <div className="field">

              <label>
                Unit Price *
              </label>

              <input
                type="number"
                name="unitPrice"
                value={medicineForm.unitPrice}
                onChange={handleChange}
                placeholder="Enter unit price"
                min="0"
                step="0.01"
                required
              />

            </div>


            {/* EXPIRY DATE */}

            <div className="field">

              <label>
                Expiry Date *
              </label>

              <input
                type="date"
                name="expiryDate"
                value={medicineForm.expiryDate}
                onChange={handleChange}
                required
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Medicine"
                  : "Save Medicine"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= LIST ================= */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              MEDICINE RECORDS
            </span>

            <h3>
              Medicine List
            </h3>

          </div>


          <span className="record-count">
            {medicines.length} Records
          </span>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-bar">

          <div className="search-input">

            <span>🔎</span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Medicine ID"
            />

          </div>


          <div className="search-input">

            <span>🔎</span>

            <input
              type="text"
              value={searchName}
              onChange={(e) =>
                setSearchName(e.target.value)
              }
              placeholder="Search by Medicine Name"
            />

          </div>


          <button
            className="search-button"
            onClick={searchMedicine}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");
              setSearchName("");

              loadMedicines();

            }}
          >
            Show All
          </button>

        </div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Medicine</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Expiry Date</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {medicines.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty"
                  >

                    <div className="empty-icon">
                      💊
                    </div>

                    <strong>
                      No medicines found
                    </strong>

                    <span>
                      Add a medicine or search
                      using Medicine ID.
                    </span>

                  </td>

                </tr>

              ) : (

                medicines.map((medicine) => (

                  <tr
                    key={medicine.medicineId}
                  >

                    <td>

                      <span className="id-badge">

                        #{medicine.medicineId}

                      </span>

                    </td>


                    <td>

                      <strong>
                        {medicine.medicineName}
                      </strong>

                    </td>


                    <td>
                      {medicine.category}
                    </td>


                    <td>
                      {medicine.manufacturer}
                    </td>


                    <td>
                      {medicine.quantity}
                    </td>


                    <td>
                      ₹{medicine.unitPrice}
                    </td>


                    <td>
                      {medicine.expiryDate}
                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editMedicine(medicine)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteMedicine(
                              medicine.medicineId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );
}

/* =====================================================
   PRESCRIPTION MANAGEMENT
===================================================== */

function PrescriptionManagement() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const emptyPrescription = {
    prescriptionId: null,
    patientId: "",
    doctorId: "",
    medicineId: "",
    prescriptionDate: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  };

  const [prescriptionForm, setPrescriptionForm] =
    useState(emptyPrescription);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


  /* ================= MESSAGE ================= */

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  /* ================= GET ALL ================= */

  const loadPrescriptions = async () => {

    try {

      const response = await fetch(
        `${API}/prescription/getAllPrescriptions`
      );

      const data = await response.json();

      if (
        data.content &&
        Array.isArray(data.content)
      ) {

        setAllPrescriptions(data.content);
        setPrescriptions(data.content);

      } else {

        setAllPrescriptions([]);
        setPrescriptions([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  useEffect(() => {

    loadPrescriptions();

  }, []);


  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setPrescriptionForm({
      ...prescriptionForm,
      [name]: value,
    });

  };


  /* ================= ADD ================= */

  const openAddForm = () => {

    setPrescriptionForm({
      ...emptyPrescription
    });

    setEditing(false);
    setShowForm(true);
    setMessage("");

  };


  /* ================= EDIT ================= */

  const editPrescription = (prescription) => {

    setPrescriptionForm({

      prescriptionId:
        prescription.prescriptionId,

      patientId:
        prescription.patientId || "",

      doctorId:
        prescription.doctorId || "",

      medicineId:
        prescription.medicineId || "",

      prescriptionDate:
        prescription.prescriptionDate || "",

      dosage:
        prescription.dosage || "",

      frequency:
        prescription.frequency || "",

      duration:
        prescription.duration || "",

      instructions:
        prescription.instructions || "",

    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ================= SAVE / UPDATE ================= */

  const savePrescription = async (e) => {

    e.preventDefault();


    /* ================= VALIDATION ================= */

    if (!prescriptionForm.patientId) {

      showMessage(
        "Patient ID is required.",
        "error"
      );

      return;
    }


    if (!prescriptionForm.doctorId) {

      showMessage(
        "Doctor ID is required.",
        "error"
      );

      return;
    }


    if (!prescriptionForm.medicineId) {

      showMessage(
        "Medicine ID is required.",
        "error"
      );

      return;
    }


    if (!prescriptionForm.prescriptionDate) {

      showMessage(
        "Prescription date is required.",
        "error"
      );

      return;
    }


    try {

      const url = editing
        ? `${API}/prescription/updatePrescription`
        : `${API}/prescription/savePrescription`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...prescriptionForm,

        prescriptionId:
          prescriptionForm.prescriptionId
            ? Number(prescriptionForm.prescriptionId)
            : null,

        patientId:
          Number(prescriptionForm.patientId),

        doctorId:
          Number(prescriptionForm.doctorId),

        medicineId:
          Number(prescriptionForm.medicineId),

      };


      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });


      const result = await response.json();


      if (response.ok) {

        showMessage(

          editing
            ? "Prescription updated successfully."
            : "Prescription saved successfully.",

          "success"

        );


        setPrescriptionForm({
          ...emptyPrescription
        });

        setEditing(false);
        setShowForm(false);

        await loadPrescriptions();

      } else {

        showMessage(

          result.message ||
          "Unable to save prescription.",

          "error"

        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= SEARCH ================= */

  const searchPrescription = () => {

    const id = searchId.trim();

    if (!id) {

      loadPrescriptions();
      return;

    }


    const filtered =
      allPrescriptions.filter(
        (prescription) =>
          String(
            prescription.prescriptionId
          ) === id
      );


    setPrescriptions(filtered);


    if (filtered.length === 0) {

      showMessage(
        "No prescription found.",
        "error"
      );

    } else {

      showMessage(
        `${filtered.length} prescription found.`,
        "success"
      );

    }

  };


  /* ================= DELETE ================= */

  const deletePrescription = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this prescription?"
      );

    if (!confirmed) return;


    try {

      const response = await fetch(

        `${API}/prescription/deletePrescription/${id}`,

        {
          method: "DELETE",
        }

      );


      if (response.ok) {

        showMessage(
          "Prescription deleted successfully.",
          "success"
        );

        await loadPrescriptions();

      } else {

        showMessage(
          "Unable to delete prescription.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  /* ================= CANCEL ================= */

  const cancelForm = () => {

    setPrescriptionForm({
      ...emptyPrescription
    });

    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  /* ================= RETURN ================= */

  return (

    <div className="module-page">


      {/* ================= HERO ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            💊
          </div>

          <div>

            <span className="page-label">
              PRESCRIPTION MANAGEMENT
            </span>

            <h2>
              Prescriptions
            </h2>

            <p>
              Add, search, update and manage
              patient prescriptions.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Prescription
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >

          {message}

        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE PRESCRIPTION"
                  : "NEW PRESCRIPTION"}

              </span>

              <h3>

                {editing
                  ? "Update Prescription Details"
                  : "Add New Prescription"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{prescriptionForm.prescriptionId}

              </span>

            )}

          </div>


          <form
            onSubmit={savePrescription}
            className="patient-form"
          >


            {/* PATIENT ID */}

            <div className="field">

              <label>
                Patient ID *
              </label>

              <input
                type="number"
                name="patientId"
                value={prescriptionForm.patientId}
                onChange={handleChange}
                placeholder="Enter patient ID"
                min="1"
                required
              />

            </div>


            {/* DOCTOR ID */}

            <div className="field">

              <label>
                Doctor ID *
              </label>

              <input
                type="number"
                name="doctorId"
                value={prescriptionForm.doctorId}
                onChange={handleChange}
                placeholder="Enter doctor ID"
                min="1"
                required
              />

            </div>


            {/* MEDICINE ID */}

            <div className="field">

              <label>
                Medicine ID *
              </label>

              <input
                type="number"
                name="medicineId"
                value={prescriptionForm.medicineId}
                onChange={handleChange}
                placeholder="Enter medicine ID"
                min="1"
                required
              />

            </div>


            {/* DATE */}

            <div className="field">

              <label>
                Prescription Date *
              </label>

              <input
                type="date"
                name="prescriptionDate"
                value={prescriptionForm.prescriptionDate}
                onChange={handleChange}
                required
              />

            </div>


            {/* DOSAGE */}

            <div className="field">

              <label>
                Dosage *
              </label>

              <input
                type="text"
                name="dosage"
                value={prescriptionForm.dosage}
                onChange={handleChange}
                placeholder="Example: 500 mg"
                required
              />

            </div>


            {/* FREQUENCY */}

            <div className="field">

              <label>
                Frequency *
              </label>

              <select
                name="frequency"
                value={prescriptionForm.frequency}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select frequency
                </option>

                <option value="Once daily">
                  Once daily
                </option>

                <option value="Twice daily">
                  Twice daily
                </option>

                <option value="Three times daily">
                  Three times daily
                </option>

                <option value="Four times daily">
                  Four times daily
                </option>

                <option value="As needed">
                  As needed
                </option>

              </select>

            </div>


            {/* DURATION */}

            <div className="field">

              <label>
                Duration *
              </label>

              <input
                type="text"
                name="duration"
                value={prescriptionForm.duration}
                onChange={handleChange}
                placeholder="Example: 5 days"
                required
              />

            </div>


            {/* INSTRUCTIONS */}

            <div className="field full">

              <label>
                Instructions
              </label>

              <textarea
                name="instructions"
                value={prescriptionForm.instructions}
                onChange={handleChange}
                placeholder="Enter medication instructions"
                rows="4"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Prescription"
                  : "Save Prescription"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= LIST ================= */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              PRESCRIPTION RECORDS
            </span>

            <h3>
              Prescription List
            </h3>

          </div>


          <span className="record-count">

            {prescriptions.length} Records

          </span>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-bar">

          <div className="search-input">

            <span>🔎</span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Prescription ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchPrescription}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");

              loadPrescriptions();

            }}
          >
            Show All
          </button>

        </div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Medicine ID</th>
                <th>Date</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Instructions</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {prescriptions.length === 0 ? (

                <tr>

                  <td
                    colSpan="10"
                    className="empty"
                  >

                    <div className="empty-icon">
                      💊
                    </div>

                    <strong>
                      No prescriptions found
                    </strong>

                    <span>
                      Add a prescription or search
                      using a Prescription ID.
                    </span>

                  </td>

                </tr>

              ) : (

                prescriptions.map(
                  (prescription) => (

                    <tr
                      key={
                        prescription.prescriptionId
                      }
                    >

                      <td>

                        <span className="id-badge">

                          #
                          {
                            prescription.prescriptionId
                          }

                        </span>

                      </td>


                      <td>
                        {prescription.patientId}
                      </td>


                      <td>
                        {prescription.doctorId}
                      </td>


                      <td>
                        {prescription.medicineId}
                      </td>


                      <td>
                        {prescription.prescriptionDate}
                      </td>


                      <td>
                        {prescription.dosage}
                      </td>


                      <td>
                        {prescription.frequency}
                      </td>


                      <td>
                        {prescription.duration}
                      </td>


                      <td>
                        {prescription.instructions || "N/A"}
                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-button"
                            onClick={() =>
                              editPrescription(
                                prescription
                              )
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              deletePrescription(
                                prescription.prescriptionId
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );

}

function RoomManagement() {

  const emptyRoom = {
    roomId: null,
    roomNumber: "",
    roomType: "",
    wardName: "",
    status: "",
    dailyCharge: "",
  };

  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  const [roomForm, setRoomForm] = useState(emptyRoom);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


  // ================= MESSAGE =================

  const showMessage = (text, type = "success") => {

    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };


  // ================= GET ALL ROOMS =================

  const loadRooms = async () => {

    try {

      const response = await fetch(
        `${API}/room/getAllRooms`
      );

      const data = await response.json();

      if (data.content && Array.isArray(data.content)) {

        setAllRooms(data.content);
        setRooms(data.content);

      } else {

        setAllRooms([]);
        setRooms([]);

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  useEffect(() => {

    loadRooms();

  }, []);


  // ================= INPUT CHANGE =================

  const handleRoomChange = (e) => {

    const { name, value } = e.target;

    setRoomForm({
      ...roomForm,
      [name]: value,
    });

  };


  // ================= ADD ROOM =================

  const openAddRoom = () => {

    setRoomForm({
      ...emptyRoom
    });

    setEditing(false);
    setShowForm(true);
    setMessage("");

  };


  // ================= EDIT ROOM =================

  const editRoom = (room) => {

    setRoomForm({

      roomId: room.roomId,

      roomNumber:
        room.roomNumber || "",

      roomType:
        room.roomType || "",

      wardName:
        room.wardName || "",

      status:
        room.status || "",

      dailyCharge:
        room.dailyCharge ?? "",

    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ================= SAVE / UPDATE =================

  const saveRoom = async (e) => {

    e.preventDefault();

    if (!roomForm.roomNumber.trim()) {

      showMessage(
        "Room number is required.",
        "error"
      );

      return;

    }

    if (!roomForm.roomType) {

      showMessage(
        "Room type is required.",
        "error"
      );

      return;

    }

    if (!roomForm.wardName.trim()) {

      showMessage(
        "Ward name is required.",
        "error"
      );

      return;

    }

    if (!roomForm.status) {

      showMessage(
        "Room status is required.",
        "error"
      );

      return;

    }

    if (!roomForm.dailyCharge) {

      showMessage(
        "Daily charge is required.",
        "error"
      );

      return;

    }


    try {

      const url = editing
        ? `${API}/room/updateRoom`
        : `${API}/room/saveRoom`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        ...roomForm,

        roomId: roomForm.roomId
          ? Number(roomForm.roomId)
          : null,

        dailyCharge:
          Number(roomForm.dailyCharge),

      };


      const response = await fetch(url, {

        method: method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });


      const result = await response.json();


      if (response.ok) {

        showMessage(

          editing
            ? "Room updated successfully."
            : "Room saved successfully.",

          "success"

        );

        setRoomForm({
          ...emptyRoom
        });

        setEditing(false);
        setShowForm(false);

        await loadRooms();

      } else {

        showMessage(

          result.message ||
          "Unable to save room.",

          "error"

        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  // ================= SEARCH =================

  const searchRoom = async () => {

    const id = searchId.trim();

    if (!id) {

      loadRooms();

      return;

    }


    try {

      const response = await fetch(
        `${API}/room/searchRoom/${id}`
      );

      const data = await response.json();


      if (
        data.content &&
        !Array.isArray(data.content)
      ) {

        setRooms([data.content]);

        showMessage(
          "Room found.",
          "success"
        );

      } else {

        const filtered =
          allRooms.filter(
            room =>
              String(room.roomId) === id
          );

        setRooms(filtered);

        if (filtered.length === 0) {

          showMessage(
            "Room not found.",
            "error"
          );

        }

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to search room.",
        "error"
      );

    }

  };


  // ================= DELETE =================

  const deleteRoom = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this room?"
      );

    if (!confirmed) return;


    try {

      const response = await fetch(

        `${API}/room/deleteRoom/${id}`,

        {
          method: "DELETE",
        }

      );


      const result = await response.json();


      if (response.ok) {

        showMessage(
          "Room deleted successfully.",
          "success"
        );

        await loadRooms();

      } else {

        showMessage(
          result.message ||
          "Unable to delete room.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  // ================= CANCEL =================

  const cancelRoomForm = () => {

    setRoomForm({
      ...emptyRoom
    });

    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  // ================= UI =================

  return (

    <div className="module-page">


      {/* ================= HEADER ================= */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            🏥
          </div>

          <div>

            <span className="page-label">
              ROOM MANAGEMENT
            </span>

            <h2>
              Rooms
            </h2>

            <p>
              Manage hospital rooms, wards,
              availability and daily charges.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddRoom}
        >
          + Add Room
        </button>

      </section>


      {/* ================= MESSAGE ================= */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* ================= FORM ================= */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE ROOM"
                  : "NEW ROOM"}

              </span>

              <h3>

                {editing
                  ? "Update Room Details"
                  : "Add New Room"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">

                ID #{roomForm.roomId}

              </span>

            )}

          </div>


          <form
            onSubmit={saveRoom}
            className="patient-form"
          >


            {/* ROOM NUMBER */}

            <div className="field">

              <label>
                Room Number *
              </label>

              <input
                type="text"
                name="roomNumber"
                value={roomForm.roomNumber}
                onChange={handleRoomChange}
                placeholder="Example: R-101"
                required
              />

            </div>


            {/* ROOM TYPE */}

            <div className="field">

              <label>
                Room Type *
              </label>

              <select
                name="roomType"
                value={roomForm.roomType}
                onChange={handleRoomChange}
                required
              >

                <option value="">
                  Select room type
                </option>

                <option value="General">
                  General
                </option>

                <option value="Private">
                  Private
                </option>

                <option value="Semi-Private">
                  Semi-Private
                </option>

                <option value="ICU">
                  ICU
                </option>

                <option value="Emergency">
                  Emergency
                </option>

                <option value="Operation Theatre">
                  Operation Theatre
                </option>

              </select>

            </div>


            {/* WARD */}

            <div className="field">

              <label>
                Ward Name *
              </label>

              <input
                type="text"
                name="wardName"
                value={roomForm.wardName}
                onChange={handleRoomChange}
                placeholder="Example: General Ward"
                required
              />

            </div>


            {/* STATUS */}

            <div className="field">

              <label>
                Status *
              </label>

              <select
                name="status"
                value={roomForm.status}
                onChange={handleRoomChange}
                required
              >

                <option value="">
                  Select status
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Occupied">
                  Occupied
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Reserved">
                  Reserved
                </option>

              </select>

            </div>


            {/* DAILY CHARGE */}

            <div className="field">

              <label>
                Daily Charge *
              </label>

              <input
                type="number"
                name="dailyCharge"
                value={roomForm.dailyCharge}
                onChange={handleRoomChange}
                placeholder="Example: 1500"
                min="0"
                step="0.01"
                required
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelRoomForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Room"
                  : "Save Room"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ================= ROOM LIST ================= */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              ROOM RECORDS
            </span>

            <h3>
              Room List
            </h3>

          </div>


          <span className="record-count">
            {rooms.length} Records
          </span>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-bar">

          <div className="search-input">

            <span>🔎</span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Room ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchRoom}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");

              loadRooms();

            }}
          >
            Show All
          </button>

        </div>


        {/* ================= TABLE ================= */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Ward</th>
                <th>Status</th>
                <th>Daily Charge</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {rooms.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty"
                  >

                    <div className="empty-icon">
                      🏥
                    </div>

                    <strong>
                      No rooms found
                    </strong>

                    <span>
                      Add a room or search using
                      a Room ID.
                    </span>

                  </td>

                </tr>

              ) : (

                rooms.map((room) => (

                  <tr
                    key={room.roomId}
                  >

                    <td>

                      <span className="id-badge">

                        #{room.roomId}

                      </span>

                    </td>


                    <td>

                      <strong>
                        {room.roomNumber}
                      </strong>

                    </td>


                    <td>
                      {room.roomType}
                    </td>


                    <td>
                      {room.wardName}
                    </td>


                    <td>

                      <span
                        className={
                          room.status === "Available"
                            ? "status-badge available"
                            : room.status === "Occupied"
                            ? "status-badge occupied"
                            : "status-badge"
                        }
                      >

                        {room.status}

                      </span>

                    </td>


                    <td>

                      ₹
                      {Number(
                        room.dailyCharge || 0
                      ).toFixed(2)}

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editRoom(room)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteRoom(
                              room.roomId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );

}


function TreatmentManagement() {

  const emptyTreatment = {
    treatmentId: null,
    patientId: "",
    doctorId: "",
    appointmentId: "",
    treatmentDate: "",
    diagnosis: "",
    treatmentDetails: "",
    followUpDate: "",
  };

  const [treatments, setTreatments] = useState([]);
  const [treatmentForm, setTreatmentForm] = useState(emptyTreatment);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [searchId, setSearchId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


  // ================= MESSAGE =================

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  // ================= LOAD TREATMENTS =================

  const loadTreatments = async () => {

    try {

      const response = await fetch(
        `${API}/treatment/getAllTreatments`
      );

      const data = await response.json();

      console.log("Treatment response:", data);

      if (Array.isArray(data.content)) {
        setTreatments(data.content);
      } else {
        setTreatments([]);
      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }
  };


  useEffect(() => {
    loadTreatments();
  }, []);


  // ================= INPUT CHANGE =================

  const handleTreatmentChange = (e) => {

    const { name, value } = e.target;

    setTreatmentForm({
      ...treatmentForm,
      [name]: value,
    });
  };


  // ================= ADD =================

  const openAddTreatment = () => {

    setTreatmentForm({
      ...emptyTreatment
    });

    setEditing(false);
    setShowForm(true);
    setMessage("");

  };


  // ================= EDIT =================

  const editTreatment = (treatment) => {

    setTreatmentForm({

      treatmentId: treatment.treatmentId,

      patientId:
        treatment.patientId ?? "",

      doctorId:
        treatment.doctorId ?? "",

      appointmentId:
        treatment.appointmentId ?? "",

      treatmentDate:
        treatment.treatmentDate ?? "",

      diagnosis:
        treatment.diagnosis ?? "",

      treatmentDetails:
        treatment.treatmentDetails ?? "",

      followUpDate:
        treatment.followUpDate ?? "",

    });

    setEditing(true);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ================= SAVE / UPDATE =================

  const saveTreatment = async (e) => {

    e.preventDefault();


    if (!treatmentForm.patientId) {
      showMessage("Patient ID is required.", "error");
      return;
    }

    if (!treatmentForm.doctorId) {
      showMessage("Doctor ID is required.", "error");
      return;
    }

    if (!treatmentForm.appointmentId) {
      showMessage("Appointment ID is required.", "error");
      return;
    }

    if (!treatmentForm.treatmentDate) {
      showMessage("Treatment date is required.", "error");
      return;
    }

    if (!treatmentForm.diagnosis.trim()) {
      showMessage("Diagnosis is required.", "error");
      return;
    }


    try {

      const url = editing
        ? `${API}/treatment/updateTreatment`
        : `${API}/treatment/saveTreatment`;

      const method = editing
        ? "PUT"
        : "POST";


      const body = {

        treatmentId: treatmentForm.treatmentId
          ? Number(treatmentForm.treatmentId)
          : null,

        patientId:
          Number(treatmentForm.patientId),

        doctorId:
          Number(treatmentForm.doctorId),

        appointmentId:
          Number(treatmentForm.appointmentId),

        treatmentDate:
          treatmentForm.treatmentDate,

        diagnosis:
          treatmentForm.diagnosis,

        treatmentDetails:
          treatmentForm.treatmentDetails,

        followUpDate:
          treatmentForm.followUpDate || null,

      };


      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });


      const result = await response.json();

      console.log("Save treatment response:", result);


      if (response.ok) {

        showMessage(

          editing
            ? "Treatment updated successfully."
            : "Treatment saved successfully.",

          "success"

        );

        setTreatmentForm({
          ...emptyTreatment
        });

        setEditing(false);
        setShowForm(false);

        await loadTreatments();

      } else {

        showMessage(
          result.message || "Operation failed.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  // ================= SEARCH =================

  const searchTreatment = async () => {

    const id = searchId.trim();

    if (!id) {

      loadTreatments();
      return;

    }


    try {

      const response = await fetch(
        `${API}/treatment/searchTreatment/${id}`
      );

      const data = await response.json();

      console.log("Search response:", data);


      if (
        data.content &&
        !Array.isArray(data.content)
      ) {

        setTreatments([data.content]);

        showMessage(
          "Treatment found.",
          "success"
        );

      } else {

        setTreatments([]);

        showMessage(
          "Treatment not found.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to search treatment.",
        "error"
      );

    }

  };


  // ================= DELETE =================

  const deleteTreatment = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this treatment?"
    );

    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/treatment/deleteTreatment/${id}`,
        {
          method: "DELETE",
        }
      );


      const result = await response.json();

      console.log("Delete response:", result);


      if (response.ok) {

        showMessage(
          "Treatment deleted successfully.",
          "success"
        );

        await loadTreatments();

      } else {

        showMessage(
          result.message || "Delete failed.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showMessage(
        "Unable to connect to backend.",
        "error"
      );

    }

  };


  // ================= CANCEL =================

  const cancelTreatmentForm = () => {

    setTreatmentForm({
      ...emptyTreatment
    });

    setEditing(false);
    setShowForm(false);
    setMessage("");

  };


  // ================= UI =================

  return (

    <div className="module-page">


      {/* HEADER */}

      <section className="module-hero">

        <div className="module-title">

          <div className="large-icon">
            🩺
          </div>

          <div>

            <span className="page-label">
              TREATMENT MANAGEMENT
            </span>

            <h2>
              Treatments
            </h2>

            <p>
              Manage patient treatments,
              diagnoses and follow-up details.
            </p>

          </div>

        </div>


        <button
          className="primary-button"
          onClick={openAddTreatment}
        >
          + Add Treatment
        </button>

      </section>


      {/* MESSAGE */}

      {message && (

        <div
          className={
            messageType === "error"
              ? "alert error"
              : "alert success"
          }
        >
          {message}
        </div>

      )}


      {/* FORM */}

      {showForm && (

        <section className="patient-form-card">

          <div className="form-header">

            <div>

              <span className="page-label">

                {editing
                  ? "UPDATE TREATMENT"
                  : "NEW TREATMENT"}

              </span>

              <h3>

                {editing
                  ? "Update Treatment"
                  : "Add New Treatment"}

              </h3>

            </div>


            {editing && (

              <span className="patient-id">
                ID #{treatmentForm.treatmentId}
              </span>

            )}

          </div>


          <form
            onSubmit={saveTreatment}
            className="patient-form"
          >


            {/* PATIENT ID */}

            <div className="field">

              <label>
                Patient ID *
              </label>

              <input
                type="number"
                name="patientId"
                value={treatmentForm.patientId}
                onChange={handleTreatmentChange}
                placeholder="Enter Patient ID"
                min="1"
                required
              />

            </div>


            {/* DOCTOR ID */}

            <div className="field">

              <label>
                Doctor ID *
              </label>

              <input
                type="number"
                name="doctorId"
                value={treatmentForm.doctorId}
                onChange={handleTreatmentChange}
                placeholder="Enter Doctor ID"
                min="1"
                required
              />

            </div>


            {/* APPOINTMENT ID */}

            <div className="field">

              <label>
                Appointment ID *
              </label>

              <input
                type="number"
                name="appointmentId"
                value={treatmentForm.appointmentId}
                onChange={handleTreatmentChange}
                placeholder="Enter Appointment ID"
                min="1"
                required
              />

            </div>


            {/* TREATMENT DATE */}

            <div className="field">

              <label>
                Treatment Date *
              </label>

              <input
                type="date"
                name="treatmentDate"
                value={treatmentForm.treatmentDate}
                onChange={handleTreatmentChange}
                required
              />

            </div>


            {/* DIAGNOSIS */}

            <div className="field">

              <label>
                Diagnosis *
              </label>

              <input
                type="text"
                name="diagnosis"
                value={treatmentForm.diagnosis}
                onChange={handleTreatmentChange}
                placeholder="Enter diagnosis"
                required
              />

            </div>


            {/* FOLLOW UP DATE */}

            <div className="field">

              <label>
                Follow-up Date
              </label>

              <input
                type="date"
                name="followUpDate"
                value={treatmentForm.followUpDate}
                onChange={handleTreatmentChange}
              />

            </div>


            {/* TREATMENT DETAILS */}

            <div
              className="field full-width"
            >

              <label>
                Treatment Details
              </label>

              <textarea
                name="treatmentDetails"
                value={treatmentForm.treatmentDetails}
                onChange={handleTreatmentChange}
                placeholder="Enter treatment details"
                rows="4"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={cancelTreatmentForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >

                {editing
                  ? "Update Treatment"
                  : "Save Treatment"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* LIST */}

      <section className="patient-list-card">

        <div className="list-header">

          <div>

            <span className="page-label">
              TREATMENT RECORDS
            </span>

            <h3>
              Treatment List
            </h3>

          </div>


          <span className="record-count">
            {treatments.length} Records
          </span>

        </div>


        {/* SEARCH */}

        <div className="search-bar">

          <div className="search-input">

            <span>🔎</span>

            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              placeholder="Search by Treatment ID"
            />

          </div>


          <button
            className="search-button"
            onClick={searchTreatment}
          >
            Search
          </button>


          <button
            className="secondary-button"
            onClick={() => {

              setSearchId("");
              loadTreatments();

            }}
          >
            Show All
          </button>

        </div>


        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Appointment</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Follow-up</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {treatments.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty"
                  >

                    <div className="empty-icon">
                      🩺
                    </div>

                    <strong>
                      No treatments found
                    </strong>

                    <span>
                      Add a treatment or search
                      using Treatment ID.
                    </span>

                  </td>

                </tr>

              ) : (

                treatments.map((treatment) => (

                  <tr
                    key={treatment.treatmentId}
                  >

                    <td>

                      <span className="id-badge">
                        #{treatment.treatmentId}
                      </span>

                    </td>


                    <td>
                      #{treatment.patientId}
                    </td>


                    <td>
                      #{treatment.doctorId}
                    </td>


                    <td>
                      #{treatment.appointmentId}
                    </td>


                    <td>
                      {treatment.treatmentDate}
                    </td>


                    <td>

                      <strong>
                        {treatment.diagnosis}
                      </strong>

                    </td>


                    <td>
                      {treatment.followUpDate || "-"}
                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            editTreatment(treatment)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteTreatment(
                              treatment.treatmentId
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );
}
export default App;