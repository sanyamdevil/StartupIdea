"use client";
import { useState } from "react";
import Image from "next/image";

export default function FormPage() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setResult(data);
      form.reset();
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-23">
      <div className="w-full flex-grow max-w-lg bg-zinc-900 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Submit Your Startup Idea 🚀
        </h1>

        <form onSubmit={onSubmit} className=" space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter name"
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              required
              placeholder="Enter description"
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Website
            </label>
            <input
              name="website"
              type="url"
              required
              placeholder="https://example.com"
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              onChange={onFileChange}
              className="w-full text-gray-300 bg-black border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-500 transition"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <div className="relative w-full h-64 border border-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                  unoptimized // ✅ Needed for local object URLs
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white font-semibold transition"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>

        {/* Error / Success */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        {result?.imageUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-400 font-medium">
              ✅ Submitted successfully!
            </p>
            <a
              href={result.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 underline hover:text-orange-300 mt-2 inline-block"
            >
              View Uploaded Image
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
