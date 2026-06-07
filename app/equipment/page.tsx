import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { equipment, crews } from "@/lib/data";
import { fmtDate, statusTone, titleize } from "@/lib/utils";

const TYPE_GROUPS: { label: string; types: string[] }[] = [
  { label: "Vehicles & Trailers", types: ["vehicle", "trailer"] },
  { label: "Mowers", types: ["mower"] },
  { label: "Hand Power Tools", types: ["trimmer", "edger", "blower", "combo-unit", "hand-tool"] },
];

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 06 · Equipment Tracking"
        title="Iron"
        subtitle="Every truck, trailer, mower, and string trimmer — what crew it's assigned to, when it last saw service, what it cost."
        action={<button className="btn">+ Add Equipment</button>}
      />

      <div className="px-8 py-8 space-y-8">
        {/* Status summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(["in-service", "needs-service", "in-shop", "retired"] as const).map(
            (status) => {
              const count = equipment.filter((e) => e.shopStatus === status).length;
              return (
                <div key={status} className="panel-stamp p-4">
                  <Chip tone={statusTone(status)}>{status}</Chip>
                  <div className="display text-[36px] mt-3">{count}</div>
                  <div className="mono text-[10px] text-slate uppercase tracking-wider mt-1">
                    {count === 1 ? "unit" : "units"}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Grouped equipment */}
        {TYPE_GROUPS.map((group) => {
          const items = equipment.filter((e) => group.types.includes(e.type));
          if (items.length === 0) return null;
          return (
            <Panel
              key={group.label}
              eyebrow="Category"
              title={group.label}
              dense
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-cream/30 border-b-[1.5px] border-ink">
                    <th className="label text-left px-5 py-3">Type</th>
                    <th className="label text-left px-5 py-3">Make / Model</th>
                    <th className="label text-left px-5 py-3">Serial #</th>
                    <th className="label text-left px-5 py-3">Crew</th>
                    <th className="label text-left px-5 py-3">Hours</th>
                    <th className="label text-left px-5 py-3">Next Service</th>
                    <th className="label text-left px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((e) => {
                    const crew = crews.find((c) => c.id === e.assignedCrewId);
                    return (
                      <tr
                        key={e.id}
                        className="border-b border-ink/10 hover:bg-cream/20 transition"
                      >
                        <td className="px-5 py-3 text-[12px] text-slate">
                          {titleize(e.type)}
                        </td>
                        <td className="px-5 py-3">
                          <Link
                            href={`/equipment/${e.id}`}
                            className="display text-[14px] hover:text-moss"
                          >
                            {e.year && (
                              <span className="text-slate font-normal">{e.year} </span>
                            )}
                            {e.make} {e.model}
                          </Link>
                        </td>
                        <td className="px-5 py-3 mono text-[10px] text-slate">
                          {e.serialNumber}
                        </td>
                        <td className="px-5 py-3 text-[12px]">
                          {crew?.leadName ?? (
                            <span className="text-slate italic">unassigned</span>
                          )}
                        </td>
                        <td className="px-5 py-3 mono text-[12px]">
                          {e.hoursOrMileage
                            ? e.hoursOrMileage.toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-5 py-3 mono text-[11px] text-slate">
                          {fmtDate(e.nextServiceDue)}
                        </td>
                        <td className="px-5 py-3">
                          <Chip tone={statusTone(e.shopStatus)}>
                            {e.shopStatus}
                          </Chip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
