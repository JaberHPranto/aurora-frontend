import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const ApiKeyPage = lazy(() => import("@/pages/ApiKeyPage"));
const ChatStudioPage = lazy(() => import("@/pages/ChatStudioPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const routes = [
  {
    path: "/",
    element: <ApiKeyPage />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatStudioPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
