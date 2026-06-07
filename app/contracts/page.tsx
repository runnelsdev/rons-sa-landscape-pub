import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { contracts, clients, routes, crews } from "@/lib/data";
import { fmtMoney0, fmtMoney } from "@/lib/utils";

export default function ContractsPage() {
  const totalMRR = contracts
    .filter((c) => c.active)
    .reduce((s, c) => s + c.monthlyValue, 0);
  const annualValue = totalMRR * 12;

  return (
    <>
      <PageHeader
        eyebrow="Module 03 · Maintenance Contracts"
        title="Recurring Revenue"
        subtitle="The lifeblood of the business — contracts paying every week, every other week, or every month."
        action={<button className="btn">+ New Contract</button>}
      />

      <div className="px-8 py-8 space-y-6">
        {/* Top stats */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="panel-stamp p-5 bg-moss text-bone">
            <div className="label text-bone/70">Monthly Recurring</div>
            <div className="display text-[40px] mt-2">{fmtMoney0(totalMRR)}</div>
            <div className="mono text-[11px] text-bone/70 mt-2">
              annualized: {fmtMoney0(annualValue)}
            </div>
          </div>
          <div className="panel-stamp p-5">
            <div className="label">Active Contracts</div>
            <div className="display text-[40px] mt-2">
              {contracts.filter((c) => c.active).length}
            </div>
            <div className="mono text-[11px] text-slate mt-2">
              {contracts.filter((c) => !c.active).length} inactive on file
            </div>
          </div>
          <div className="panel-stamp p-5">
            <div className="label">Avg Contract Value</div>
            <div className="display text-[40px] mt-2">
              {fmtMoney0(totalMRR / contracts.filter((c) => c.active).length)}
            </div>
            <div className="mono text-[11px] text-slate mt-2">per month</div>
          </div>
        </div>

        {/* Contract table */}
        <Panel eyebrow="All Contracts" title="Roll Call" dense>
          <table className="w-full">
            <thead>
              <tr className="bg-cream/30 border-b-[1.5px] border-ink">
                <th className="label text-left px-5 py-3">Client</th>
                <th className="label text-left px-5 py-3">Frequency</th>
                <th className="label text-left px-5 py-3">Crew / Route</th>
                <th className="label text-right px-5 py-3">Per Visit</th>
                <th className="label text-right px-5 py-3">Monthly</th>
                <th className="label text-left px-5 py-3 pl-6">Add-Ons</th>
                <th className="label text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => {
                const client = clients.find((cl) => cl.id === c.clientId);
                const route = routes.find((r) => r.id === c.routeId);
                const crew = crews.find((cr) => cr.id === c.crewId);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-ink/10 hover:bg-cream/20 transition"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/contracts/${c.id}`}
                        className="display text-[15px] hover:text-moss"
                      >
                        {client?.name}
                      </Link>
                      <div className="mono text-[10px] text-slate mt-0.5">
                        {client?.zip}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Chip>{c.frequency}</Chip>
                    </td>
                    <td className="px-5 py-4 text-[12px]">
                      {crew?.leadName ?? "—"}
                      <div className="mono text-[10px] text-slate">
                        {route?.name ?? "Unassigned"}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right mono text-[13px]">
                      {fmtMoney(c.recurringPrice)}
                    </td>
                    <td className="px-5 py-4 text-right mono text-[14px] font-bold">
                      {fmtMoney0(c.monthlyValue)}
                    </td>
                    <td className="px-5 py-4 pl-6">
                      {c.addOns.length === 0 ? (
                        <span className="text-slate text-[11px]">—</span>
                      ) : (
                        <div className="space-y-0.5">
                          {c.addOns.slice(0, 2).map((a) => (
                            <div
                              key={a.id}
                              className="text-[11px] text-slate"
                            >
                              + {a.name}
                            </div>
                          ))}
                          {c.addOns.length > 2 && (
                            <div className="text-[10px] text-slate italic">
                              +{c.addOns.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Chip tone={c.active ? "good" : "neutral"}>
                        {c.active ? "Active" : "Inactive"}
                      </Chip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </div>
    </>
  );
}
