import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { ArticleProvider } from "./utils/useArticle";
import { CategoryProvider } from "./utils/useCategory";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import "antd/lib/divider/style";
import "antd/lib/table/style";
import SuspenseLoad from "./components/SuspenseLoad";

const LazyBlogs = React.lazy(() => import("./pages/Public/Blogs"));
const LazyCategory = React.lazy(() => import("./pages/Public/Category"));
const LazyBlogItem = React.lazy(() => import("./pages/Public/BlogItem"));
const LazyCategories = React.lazy(() => import("./pages/Admin/Categories"));
const LazyArticles = React.lazy(() => import("./pages/Admin/Articles"));

function App() {
  return (
    <div className="App">
      <ArticleProvider>
        <CategoryProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <SuspenseLoad>
                      <LazyBlogs />
                    </SuspenseLoad>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <SuspenseLoad>
                      <LazyBlogItem />
                    </SuspenseLoad>
                  }
                />
                <Route
                  path="/category/:id"
                  element={
                    <SuspenseLoad>
                      <LazyCategory />
                    </SuspenseLoad>
                  }
                />
              </Route>
              <Route element={<ProtectedRoute isLogin redirectPath="/" />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="admin" element={<AdminLayout />}>
                <Route element={<ProtectedRoute />}>
                  <Route
                    index
                    element={
                      <SuspenseLoad>
                        <LazyArticles />
                      </SuspenseLoad>
                    }
                  />
                  <Route
                    path="categories"
                    element={
                      <SuspenseLoad>
                        <LazyCategories />
                      </SuspenseLoad>
                    }
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </ArticleProvider>
    </div>
  );
}

export default App;
