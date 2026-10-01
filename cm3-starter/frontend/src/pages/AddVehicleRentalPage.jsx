import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddVehicleRentalPage = () => {
  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("Economy");
  const [description, setDescription] = useState("");

  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fleetSize, setFleetSize] = useState(0);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [dailyPrice, setDailyPrice] = useState(0);
  // const [listingDate, setListingDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");



  const navigate = useNavigate();

  const addVehicle = async (newVehicle) => {
    try {
      const res = await fetch("/api/vehicleRentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
      });
      console.log(res)
      if (!res.ok) {
        throw new Error("Failed to add Vehicle");
      }
      return true;
    } catch (error) {
      console.error("Error adding Vehicle:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newVehicle = {
      vehicleModel: vehicleModel,
      category: category,
      description: description,
      agency: {
        name: name,
        contactEmail: contactEmail,
        fleetSize: fleetSize
      },
      location: {
        city: city,
        state: state,
      },
      dailyPrice: dailyPrice,
      listingDate: new Date(),
      availabilityStatus: availabilityStatus,
      bookingDeadline: bookingDeadline,
      insurancePolicy: insurancePolicy
    };
    console.log(newVehicle)

    const success = await addVehicle(newVehicle);
    if (success) {
      console.log("Vehicle Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the Vehicle");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input type="text"
          required
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="Economy" default>Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
        <label>Description:</label>
        <textarea type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Agency Name:</label>
        <input type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Agency Email:</label>
        <input type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Fleet Size:</label>
        <input type="number"
          min = "0"
          required
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
        />
        <label>City:</label>
        <input type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>State:</label>
        <input type="text"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Daily Price:</label>
        <input type="number"
        step="0.01"
        min="0"
        required
        value={dailyPrice}
        onChange={(e) => setDailyPrice(e.target.value)}
        />
        <label>Availability Status:</label>
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}>
          <option value="available" default>Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <label>Booking Deadline:</label>
        <input type="date"
          required
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />
        <label>Insurance Policy:</label>
        <input type="text"
          required
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
        />
        <button>Add Vehicle Rental</button>
      </form>
    </div>
  );
};

export default AddVehicleRentalPage;

