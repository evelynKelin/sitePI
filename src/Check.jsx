// src/Check.jsx
export default function Check({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      style={{
        marginRight: "8px",
        verticalAlign: "middle",
        cursor: "pointer",
      }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
