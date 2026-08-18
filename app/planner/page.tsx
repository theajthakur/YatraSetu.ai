import PlannerForm from "@/components/planner/PlannerForm";

export default function PlannerPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-b from-background via-primary-100/40 to-background min-h-[calc(100vh-5rem)]">
      <PlannerForm />
    </main>
  );
}
