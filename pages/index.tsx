import { useState, useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

// ---------------------------------------------------------
// getServerSideProps -> Yeh function Next.js me server par chalta hai
// (browser me nahi), isliye user ko page already-filled HTML milta hai.
// Isi se SSR (Server-Side Rendering) hota hai jo requirement me maanga gaya tha.
// ---------------------------------------------------------
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error("API responded with status:", res.status);
      return { props: { products: [] } };
    }

    const products: Product[] = await res.json();

    return {
      props: { products },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: { products: [] },
    };
  }
};
const ITEMS_PER_PAGE = 8;

export default function Home({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Categories nikal rahe hain dropdown filter ke liye (bonus touch)
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // Jab bhi search term ya category badle, thoda "loading" effect dikhate hain
  // (real app me yeh delay debounce / API call ke time aata hai)
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Search + category dono ke hisaab se filter karna
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesTitle && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Jab search/category change ho, page 1 par wapas le jao
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container py-4">
      {/* ---------- Header ---------- */}
      <nav className="navbar mb-4">
        <span className="navbar-brand fs-3">🛒 Product Store</span>
      </nav>

      {/* ---------- Search bar + Category filter ---------- */}
      <div className="row mb-4 g-2">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select form-select-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- Result count ---------- */}
      <p className="text-muted">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
      </p>

      {/* ---------- Loading / Products grid ---------- */}
      {isFiltering ? (
        <LoadingSpinner />
      ) : filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center">No products found. Try a different search.</div>
      ) : (
        <div className="row">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* ---------- Pagination ---------- */}
      {totalPages > 1 && !isFiltering && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
