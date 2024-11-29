import fs from "fs";
import path from "path";
import { parseFrontmatter } from "../../components/blog/utils";

export default function handler(req, res) {
  const contentDir = path.join(process.cwd(), "content/blog");
  const fileNames = fs.readdirSync(contentDir);

  const allBlogs = fileNames.map((fileName) => {
    const filePath = path.join(contentDir, fileName);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(rawContent);
    const slug = fileName.replace(/\.mdx$/, "");

    return { metadata, slug, content };
  });

  res.status(200).json(allBlogs);
}
