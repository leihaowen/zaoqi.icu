import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 获取资源路径，自动添加basePath前缀
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/zaoqi.icu' : ''
  return `${basePath}${path}`
}