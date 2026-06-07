import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataRow from "@/components/DataRow";
import { Chip } from "@/components/Chip";
import { contracts, clients, routes, crews } from "@/lib/data";
import { fmtMoney, fmtDate } from "@/lib/utils";

export default function ContractDetail({
  params,
}: {
  params: { id: string };
}) {
  const c = contracts.find((x) => x.id === params.id);
  if (!c) return notFound();

  const client = clients.find((cl) => cl.id === c.clientId);
  const route = routes.find((r) => r.id === c.routeId);
  const crew = crews.find((cr) => cr.id === c.crewId);

  const addOnTotal = c.addOns.reduce((s, a) => s + a.monthlyValue, 0);
  const baseMonthly = c.monthlyValue - addOnTotal;

  return (
    <>
      <PageHeader
        eyebrow={`Contract · ${c.id.toUpperCase()}`}
        title={client?.name ?? "Contract"}
        subtitle={`${c.frequency} maintenance · started ${fmtDate(c.startDate)}`}
        backHref="/contracts"
        action={
          <div className="flex gap-2">
            <Chip tone={c.active ? "good" : "bad"}>
              {c.active ? "Active" : "Inactive"}
            </Chip>
            <button className="btn btn-secondary">Edit</button>
          </div>
        }
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel eyebrow="Pricing" title="Money">
            <DataRow label="Recurring Price">
              <span className="mono text-[16px] font-semibold">
                {fmtMoney(c.recurringPrice)}
              </span>{" "}
              <span className="mono text-[11px] text-slate">/visit</span>
            </DataRow>
            <DataRow label="Base Monthly">
              <span className="mono">{fmtMoney(baseMonthly)}</span>
            </DataRow>
            <DataRow label="Add-Ons (monthly avg)">
              <span className="mono">{fmtMoney(addOnTotal)}</span>
            </DataRow>
            <DataRow label="Total Monthly">
              <span className="display text-[24px] text-moss">
                {fmtMoney(c.monthlyValue)}
              </span>
            </DataRow>
            <DataRow label="First-Time Cleanup">
              {c.firstCleanupFee > 0 ? (
                <span className="mono">{fmtMoney(c.firstCleanupFee)} (one time)</span>
              ) : (
                <span className="text-slate text-[12px] italic">Waived / N/A</span>
              )}
            </DataRow>
          </Panel>

          <Panel eyebrow="Stacked Services" title="Add-Ons">
            {c.addOns.length === 0 ? (
              <p className="text-slate text-[13px]">No add-on services on this contract.</p>
            ) : (
              <ul className="divide-y divide-dashed divide-ink/20">
                {c.addOns.map((a) => (
                  <li
                    key={a.id}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="display text-[16px]">{a.name}</div>
                      <div className="mono text-[10px] uppercase text-slate tracking-wider mt-0.5">
                        {a.frequency}
                      </div>
                    </div>
                    <div className="mono text-[14px] font-semibold">
                      {fmtMoney(a.monthlyValue)}
                      <span className="text-slate text-[10px]">/mo avg</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {c.notes && (
            <Panel eyebrow="Notes" title="Internal">
              <p className="text-[14px] leading-relaxed">{c.notes}</p>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel eyebrow="Schedule" title="Cycle">
            <DataRow label="Frequency">
              <Chip tone="good">{c.frequency}</Chip>
            </DataRow>
            <DataRow label="Start Date">{fmtDate(c.startDate)}</DataRow>
            <DataRow label="End Date">
              {c.endDate ? fmtDate(c.endDate) : (
                <span className="text-slate text-[12px] italic">Evergreen</span>
              )}
            </DataRow>
          </Panel>

          <Panel eyebrow="Assignment" title="Crew & Route">
            <DataRow label="Crew">
              {crew ? (
                <Link href={`/crew/${crew.id}`} className="hover:text-moss">
                  {crew.name}
                </Link>
              ) : (
                <span className="text-slate">Unassigned</span>
              )}
            </DataRow>
            <DataRow label="Route">
              {route ? (
                <Link href={`/routes/${route.id}`} className="hover:text-moss">
                  {route.name}
                </Link>
              ) : (
                <span className="text-slate">Unassigned</span>
              )}
            </DataRow>
            {route && <DataRow label="Day">{route.dayOfWeek}</DataRow>}
          </Panel>

          {client && (
            <Panel eyebrow="Property" title={client.name}>
              <p className="text-[13px] mb-2">{client.address}</p>
              <p className="text-[12px] text-slate">{client.city}, TX {client.zip}</p>
              <Link
                href={`/clients/${client.id}`}
                className="btn btn-secondary mt-4"
              >
                View Profile →
              </Link>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}
