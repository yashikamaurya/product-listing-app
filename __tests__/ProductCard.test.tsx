import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

// Ek dummy/fake product banaya test ke liye, real API call nahi karna test me
const mockProduct: Product = {
  id: 1,
  title: "Test T-Shirt",
  price: 25.99,
  description: "A sample product for testing",
  category: "clothing",
  image: "https://via.placeholder.com/150",
  rating: { rate: 4.5, count: 120 },
};

describe("ProductCard", () => {
  it("renders product title", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test T-Shirt")).toBeInTheDocument();
  });

  it("renders product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$25.99")).toBeInTheDocument();
  });

  it("renders product category", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("clothing")).toBeInTheDocument();
  });

  it("renders rating when available", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
  });
});
