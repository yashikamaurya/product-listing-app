import { GetServerSideProps } from "next";
import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product | null;
}

// Yeh dynamic route hai: /product/1, /product/2, etc.
// "id" wahi value hai jo URL me [id] ki jagah aata hai
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      return { props: { product: null } };
    }

    const product: Product = await res.json();
    return { props: { product } };
  } catch {
    return { props: { product: null } };
  }
};

export default function ProductDetails({ product }: Props) {
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link href="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link href="/" className="btn btn-outline-secondary mb-4">
        ← Back to Products
      </Link>

      <div className="row">
        <div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: "350px", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        <div className="col-12 col-md-7">
          <h2>{product.title}</h2>
          <span className="badge bg-secondary text-capitalize mb-3">{product.category}</span>

          <h3 className="text-success">${product.price}</h3>

          {product.rating && (
            <p className="text-warning fs-5">
              ⭐ {product.rating.rate}{" "}
              <span className="text-muted fs-6">({product.rating.count} reviews)</span>
            </p>
          )}

          <hr />

          <h5>Description</h5>
          <p className="text-secondary">{product.description}</p>

          <button className="btn btn-primary btn-lg mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
