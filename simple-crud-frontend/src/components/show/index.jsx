export default function Show ({ condition, children }) {
  if (condition) return children;
  return '';
}