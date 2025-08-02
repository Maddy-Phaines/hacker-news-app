import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchBarPage from "./components/SearchBarPage";

function App() {
  return (
    <div
      className="min-h-screen min-w-screen 
    text-[var(--color-text)] transition-colors"
    >
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:tag" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/searchpage" element={<SearchBarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
