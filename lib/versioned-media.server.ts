import "server-only";

import fs from "fs";
import path from "path";

/** Добавляет `?v=mtime` к локальным файлам из `public/` — браузер подхватывает заменённые картинки. */
export function versionedPublicSrc(publicPath: string): string {
  if (!publicPath.startsWith("/")) return publicPath;

  const [pathname, search = ""] = publicPath.split("?");
  const filePath = path.join(process.cwd(), "public", pathname.replace(/^\//, ""));

  try {
    const { mtimeMs } = fs.statSync(filePath);
    const params = new URLSearchParams(search);
    params.set("v", String(mtimeMs));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  } catch {
    return publicPath;
  }
}
