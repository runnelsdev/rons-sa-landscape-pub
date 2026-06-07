import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { workOrders, clients } from "@/lib/data";
import { fmtMoney, fmtDate, statusTone, titleize } from "@/lib/utils";

export default function WorkOrdersPage() {
  const buckets = [
    { label: "Draft", status: ["draft"] },
    { label: "Scheduled", status: ["scheduled"] },
    { label: "In Progress", status: ["in-progress"] },
    { label: "Completed", status: ["completed", "invoiced", "paid"] },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Module 02 · Work Orders & Projects"
        title="Work Orders"
        subtitle="Every billable touch on a property — from a $40 trim job to a $20k install."
        action={<button className="btn">+ New Work Order</button>}
      />

      <div className="px-8 py-8 space-y-6">
        {/* Kanban-style buckets */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {buckets.map((bucket) => {
            const items = workOrders.filter((w) =>
              bucket.status.includes(w.status)
            );
            return (
              <div key={bucket.label} className="panel min-h-[400px]">
                <header className="px-4 py-3 border-b-[1.5px] border-ink bg-cream/40 flex items-center justify-between">
                  <h3 className="display text-[18px]">{bucket.label}</h3>
                  <span className="chip">{items.length}</span>
                </header>
                <div className="p-3 space-y-3">
                  {items.length === 0 && (
                    <div className="text-[12px] text-slate italic px-2 py-4">
                      Empty.
                    </div>
                  )}
                  {items.map((wo) => {
                    const client = clients.find((c) => c.id === wo.clientId);
                    return (
                      <Link
                        key={wo.id}
                        href={`/dashboard/work-orders/${wo.id}`}
                        className="block panel-stamp p-3"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="mono text-[11px] font-semibold">
                            {wo.number}
                          </span>
                          <Chip tone={statusTone(wo.status)}>
                            {titleize(wo.jobType)}
                          </Chip>
                        </div>
                        <div className="display text-[15px] leading-tight mb-1">
                          {client?.name}
                        </div>
                        <div className="text-[12px] text-slate line-clamp-2 leading-snug">
                          {wo.description}
                        </div>
                        <div className="border-t border-dashed border-ink/20 mt-3 pt-2 flex items-center justify-between">
                          <span className="mono text-[10px] text-slate">
                            {fmtDate(wo.scheduledFor)}
                          </span>
                          <span className="mono text-[11px] font-semibold">
                            {wo.invoiceTotal
                              ? fmtMoney(wo.invoiceTotal)
                              : `~${wo.laborHoursEstimated}h`}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
