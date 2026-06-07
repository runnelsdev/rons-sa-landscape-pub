import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { crews, equipment, routes, clients, contracts } from "@/lib/data";
import { titleize } from "@/lib/utils";

export default function CrewDetail({ params }: { params: { id: string } }) {
  const c = crews.find((x) => x.id === params.id);
  if (!c) return notFound();

  const truck = equipment.find((e) => e.id === c.truckId);
  const trailer = equipment.find((e) => e.id === c.trailerId);
  const assignedEq = equipment.filter((e) => e.assignedCrewId === c.id);
  const crewRoutes = routes.filter((r) => r.crewId === c.id);

  // Today: collect today's stops across crew routes
  const allStops = crewRoutes.flatMap((r) =>
    r.stops.map((s) => ({ ...s, route: r }))
  );

  return (
    <>
      <PageHeader
        eyebrow={`Crew · ${c.id.toUpperCase()}`}
        title={c.name}
        subtitle={`Lead: ${c.leadName} · ${c.phone}`}
        backHref="/crew"
        action={<button className="btn">Crew Mobile View →</button>}
      />

      <div className="px-8 py-8 grid lg:grid-cols-3 gap-6">
        {/* LEFT: Today's run */}
        <div className="lg:col-span-2 space-y-6">
          <Panel
            eyebrow="Field Tool"
            title="Today's Stops"
            action={<Chip tone="good">{allStops.length} jobs</Chip>}
            dense
          >
            {allStops.length === 0 ? (
              <p className="px-5 py-8 text-center text-slate text-[13px]">
                No stops assigned today.
              </p>
            ) : (
              <ol className="divide-y divide-ink/10">
                {allStops.map((s, idx) => {
                  const cl = clients.find((c) => c.id === s.clientId);
                  if (!cl) return null;
                  return (
                    <li key={s.clientId + idx} className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        <div className="display text-[28px] text-clay leading-none w-10 shrink-0 text-center">
                          {s.order}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              <Link
                                href={`/clients/${cl.id}`}
                                className="display text-[18px] hover:text-moss"
                              >
                                {cl.name}
                              </Link>
                              <div className="text-[12px] text-slate mt-0.5">
                                {cl.address}, {cl.city}
                              </div>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button className="btn btn-secondary !text-[10px] !px-3 !py-1.5">
                                Directions
                              </button>
                              <button className="btn !text-[10px] !px-3 !py-1.5">
                                Start
                              </button>
                            </div>
                          </div>

                          {/* Crew-actionable info */}
                          <div className="mt-3 grid sm:grid-cols-2 gap-3">
                            {cl.gateCode && (
                              <div className="text-[12px]">
                                <div className="label text-[9px]">Gate</div>
                                <div className="mono mt-1">{cl.gateCode}</div>
                              </div>
                            )}
                            <div className="text-[12px]">
                              <div className="label text-[9px]">Frequency</div>
                              <div className="mt-1 capitalize">
                                {cl.maintenanceFrequency}
                              </div>
                            </div>
                          </div>

                          {/* Critical notes */}
                          {cl.crewNotes && (
                            <div className="mt-3 border-l-[3px] border-clay pl-3 py-1 text-[12px] italic text-ink">
                              {cl.crewNotes}
                            </div>
                          )}

                          {cl.contaminationNotes && (
                            <div className="mt-2 border-l-[3px] border-rust pl-3 py-1 text-[11px] text-rust">
                              ⚠ {cl.contaminationNotes}
                            </div>
                          )}

                          {/* Action row */}
                          <div className="mt-4 flex items-center gap-2 flex-wrap">
                            <button className="btn btn-secondary !text-[10px] !px-3 !py-1.5">
                              📷 Before
                            </button>
                            <button className="btn btn-secondary !text-[10px] !px-3 !py-1.5">
                              📷 After
                            </button>
                            <button className="btn btn-clay !text-[10px] !px-3 !py-1.5">
                              ✓ Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </Panel>
        </div>

        {/* RIGHT: Crew identity + iron */}
        <div className="space-y-6">
          <Panel eyebrow="Roster" title="Members">
            <ul className="space-y-2">
              {c.members.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-3 py-2 border-b border-dashed border-ink/15 last:border-b-0"
                >
                  <div className="w-9 h-9 bg-moss text-bone display text-[14px] flex items-center justify-center border-[1.5px] border-ink rounded-full shrink-0">
                    {m.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[14px]">{m}</div>
                    {m === c.leadName && (
                      <div className="mono text-[9px] uppercase tracking-wider text-clay">
                        Lead
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel eyebrow="Assigned Iron" title="Equipment" dense>
            <ul className="divide-y divide-ink/10">
              {assignedEq.map((eq) => (
                <li key={eq.id}>
                  <Link
                    href={`/equipment/${eq.id}`}
                    className="block px-5 py-3 hover:bg-cream/40 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="display text-[14px] truncate">
                          {eq.make} {eq.model}
                        </div>
                        <div className="mono text-[10px] text-slate uppercase tracking-wider mt-0.5">
                          {titleize(eq.type)}
                        </div>
                      </div>
                      <Chip
                        tone={
                          eq.shopStatus === "in-service"
                            ? "good"
                            : eq.shopStatus === "needs-service"
                            ? "warn"
                            : "bad"
                        }
                      >
                        {eq.shopStatus.split("-")[0]}
                      </Chip>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel eyebrow="Default Routes" title="Schedule">
            {crewRoutes.length === 0 ? (
              <p className="text-slate text-[13px]">No routes assigned.</p>
            ) : (
              <ul className="space-y-2">
                {crewRoutes.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/routes/${r.id}`}
                      className="block py-2 border-b border-dashed border-ink/15 last:border-b-0 hover:text-moss"
                    >
                      <div className="flex items-center justify-between">
                        <span className="display text-[14px]">{r.name}</span>
                        <Chip>{r.dayOfWeek}</Chip>
                      </div>
                      <div className="mono text-[10px] text-slate mt-1">
                        {r.stops.length} stop{r.stops.length !== 1 && "s"} · ZIP{" "}
                        {r.zipCodes.join(", ")}
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
