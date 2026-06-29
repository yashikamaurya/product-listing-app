import Link from "next/link";
import { Product } from "@/types/product";

// Yeh component ek single product ko "card" ke form me dikhata hai
// Isko hum ProductList me loop se baar baar use karenge

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    // col-* classes Bootstrap grid ke through responsive layout dete hain
    // mobile par 1 card, tablet par 2, desktop par 3-4 cards ek row me
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "220px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          {/* Title ko 2 lines tak limit kiya hai taaki card ka size sab jagah equal rahe */}
          <h6
            className="card-title"
            style={{
              minHeight: "48px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </h6>

          <p className="mb-1">
            <span className="badge bg-secondary text-capitalize">{product.category}</span>
          </p>

          <p className="fw-bold fs-5 mb-1">${product.price}</p>

          {/* Rating sirf tab dikhao agar API se mil rahi ho */}
          {product.rating && (
            <p className="text-warning mb-2">
              ⭐ {product.rating.rate}{" "}
              <span className="text-muted">({product.rating.count} reviews)</span>
            </p>
          )}

          <div className="mt-auto">
            <Link href={`/product/${product.id}`} className="btn btn-primary w-100">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
