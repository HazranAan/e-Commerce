// src/api.ts
// Semua call API ke Django backend letak sini

export const API_BASE_URL = "http://127.0.0.1:8000";

// --- PRODUCTS ---

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  // Django REST Framework biasanya return array of objects
  return res.json();
}

export async function getProduct(id: number | string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }

  return res.json();
}

// --- (Optional kalau nanti nak guna) ---
// export async function loginUser(email: string, password: string) { ... }
// export async function addToCart(...) { ... }
