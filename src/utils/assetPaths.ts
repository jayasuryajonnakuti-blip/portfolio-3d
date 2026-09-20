/**
 * Utility to resolve relative asset paths reliably in both dev and production.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Ensure consistent leading slash for root-relative asset URLs
  if (path.startsWith('/')) {
    return path;
  }
  return `/${path}`;
}
