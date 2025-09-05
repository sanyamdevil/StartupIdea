import { imagekit } from "@/lib/imagekit";
import { dbConnect } from "@/lib/mongodb";
import Submission from "@/models/Submission";

export const runtime = "nodejs"; // Needed for mongoose & Buffer

export async function POST(request) {
  try {
    // 1) Parse incoming form-data
    const formData = await request.formData();

    const name = (formData.get("name") || "").toString().trim();
    const description = (formData.get("description") || "").toString().trim();
    const website = (formData.get("website") || "").toString().trim();
    const file = formData.get("image");

    // 2) Validate inputs
    if (!name || !description || !website || !file) {
      return Response.json(
        { ok: false, error: "All fields (name, description, website, image) are required." },
        { status: 400 }
      );
    }

    if (typeof file === "string" || !file.type?.startsWith("image/")) {
      return Response.json({ ok: false, error: "Invalid file type." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ ok: false, error: "Image too large (max 5MB)." }, { status: 400 });
    }

    // 3) Convert File → Buffer for ImageKit
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4) Upload image to ImageKit
    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${file.name.replace(/\s+/g, "-")}`,
      folder: "/uploads",
      useUniqueFileName: true,
    });

    // 5) Connect to MongoDB & save form data
    await dbConnect();
    const saved = await Submission.create({
      name,
      description,
      website,
      imageUrl: uploaded.url,
      imageFileId: uploaded.fileId,
    });

    // 6) Return success response
    return Response.json(
      {
        ok: true,
        id: saved._id,
        name: saved.name,
        description: saved.description,
        website: saved.website,
        imageUrl: saved.imageUrl,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ API error:", err);
    return Response.json({ ok: false, error: err.message || "Server error" }, { status: 500 });
  }
}
