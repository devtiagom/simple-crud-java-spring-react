export default function Show ({ children, condition }) {
  if (condition) return children;
  return '';
}