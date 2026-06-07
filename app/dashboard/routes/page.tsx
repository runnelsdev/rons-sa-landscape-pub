import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { routes, crews, equipment, clients, contracts } from "@/lib/data";
import { fmtMoney } from "@/lib/utils";

export default function RoutesPage() {
  const totalWeekly = routes.reduce((s, r) => s + r.weeklyRevenue, 0);
  const totalDriveMin = routes.reduce((s, r) => s + r.estimatedDriveMinutes, 0);
  const totalJobMin = routes.reduce((s, r) => s + r.estimatedJobMinutes, 0);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <PageHeader
        eyebrow="Module 05 · Routing"
        title="Routes & Schedule"
        subtitle="Crews, trucks, ZIPs, and drive time — optimized for windshield hours and dollars per day."
        action={<button className="btn">+ New Route</button>}
      />

      <div className="px-8 py-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="panel-stamp p-4">
            <div className="label">Weekly Route Revenue</div>
            <div className="display text-[28px] mt-2">{fmtMoney(totalWeekly)}</div>
          </div>
          <div className="panel-stamp p-4">
            <div className="label">Active Routes</div>
            <div className="display text-[28px] mt-2">{routes.length}</div>
          </div>
          <div className="panel-stamp p-4">
            <div className="label">Total Drive Time</div>
            <div className="display text-[28px] mt-2">
              {Math.round(totalDriveMin / 60)}h
            </div>
            <div className="mono text-[10px] text-slate mt-1">/ week</div>
          </div>
          <div className="panel-stamp p-4">
            <div className="label">Total Job Time</div>
            <div className="display text-[28px] mt-2">
              {Math.round(totalJobMin / 60)}h
            </div>
            <div className="mono text-[10px] text-slate mt-1">/ week</div>
          </div>
        </div>

        {/* Weekly calendar grid */}
        <Panel eyebrow="Schedule" title="Week at a Glance" dense>
          <div className="grid grid-cols-6 border-b-[1.5px] border-ink">
            {days.map((d) => (
              <div
                key={d}
                className="px-4 py-3 border-r border-ink/20 last:border-r-0 bg-cream/30"
              >
                <div className="display text-[18px]">{d}</div>
                <div className="mono text-[10px] text-slate uppercase tracking-wider">
                  {routes.filter((r) => r.dayOfWeek === d).length} route(s)
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 min-h-[260px]">
            {days.map((d) => (
              <div
                key={d}
                className="px-3 py-3 border-r border-ink/20 last:border-r-0 space-y-2"
              >
                {routes
                  .filter((r) => r.dayOfWeek === d)
                  .map((r) => {
                    const crew = crews.find((c) => c.id === r.crewId);
                    return (
                      <Link
                        key={r.id}
                        href={`/dashboard/routes/${r.id}`}
                        className="block panel p-2.5 hover:shadow-stamp-sm transition"
                      >
                        <div className="display text-[13px] leading-tight">
                          {r.name}
                        </div>
                        <div className="mono text-[10px] text-slate mt-1">
                          {crew?.leadName} · {r.stops.length} stop
                          {r.stops.length !== 1 && "s"}
                        </div>
                        <div className="mono text-[11px] font-semibold text-moss mt-1">
                          {fmtMoney(r.weeklyRevenue)}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ))}
          </div>
        </Panel>

        {/* Route detail cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {routes.map((r) => {
            const crew = crews.find((c) => c.id === r.crewId);
            const truck = equipment.find((e) => e.id === r.truckId);
            const trailer = equipment.find((e) => e.id === r.trailerId);
            return (
              <Link
                key={r.id}
                href={`/dashboard/routes/${r.id}`}
                className="panel-stamp p-5 block"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="label">{r.dayOfWeek} · {r.zipCodes.join(", ")}</div>
                    <h3 className="display text-[22px] mt-1">{r.name}</h3>
                  </div>
                  <Chip tone="good">
                    {fmtMoney(r.weeklyRevenue)}/wk
                  </Chip>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4 text-[12px]">
                  <div>
                    <div className="label text-[9px]">Crew</div>
                    <div className="mt-1">{crew?.leadName ?? "—"}</div>
                  </div>
                  <div>
                    <div className="label text-[9px]">Truck</div>
                    <div className="mt-1 mono">
                      {truck ? `${truck.make} ${truck.model.split(" ")[0]}` : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="label text-[9px]">Trailer</div>
                    <div className="mt-1 mono">
                      {trailer ? trailer.make : "—"}
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-ink/20 mt-4 pt-3">
                  <div className="label text-[9px] mb-2">Stops</div>
                  <ul className="space-y-1">
                    {r.stops.map((s) => {
                      const cl = clients.find((c) => c.id === s.clientId);
                      return (
                        <li
                          key={s.clientId}
                          className="flex items-center justify-between text-[12px]"
                        >
                          <span>
                            <span className="mono text-slate mr-2">
                              {String(s.order).padStart(2, "0")}
                            </span>
                            {cl?.name}
                          </span>
                          <span className="mono text-[10px] text-slate">
                            ~{s.estimatedMinutes}m
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
