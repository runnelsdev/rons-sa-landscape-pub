import PageHeader from "@/components/PageHeader";
import EstimatorClient from "@/components/EstimatorClient";

export default function EstimatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 04 · Estimating Support"
        title="Estimator"
        subtitle="Ron's pricing logic, encoded. Lot size + scope + crew = honest number, every time."
      />
      <div className="px-8 py-8">
        <EstimatorClient />
      </div>
    </>
  );
}
