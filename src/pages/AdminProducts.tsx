// src/pages/AdminProducts.tsx
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "../api";
import "./AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Omit<Product, "id"> = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      category: form.category || "Others",
    };

    try {
      setLoading(true);
      setError(null);

      if (editingId === null) {
        const newProduct = await createProduct(payload);
        setProducts((prev) => [...prev, newProduct]);
      } else {
        const updated = await updateProduct(editingId, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
      }

      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
      setEditingId(null);
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Betul nak delete menu ni?")) return;

    try {
      setLoading(true);
      setError(null);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: String(p.price),
      description: p.description || "",
      image: p.image || "",
      category: p.category || "",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Admin Menu</h1>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            Uruskan senarai menu café anda di sini.
          </p>
        </div>
        <span className="admin-badge">Admin Panel</span>
      </header>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-layout">
        {/* Senarai Menu */}
        <section className="admin-card">
          <h2>Senarai Menu</h2>
          <div className="admin-table-wrapper">
            {loading && products.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Deskripsi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td className="admin-price">RM {p.price}</td>
                      <td>{p.category}</td>
                      <td>
                        {p.image && (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </td>
                      <td>{p.description}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && !loading && (
                    <tr>
                      <td colSpan={7} className="admin-empty">
                        Tiada menu lagi. Tambah menu pertama anda di sebelah
                        kanan 👈
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Form Tambah / Edit */}
        <section className="admin-card">
          <h2>{editingId ? "Edit Menu" : "Tambah Menu"}</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Nama:
              <input
                className="admin-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Harga (RM):
              <input
                className="admin-input"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Deskripsi:
              <textarea
                className="admin-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Image URL:
              <input
                className="admin-input"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://contoh.com/gambar.jpg"
              />
            </label>

            <label>
              Category:
              <input
                className="admin-input"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Contoh: Coffee / Tea / Special"
              />
            </label>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {editingId ? "Update" : "Tambah"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
