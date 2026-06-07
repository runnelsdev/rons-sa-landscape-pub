import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataRow from "@/components/DataRow";
import { Chip } from "@/components/Chip";
import { workOrders, clients } from "@/lib/data";
import { fmtMoney, fmtDate, statusTone, titleize } from "@/lib/utils";

export default function WorkOrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const wo = workOrders.find((w) => w.id === params.id);
  if (!wo) return notFound();

  const client = clients.find((c) => c.id === wo.clientId);

  // Cost calculations
  const materialsTotal = wo.materials.reduce(
    (sum, m) => sum + m.quantity * m.unitCost * m.markup,
    0
  );
  const laborTotal = wo.laborHoursEstimated * wo.laborRate;
  const grandTotal = materialsTotal + laborTotal;

  return (
    <>
      <PageHeader
        eyebrow={`Work Order · ${wo.number}`}
        title={titleize(wo.jobType)}
        subtitle={`${client?.name} · ${wo.propertyAddress}`}
        backHref="/dashboard/work-orders"
        action={
          <div className="flex gap-2">
            <Chip tone={statusTone(wo.status)}>{wo.status}</Chip>
            <button className="btn btn-secondary">Edit</button>
            <button className="btn">Mark Complete</button>
          </div>
        }
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description + notes */}
          <Panel eyebrow="Scope" title="Description">
            <p className="text-[15px] leading-relaxed">{wo.description}</p>
            {wo.notes && (
              <div className="mt-4 pt-4 border-t border-dashed border-ink/20">
                <div className="label mb-2">Notes</div>
                <p className="text-[13px] leading-relaxed text-slate italic">
                  {wo.notes}
                </p>
              </div>
            )}
          </Panel>

          {/* Materials */}
          <Panel eyebrow="Bill of Materials" title="Materials" dense>
            {wo.materials.length === 0 ? (
              <p className="px-5 py-6 text-slate text-[13px]">No materials.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-cream/30 border-b-[1.5px] border-ink">
                    <th className="label text-left px-5 py-3">Description</th>
                    <th className="label text-right px-5 py-3">Qty</th>
                    <th className="label text-right px-5 py-3">Unit Cost</th>
                    <th className="label text-right px-5 py-3">Markup</th>
                    <th className="label text-right px-5 py-3">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {wo.materials.map((m) => (
                    <tr key={m.id} className="border-b border-ink/10">
                      <td className="px-5 py-3 text-[14px]">{m.description}</td>
                      <td className="px-5 py-3 text-right mono text-[12px]">
                        {m.quantity} {m.unit}
                      </td>
                      <td className="px-5 py-3 text-right mono text-[12px]">
                        {fmtMoney(m.unitCost)}
                      </td>
                      <td className="px-5 py-3 text-right mono text-[12px]">
                        {(m.markup * 100 - 100).toFixed(0)}%
                      </td>
                      <td className="px-5 py-3 text-right mono text-[13px] font-semibold">
                        {fmtMoney(m.quantity * m.unitCost * m.markup)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-cream/40">
                    <td colSpan={4} className="px-5 py-3 text-right label">
                      Materials Subtotal
                    </td>
                    <td className="px-5 py-3 text-right mono text-[14px] font-bold">
                      {fmtMoney(materialsTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </Panel>

          {/* Photos */}
          <div className="grid md:grid-cols-2 gap-6">
            <Panel eyebrow="Documentation" title="Before">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-cream border-[1.5px] border-ink border-dashed flex flex-col items-center justify-center"
                  >
                    <span className="font-mono text-[20px] text-slate">⊞</span>
                    <span className="label text-[9px] mt-1">Add photo</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel eyebrow="Documentation" title="After">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-cream border-[1.5px] border-ink border-dashed flex flex-col items-center justify-center"
                  >
                    <span className="font-mono text-[20px] text-slate">⊞</span>
                    <span className="label text-[9px] mt-1">Add photo</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Totals card */}
          <Panel eyebrow="Job Totals" title={fmtMoney(grandTotal)}>
            <div className="space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate">Materials (w/ markup)</span>
                <span className="mono">{fmtMoney(materialsTotal)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate">Labor</span>
                <span className="mono">{fmtMoney(laborTotal)}</span>
              </div>
              <div className="border-t border-ink pt-2.5 flex justify-between items-baseline">
                <span className="label">Estimate</span>
                <span className="display text-[24px]">{fmtMoney(grandTotal)}</span>
              </div>
              {wo.invoiceTotal && (
                <div className="mt-3 pt-3 border-t border-dashed border-ink/30">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-slate">Invoiced</span>
                    <span className="mono font-semibold">
                      {fmtMoney(wo.invoiceTotal)}
                    </span>
                  </div>
                  {wo.invoiceNumber && (
                    <div className="mono text-[10px] text-slate mt-1">
                      {wo.invoiceNumber}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>

          {/* Schedule + crew */}
          <Panel eyebrow="Logistics" title="Schedule">
            <DataRow label="Scheduled">{fmtDate(wo.scheduledFor)}</DataRow>
            <DataRow label="Completed">{fmtDate(wo.completedAt)}</DataRow>
            <DataRow label="Crew Size">{wo.crewSize} people</DataRow>
            <DataRow label="Hours Est.">
              <span className="mono">{wo.laborHoursEstimated} man-hrs</span>
            </DataRow>
            {wo.laborHoursActual !== undefined && (
              <DataRow label="Hours Actual">
                <span className="mono">{wo.laborHoursActual} man-hrs</span>
              </DataRow>
            )}
            <DataRow label="Labor Rate">
              <span className="mono">{fmtMoney(wo.laborRate)}/hr</span>
            </DataRow>
          </Panel>

          {/* Payment */}
          {wo.paymentNotes && (
            <Panel eyebrow="Money" title="Invoice & Payment">
              <p className="text-[13px] leading-relaxed">{wo.paymentNotes}</p>
            </Panel>
          )}

          {/* Quick links */}
          {client && (
            <Panel eyebrow="Reference" title="Client">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="display text-[18px] hover:text-moss block"
              >
                {client.name}
              </Link>
              <div className="text-[13px] text-slate mt-1">
                {client.address}
              </div>
              {client.gateCode && (
                <div className="mt-3 inline-block mono text-[11px] px-2 py-1 bg-sun/30 border border-ink rounded">
                  Gate: {client.gateCode}
                </div>
              )}
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}
