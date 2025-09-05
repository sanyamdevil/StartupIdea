import { dbConnect } from "@/lib/mongodb";
import Submission from "@/models/Submission";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const submissions = await Submission.find({})
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify(submissions), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch submissions" }),
      { status: 500 }
    );
  }
}
