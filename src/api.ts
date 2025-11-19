// src/api.ts
import type { Product } from "./types";
export type { Product };

export const API_BASE_URL = "http://127.0.0.1:8000";

// 📦 Ambil semua produk
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

// 📦 Ambil satu produk ikut id
export async function getProduct(id: number | string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }

  return res.json();
}

// ✚ Tambah produk baru
export async function createProduct(
  data: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create product: ${res.status}`);
  }

  return res.json();
}

// ✎ Update produk sedia ada
export async function updateProduct(
  id: number | string,
  data: Partial<Product>
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
    method: "PATCH", // kalau backend allow PUT juga takpe, PATCH lebih selamat
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update product ${id}: ${res.status}`);
  }

  return res.json();
}

// 🗑 Delete produk
export async function deleteProduct(id: number | string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete product ${id}: ${res.status}`);
  }
}
