import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="series/:id" element={<SeriesDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
