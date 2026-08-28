import { createFileRoute } from "@tanstack/react-router";

import { FloatingBottles } from "@/components/FloatingBottles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Floating Cellar — Ten Bottles in Zero Gravity" },
      {
        name: "description",
        content:
          "A creative, animated scene of ten glowing bottles drifting through light — smooth motion, ambient glows, and cursor parallax.",
      },
      { property: "og:title", content: "The Floating Cellar — Ten Bottles in Zero Gravity" },
      {
        property: "og:description",
        content:
          "Ten glowing bottles drift through ambient light in a smooth, animated zero-gravity scene.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-dvh bg-background">
      <FloatingBottles />
    </main>
  );
}
