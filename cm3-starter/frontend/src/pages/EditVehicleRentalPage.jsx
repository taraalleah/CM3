import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVehicleRentalPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  //const [agency, setAgency] = useState("");
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  //const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  //const [listingDate, setListingDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        const data = await res.json();
        setVehicleModel(data.vehicleModel);
        setCategory(data.category);
        setDescription(data.description);
        //setAgency(data.agency);
        setName(data.name);
        setContactEmail(data.contactEmail);
        setFleetSize(data.fleetSize);
        //setLocation(data.location);
        setCity(data.city);
        setState(data.state);
        setDailyPrice(data.dailyPrice);
        //setListingDate(data.listingDate);
        setListingDate(data.listingDate ? new Date(data.listingDate).toISOString().split("T")[0] : "");
        setAvailabilityStatus(data.availabilityStatus);
        setBookingDeadline(data.bookingDeadline);
        setInsurancePolicy(data.insurancePolicy);
      } catch (error) {
        console.error("Error fetching vehicle rental:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleRental();
  }, [id]);

  const updateVehicleRental = async (rentals) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentals),
      });
      if (!res.ok) {
        throw new Error("Failed to update vehicle rental");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedVehicleRental = {
      vehicleModel,
      category,
      description,
      agency: {
        name,
        contactEmail,
        fleetSize,
      },
      location: {
        city,
        state,
      },
      dailyPrice,
      listingDate,
      availabilityStatus,
      bookingDeadline,
      insurancePolicy
    };

    updateVehicleRental(updatedVehicleRental);
    return navigate(`/vehicleRentals/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create">
      <h2>Update Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Agency Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Fleet Size:</label>
        <input
          type="number"
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Daily Price:</label>
        <input
          type="number"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
        />
        {/* <label>Listing Date:</label>
        <input
          type="date"
          value={listingDate}
          onChange={(e) => setListingDate(e.target.value)}
        /> */}
        <label>Availability Status:</label>
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <label>Booking Deadline:</label>
        <input
          type="date"
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />
        <label>Insurance Policy:</label>
        <textarea
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
        />
        <button type="submit">Update Vehicle Rental</button>
      </form>
    </div>
  );
};

export default EditVehicleRentalPage;

