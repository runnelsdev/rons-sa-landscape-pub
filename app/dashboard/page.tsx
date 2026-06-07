import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import KpiTile from "@/components/KpiTile";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import {
  clients,
  contracts,
  workOrders,
  routes,
  equipment,
  crews,
} from "@/lib/data";
import { fmtMoney0, fmtDate, statusTone } from "@/lib/utils";

export default function DashboardPage() {
  // Compute KPIs
  const monthlyRecurring = contracts
    .filter((c) => c.active)
    .reduce((sum, c) => sum + c.monthlyValue, 0);

  const activeWO = workOrders.filter(
    (w) => w.status === "scheduled" || w.status === "in-progress"
  ).length;

  const equipNeedingService = equipment.filter(
    (e) => e.shopStatus === "needs-service" || e.shopStatus === "in-shop"
  ).length;

  const routesThisWeek = routes.length;

  const upcomingWO = workOrders
    .filter((w) => w.status === "scheduled" || w.status === "in-progress")
    .sort((a, b) =>
      (a.scheduledFor ?? "").localeCompare(b.scheduledFor ?? "")
    );

  const eqAlerts = equipment.filter(
    (e) => e.shopStatus === "needs-service" || e.shopStatus === "in-shop"
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        eyebrow={`Yard Office · ${today}`}
        title="Good morning, Ron."
        subtitle="Everything that matters today, in one place. Crews are loaded, equipment is mostly cleared, and four work orders need eyes."
      />

      <div className="px-8 py-8 space-y-8">
        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <KpiTile
            label="Monthly Recurring"
            value={fmtMoney0(monthlyRecurring)}
            delta={`${contracts.filter((c) => c.active).length} active contracts`}
            tone="good"
          />
          <KpiTile
            label="Open Work Orders"
            value={String(activeWO)}
            delta={`${upcomingWO.length} scheduled this week`}
            tone="warn"
          />
          <KpiTile
            label="Active Routes"
            value={String(routesThisWeek)}
            delta={`${crews.length} crews assigned`}
          />
          <KpiTile
            label="Equipment Alerts"
            value={String(equipNeedingService)}
            delta="needs service / in shop"
            tone={equipNeedingService > 0 ? "bad" : "good"}
          />
        </div>

        {/* Two-column lower section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Panel
              eyebrow="On Deck"
              title="Upcoming Work Orders"
              action={
                <Link href="/dashboard/work-orders" className="btn btn-secondary">
                  View All
                </Link>
              }
              dense
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b-[1.5px] border-ink bg-cream/20">
                    <th className="label text-left px-5 py-3">WO #</th>
                    <th className="label text-left px-5 py-3">Client</th>
                    <th className="label text-left px-5 py-3">Job Type</th>
                    <th className="label text-left px-5 py-3">Scheduled</th>
                    <th className="label text-left px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingWO.map((wo) => {
                    const client = clients.find((c) => c.id === wo.clientId);
                    return (
                      <tr
                        key={wo.id}
                        className="border-b border-ink/10 hover:bg-cream/30 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <Link
                            href={`/dashboard/work-orders/${wo.id}`}
                            className="mono text-[13px] font-semibold hover:text-moss"
                          >
                            {wo.number}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-[14px]">{client?.name}</td>
                        <td className="px-5 py-4 text-[13px] text-slate capitalize">
                          {wo.jobType.replace("-", " ")}
                        </td>
                        <td className="px-5 py-4 mono text-[12px]">
                          {fmtDate(wo.scheduledFor)}
                        </td>
                        <td className="px-5 py-4">
                          <Chip tone={statusTone(wo.status)}>{wo.status}</Chip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Panel>
          </div>

          {/* Equipment Alerts */}
          <div className="space-y-6">
            <Panel eyebrow="Shop Status" title="Equipment Alerts">
              {eqAlerts.length === 0 ? (
                <div className="text-slate text-[13px]">All equipment in service.</div>
              ) : (
                <ul className="space-y-3">
                  {eqAlerts.map((e) => (
                    <li
                      key={e.id}
                      className="border-l-[3px] border-clay pl-3 py-1"
                    >
                      <Link
                        href={`/dashboard/equipment/${e.id}`}
                        className="block hover:text-moss"
                      >
                        <div className="display text-[15px] leading-tight">
                          {e.make} {e.model}
                        </div>
                        <div className="mono text-[10px] text-slate uppercase tracking-wider mt-1">
                          {e.shopStatus.replace("-", " ")}
                        </div>
                        {e.notes && (
                          <div className="text-[12px] text-slate mt-1.5 italic">
                            &ldquo;{e.notes}&rdquo;
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel eyebrow="Crews" title="Today">
              <ul className="space-y-3">
                {crews.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <Link
                        href={`/dashboard/crew/${c.id}`}
                        className="display text-[15px] hover:text-moss"
                      >
                        {c.name}
                      </Link>
                      <div className="mono text-[10px] text-slate mt-0.5">
                        {c.members.length} on crew
                      </div>
                    </div>
                    <Chip>{c.defaultRouteIds.length || "—"} routes</Chip>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        {/* Footer reminder strip */}
        <div className="panel p-5 bg-moss/5 border-moss border-l-[6px]">
          <div className="label text-moss">Field Note</div>
          <p className="display text-[20px] leading-snug mt-2">
            &ldquo;Pay attention to the small things and the big things take care of themselves.&rdquo;
          </p>
          <div className="mono text-[11px] text-slate mt-2">— Ron, painted on the shop wall</div>
        </div>
      </div>
    </>
  );
}
