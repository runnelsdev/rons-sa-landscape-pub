import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataRow from "@/components/DataRow";
import { Chip } from "@/components/Chip";
import {
  clients,
  contracts,
  workOrders,
} from "@/lib/data";
import { fmtMoney, fmtDate, statusTone } from "@/lib/utils";

export default function ClientDetail({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);
  if (!client) return notFound();

  const clientContracts = contracts.filter((c) => c.clientId === client.id);
  const clientWOs = workOrders.filter((w) => w.clientId === client.id);

  return (
    <>
      <PageHeader
        eyebrow={`Client · ${client.id.toUpperCase()}`}
        title={client.name}
        subtitle={`${client.address} · ${client.city}, TX ${client.zip}`}
        backHref="/dashboard/clients"
        action={
          <div className="flex gap-2">
            <button className="btn btn-secondary">Edit</button>
            <button className="btn">+ Work Order</button>
          </div>
        }
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        {/* LEFT: Profile data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Identity */}
          <Panel eyebrow="Profile" title="Property & Contact">
            <DataRow label="Phone">
              <a href={`tel:${client.phone}`} className="mono hover:text-moss">
                {client.phone}
              </a>
            </DataRow>
            <DataRow label="Email">
              <a href={`mailto:${client.email}`} className="mono hover:text-moss">
                {client.email}
              </a>
            </DataRow>
            <DataRow label="Gate Code">
              <span className="mono px-2 py-0.5 bg-sun/30 border border-ink rounded">
                {client.gateCode || "Open / no code"}
              </span>
            </DataRow>
            <DataRow label="Frequency">
              <Chip tone="good">{client.maintenanceFrequency}</Chip>
            </DataRow>
            <DataRow label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {client.tags.map((t) => (
                  <span key={t} className="chip">
                    #{t}
                  </span>
                ))}
              </div>
            </DataRow>
            <DataRow label="Client Since">{fmtDate(client.createdAt)}</DataRow>
          </Panel>

          {/* Service Notes */}
          <Panel eyebrow="Knowledge Base" title="Service Notes">
            <p className="text-[15px] leading-relaxed">{client.serviceNotes}</p>
          </Panel>

          {/* Property-specific instructions */}
          <Panel eyebrow="Before You Arrive" title="Property Instructions">
            <div className="border-l-[3px] border-clay pl-4 italic text-[14px] leading-relaxed">
              {client.propertyInstructions}
            </div>
          </Panel>

          {/* Crew Notes */}
          <Panel eyebrow="From the Crew" title="Crew Notes">
            <p className="text-[14px] leading-relaxed">{client.crewNotes}</p>
          </Panel>

          {/* Equipment + contamination warnings */}
          <div className="grid md:grid-cols-2 gap-6">
            <Panel eyebrow="Tools" title="Equipment Notes">
              <p className="text-[13px] leading-relaxed text-ink">
                {client.equipmentNotes}
              </p>
            </Panel>
            <Panel eyebrow="⚠ Warning" title="Contamination">
              <p className="text-[13px] leading-relaxed text-rust">
                {client.contaminationNotes}
              </p>
            </Panel>
          </div>

          {/* Photos */}
          <Panel
            eyebrow="Documentation"
            title="Before / After"
            action={<button className="btn btn-secondary">+ Upload</button>}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-cream border-[1.5px] border-ink border-dashed flex flex-col items-center justify-center gap-1"
                >
                  <span className="font-mono text-[20px] text-slate">⊞</span>
                  <span className="label text-[9px]">No photo</span>
                </div>
              ))}
            </div>
            <p className="mono text-[10px] text-slate uppercase tracking-wider mt-3">
              {client.beforeAfterPhotos.length} photos on file
            </p>
          </Panel>
        </div>

        {/* RIGHT: Contracts + work orders */}
        <div className="space-y-6">
          <Panel eyebrow="Recurring" title="Contracts">
            {clientContracts.length === 0 ? (
              <p className="text-slate text-[13px]">No active contract.</p>
            ) : (
              clientContracts.map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/contracts/${c.id}`}
                  className="block p-3 -mx-2 hover:bg-cream/40 rounded transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="display text-[16px]">
                      {fmtMoney(c.monthlyValue)}
                      <span className="mono text-[11px] text-slate">/mo</span>
                    </span>
                    <Chip tone={c.active ? "good" : "neutral"}>
                      {c.active ? "Active" : "Inactive"}
                    </Chip>
                  </div>
                  <div className="mono text-[11px] text-slate">
                    {c.frequency} · {fmtMoney(c.recurringPrice)}/visit
                  </div>
                  {c.addOns.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate">
                      + {c.addOns.length} add-on{c.addOns.length > 1 ? "s" : ""}
                    </div>
                  )}
                </Link>
              ))
            )}
          </Panel>

          <Panel eyebrow="History" title="Work Orders">
            {clientWOs.length === 0 ? (
              <p className="text-slate text-[13px]">No work orders.</p>
            ) : (
              <ul className="space-y-2">
                {clientWOs.map((wo) => (
                  <li key={wo.id}>
                    <Link
                      href={`/dashboard/work-orders/${wo.id}`}
                      className="block p-3 -mx-2 hover:bg-cream/40 rounded transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="mono text-[12px] font-semibold">
                          {wo.number}
                        </span>
                        <Chip tone={statusTone(wo.status)}>{wo.status}</Chip>
                      </div>
                      <div className="text-[13px] mt-1 line-clamp-1">
                        {wo.description}
                      </div>
                      <div className="mono text-[10px] text-slate mt-1">
                        {wo.scheduledFor && fmtDate(wo.scheduledFor)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
