import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { clients, contracts } from "@/lib/data";
import { fmtMoney0 } from "@/lib/utils";

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 01 · Client Profiles"
        title="Clients"
        subtitle="Every property, every gate code, every nuance the crew needs to know before they roll up."
        action={<button className="btn">+ New Client</button>}
      />

      <div className="px-8 py-8">
        {/* Search/filter strip */}
        <div className="panel p-4 mb-6 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search by name, address, ZIP, or tag…"
            className="field-input flex-1 min-w-[280px]"
          />
          <select className="field-input max-w-[180px]">
            <option>All frequencies</option>
            <option>Weekly</option>
            <option>Biweekly</option>
            <option>Monthly</option>
            <option>As needed</option>
          </select>
          <select className="field-input max-w-[180px]">
            <option>All ZIPs</option>
            <option>78258 — Stone Oak</option>
            <option>78230 — Northwest</option>
            <option>78212 — Monte Vista</option>
            <option>78006 — Boerne</option>
          </select>
        </div>

        {/* Client cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {clients.map((client) => {
            const contract = contracts.find((c) => c.clientId === client.id);
            return (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="panel-stamp p-5 block"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="label">{client.zip} · {client.city}</div>
                    <h3 className="display text-[20px] leading-tight mt-1">
                      {client.name}
                    </h3>
                  </div>
                  <Chip tone="good">{client.maintenanceFrequency}</Chip>
                </div>

                <div className="text-[13px] text-slate leading-snug mb-3">
                  {client.address}
                </div>

                <div className="border-t border-dashed border-ink/20 pt-3 mt-3">
                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div>
                      <div className="label text-[9px]">Contract</div>
                      <div className="mono mt-1">
                        {contract ? fmtMoney0(contract.monthlyValue) + "/mo" : "—"}
                      </div>
                    </div>
                    <div>
                      <div className="label text-[9px]">Gate</div>
                      <div className="mono mt-1">{client.gateCode || "Open"}</div>
                    </div>
                  </div>
                </div>

                {client.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {client.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] mono uppercase tracking-wider text-slate"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
