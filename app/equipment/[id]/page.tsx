import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataRow from "@/components/DataRow";
import { Chip } from "@/components/Chip";
import { equipment, crews } from "@/lib/data";
import { fmtMoney, fmtDate, statusTone, titleize } from "@/lib/utils";

export default function EquipmentDetail({
  params,
}: {
  params: { id: string };
}) {
  const e = equipment.find((x) => x.id === params.id);
  if (!e) return notFound();

  const crew = crews.find((c) => c.id === e.assignedCrewId);
  const totalMaintCost = e.maintenanceLog.reduce((s, l) => s + l.cost, 0);

  return (
    <>
      <PageHeader
        eyebrow={`${titleize(e.type)} · ${e.serialNumber}`}
        title={`${e.make} ${e.model}`}
        subtitle={
          e.year ? `${e.year} model · purchased ${fmtDate(e.purchaseDate)}` : undefined
        }
        backHref="/equipment"
        action={
          <div className="flex gap-2">
            <Chip tone={statusTone(e.shopStatus)}>{e.shopStatus}</Chip>
            <button className="btn btn-secondary">Edit</button>
            <button className="btn">+ Log Service</button>
          </div>
        }
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel eyebrow="Identity" title="Specs">
            <DataRow label="Type">{titleize(e.type)}</DataRow>
            <DataRow label="Make">{e.make}</DataRow>
            <DataRow label="Model">{e.model}</DataRow>
            <DataRow label="Serial / VIN">
              <span className="mono px-2 py-0.5 bg-cream border border-ink/30 rounded">
                {e.serialNumber}
              </span>
            </DataRow>
            <DataRow label="Year">{e.year ?? "—"}</DataRow>
            <DataRow label="Purchased">
              {e.purchaseDate ? `${fmtDate(e.purchaseDate)}` : "—"}
              {e.purchasePrice && (
                <span className="mono text-[12px] text-slate ml-2">
                  for {fmtMoney(e.purchasePrice)}
                </span>
              )}
            </DataRow>
            <DataRow label="Hours / Miles">
              <span className="mono">
                {e.hoursOrMileage ? e.hoursOrMileage.toLocaleString() : "—"}
              </span>
            </DataRow>
          </Panel>

          {/* Maintenance log */}
          <Panel
            eyebrow="History"
            title="Maintenance Log"
            action={<button className="btn btn-secondary">+ Entry</button>}
            dense
          >
            {e.maintenanceLog.length === 0 ? (
              <div className="px-5 py-8 text-center text-slate text-[13px]">
                No maintenance records yet.
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-cream/30 border-b-[1.5px] border-ink">
                    <th className="label text-left px-5 py-3">Date</th>
                    <th className="label text-left px-5 py-3">Description</th>
                    <th className="label text-left px-5 py-3">Shop</th>
                    <th className="label text-right px-5 py-3">Cost</th>
                    <th className="label text-left px-5 py-3">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {e.maintenanceLog.map((l) => (
                    <tr key={l.id} className="border-b border-ink/10">
                      <td className="px-5 py-3 mono text-[12px]">
                        {fmtDate(l.date)}
                      </td>
                      <td className="px-5 py-3 text-[13px]">{l.description}</td>
                      <td className="px-5 py-3 text-[12px] text-slate">
                        {l.shop ?? "—"}
                      </td>
                      <td className="px-5 py-3 text-right mono text-[13px] font-semibold">
                        {fmtMoney(l.cost)}
                      </td>
                      <td className="px-5 py-3">
                        {l.receiptUrl ? (
                          <a className="mono text-[11px] text-moss hover:underline">
                            View
                          </a>
                        ) : (
                          <span className="text-slate text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-cream/40">
                    <td colSpan={3} className="px-5 py-3 text-right label">
                      Lifetime Spend
                    </td>
                    <td className="px-5 py-3 text-right mono font-bold">
                      {fmtMoney(totalMaintCost)}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            )}
          </Panel>

          {e.notes && (
            <Panel eyebrow="Notes" title="Field Knowledge">
              <p className="text-[14px] leading-relaxed italic">{e.notes}</p>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel eyebrow="Status" title={titleize(e.shopStatus)}>
            <DataRow label="Shop Status">
              <Chip tone={statusTone(e.shopStatus)}>{e.shopStatus}</Chip>
            </DataRow>
            <DataRow label="Next Service">
              {e.nextServiceDue ? (
                <span className="mono">{fmtDate(e.nextServiceDue)}</span>
              ) : (
                <span className="text-slate text-[12px]">Not scheduled</span>
              )}
            </DataRow>
            {e.serviceIntervalHours && (
              <DataRow label="Service Interval">
                <span className="mono">every {e.serviceIntervalHours} hrs</span>
              </DataRow>
            )}
          </Panel>

          <Panel eyebrow="Assignment" title="Crew">
            {crew ? (
              <Link href={`/crew/${crew.id}`} className="block">
                <div className="display text-[18px] hover:text-moss">{crew.name}</div>
                <div className="mono text-[11px] text-slate mt-1">
                  Lead: {crew.leadName}
                </div>
                <div className="mono text-[11px] text-slate mt-0.5">
                  {crew.phone}
                </div>
              </Link>
            ) : (
              <p className="text-slate text-[13px]">Unassigned — back at the yard.</p>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
