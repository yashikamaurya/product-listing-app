// Yeh ek chota component hai jo loading ke time spinner dikhata hai
// Hum isko client-side filtering ke dummy delay me use karenge

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
