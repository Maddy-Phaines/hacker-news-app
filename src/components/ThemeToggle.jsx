function ThemeToggle() {
  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    console.log("handleClick clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1 rounded border-gray-500 hover:opacity-90 cursor-pointer"
    >
      Toggle theme
    </button>
  );
}
export default ThemeToggle;
