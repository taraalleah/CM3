import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VehicleRentalPage = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicleRental, setVehicleRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(isAuthenticated)

  const deleteVehicleRental = async (vehicleRentalId) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${vehicleRentalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete vehicle rental");
      }
    } catch (error) {
      console.error("Error deleting vehicle rental:", error);
    }
  };

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setVehicleRental(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleRental();
  }, [id]);

  const onDeleteClick = (vehicleRentalId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this vehicle rental?"
    );
    if (!confirm) return;

    deleteVehicleRental(vehicleRentalId);
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="rental-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Vehicle Rental Details</h2>
          <h2>{vehicleRental.vehicleModel}</h2>
          <p>Category: {vehicleRental.category}</p>
          <p>Description: {vehicleRental.description}</p>
          <h4>Agency:</h4>
          <p>Name: {vehicleRental.agency.name}</p>
          <p>Contact Email: {vehicleRental.agency.contactEmail}</p>
          <p>Fleet Size: {vehicleRental.agency.fleetSize}</p>
          <h4>Location:</h4>
          <p>City: {vehicleRental.location.city}</p>
          <p>State: {vehicleRental.location.state}</p>
          <p>Daily Price: ${vehicleRental.dailyPrice}</p>
          <p>Listing Date: {new Date(vehicleRental.listingDate).toLocaleDateString()}</p>
          <p>Availability Status: {vehicleRental.availabilityStatus}</p>
          <p>Booking Deadline: {vehicleRental.bookingDeadline}</p>
          <p>Insurance Policy: {vehicleRental.insurancePolicy}</p>
          <button onClick={() => handleGoHome()}>Back</button>
          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(vehicleRental._id)}>Delete</button>
              <button onClick={() => navigate(`/edit/${vehicleRental._id}`)}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleRentalPage;

