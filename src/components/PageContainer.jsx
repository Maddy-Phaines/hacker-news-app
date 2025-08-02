// components/PageContainer.jsx
export default function PageContainer({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto outline ${className}`}>{children}</div>
  );
}
