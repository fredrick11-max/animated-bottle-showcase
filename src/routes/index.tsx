import { createFileRoute } from "@tanstack/react-router";

import { FloatingBottles } from "@/components/FloatingBottles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floating Friends" },
      {
        name: "description",
        content:
          "Made this, coz im bored.",
      },
      { property: "og:title", content: "Floating Friends" },
      {
        property: "og:description",
        content:
          "Made this, coz im bored.",
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
