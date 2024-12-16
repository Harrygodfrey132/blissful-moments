import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { parseFrontmatter } from "../../components/blog/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const contentDir = path.join(process.cwd(), "content/blog");

  try {
    // Read all file names in the content directory
    const fileNames = fs.readdirSync(contentDir);

    // Map over file names to extract metadata and content
    const allBlogs = fileNames.map((fileName) => {
      const filePath = path.join(contentDir, fileName);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { metadata, content } = parseFrontmatter(rawContent);
      const slug = fileName.replace(/\.mdx$/, ""); // Replace .mdx extension with an empty string

      return { metadata, slug, content };
    });

    // Send a successful response with the blogs
    res.status(200).json(allBlogs);
  } catch (error) {
    // Handle errors and send a 500 response
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}
