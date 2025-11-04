import React, { useState, useEffect, useCallback } from "react";
import EditInputLabel from "./EditInputLabel";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const DEFAULT_FORM = {
  firstName: "",
  lastName: "",
  userName: "",
  age: "",
  gender: "",
  about: "",
  skills: [],
};

const fields = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "User Name", name: "userName", type: "text" },
  { label: "Age", name: "age", type: "number" },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: ["male", "female", "other"],
  },
  { label: "About", name: "about", type: "text" },
  {
    label: "Skills",
    name: "skills",
    type: "array",
  },
];

const EditProfile = ({ user }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        ...user,
        skills: Array.isArray(user.skills) ? user.skills : [],
      }));
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      const skillsArray = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      setForm((prev) => ({ ...prev, skills: skillsArray }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  // inside your component (replace saveProfile and the button)
  const saveProfile = async () => {
    try {
      // Build a safe payload only from expected fields
      const payload = {
        firstName: form.firstName ?? "",
        lastName: form.lastName ?? "",
        userName: form.userName ?? "",
        age: form.age ?? "",
        gender: form.gender ?? "",
        about: form.about ?? "",
        // ensure skills is an array of strings
        skills: Array.isArray(form.skills)
          ? form.skills
          : typeof form.skills === "string" && form.skills.length
          ? form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };

      console.log("Sending payload:", payload);

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // handle response
      console.log("Profile saved response:", res);
      // dispatch updated user if server returns updated user object
      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
      } else if (res?.data) {
        // sometimes server returns updated user directly in data
        dispatch(addUser(res.data));
      }
    } catch (err) {
      // Helpful debug logs
      console.error("Save profile failed:", err);

      // axios error: server responded with status
      if (err.response) {
        console.error(
          "Server responded:",
          err.response.status,
          err.response.data
        );
        setError(
          err.response.data?.message || `Server error: ${err.response.status}`
        );
      } else if (err.request) {
        // request made but no response
        console.error("No response received:", err.request);
        setError("No response from server. Check network or CORS.");
      } else {
        // something else
        setError(err.message || "Unexpected error");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>
          {fields.map((f) => (
            <EditInputLabel
              key={f.name}
              labelText={f.label}
              name={f.name}
              inputValue={
                f.type === "array" ? form[f.name].join(", ") : form[f.name]
              }
              onChange={handleChange}
              type={f.type}
              options={f.options}
            />
          ))}
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
