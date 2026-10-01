import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({setIsAuthenticated}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [city, setCity] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        password,
        phone_number: phoneNumber,
        licenseNumber,
        date_of_birth: dateOfBirth,
        address: {
          licenseExpiryDate,
          city,
          yearsOfExperience
        },
      }),
    });
    const user = await response.json();

    if (!response.ok) {
      console.log("Error in signUp")
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    setIsAuthenticated(true);
    navigate("/");
  }



  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Phone number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>License Number:</label>
        <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <label>License Expiry Date:</label>
        <input type="date" value={licenseExpiryDate} onChange={(e) => setLicenseExpiryDate(e.target.value)} />
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <label>Years of Experience:</label>
        <input type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
        <button>Sign up</button>
      </form>
    </div>
  );
};
export default SignUpPage;
