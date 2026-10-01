import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  return (
    <div className="rental-list">
      {products.map((vehicle) => (
        <VehicleRentalListing key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleRentalListings;

