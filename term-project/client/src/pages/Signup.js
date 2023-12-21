import React, { useState } from "react";
// import Layout from "./../components/layouts/Layout";
import "../styles/SignupStyle.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "dob") setDob(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "gender") setGender(e.target.value);
    else if (e.target.name === "city") setCity(e.target.value);
    else if (e.target.name === "address") setAddress(e.target.value);
    else if (e.target.name === "phone") setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const data = { name, email, password, dob, city, address, gender, phone };

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      console.log("Success:", result);
      alert("User added successfully");
    } catch (error) {
      console.error("Error:", error);
    }

    setName("");
    setEmail("");
    setDob("");
    setGender("");
    setPassword("");
    setCity("");
    setAddress("");
    setPhone("");
  };

  return (
    <div>
      <div className="wrapper">
        <section className="container">
          <header>Signup Form</header>
          <form onSubmit={handleSubmit} className="form" method="POST">
            {/* Full Name */}
            <div className="column">
              <div className="input-box">
                <label>Username</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="input-box">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            {/* Email and Birth Date */}
            <div className="column">
              {/* Email */}
              <div className="input-box">
                <label>Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              {/* Birth Date */}
              <div className="input-box">
                <label>Birth Date</label>
                <input
                  type="date"
                  value={dob}
                  onChange={handleChange}
                  name="dob"
                  placeholder="Enter birth date"
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="gender-box">
              <h3>Gender</h3>
              <div className="gender-option">
                {/* Male */}
                <div className="gender">
                  <input
                    type="radio"
                    id="check-male"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <label htmlFor="check-male">Male</label>
                </div>
                {/* Female */}
                <div className="gender">
                  <input
                    type="radio"
                    id="check-female"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <label htmlFor="check-female">Female</label>
                </div>
                {/* Prefer not to say */}
                <div className="gender">
                  <input
                    type="radio"
                    id="check-other"
                    name="gender"
                    checked={gender === "other"}
                    onChange={() => setGender("other")}
                  />
                  <label htmlFor="check-other">Prefer not to say</label>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="input-box address">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={handleChange}
                name="address"
                placeholder="Enter address"
                required
              />
            </div>
            {/* Phone Number and City */}
            <div className="column">
              <div className="input-box">
                <label>Phone Number</label>
                <input
                  type="number"
                  value={phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="input-box">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={handleChange}
                  name="city"
                  placeholder="Enter your city"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Signup;