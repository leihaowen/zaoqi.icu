import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 获取资源路径，自动添加basePath前缀
export function getAssetPath(path: string): string {
  // 仅在静态导出（如 GitHub Pages）时加 basePath，SSR 时不加
  const basePath =
    process.env.EXPORT_STATIC === 'true'
      ? '/zaoqi.icu'
      : '';
  return `${basePath}${path}`;
}