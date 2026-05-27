"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import type { ProductDTO } from "@/types/product";

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export default function ProductModal({
  product,
  onClose,
}: {
  product: ProductDTO;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = ["P", "M", "G", "GG"];

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        model: product.model,
        priceCents: product.priceCents,
        imageUrl: product.imageUrl,
        size: size ?? null,
      });
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl w-full rounded-2xl bg-[#071027] shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full bg-[#081327]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl opacity-40">👕</div>
            )}
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              <p className="text-sm text-sky-300/90">{product.model}</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{product.description}</p>
            <div className="mt-2 text-lg font-semibold text-white">{formatBRL(product.priceCents)}</div>

            <div className="mt-4">
              <div className="mb-2 text-sm text-white/80">Escolha o tamanho</div>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      size === s
                        ? "bg-sky-500 text-[#060b14]"
                        : "bg-white/5 text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md bg-white/5 p-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2"
                >
                  −
                </button>
                <div className="w-8 text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2"
                >
                  +
                </button>
              </div>

              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 bg-white/5 text-white/80"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="rounded-md bg-sky-500 px-4 py-2 font-semibold text-[#060b14]"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
