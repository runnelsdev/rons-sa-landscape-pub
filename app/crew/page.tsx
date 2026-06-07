import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { crews, equipment, routes } from "@/lib/data";

export default function CrewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Module 07 · Crew Accountability"
        title="Crews"
        subtitle="Crew-facing tools — assigned jobs, equipment, directions, photo upload, completion tracking. ADP handles payroll, no time clock here."
        action={<button className="btn">+ New Crew</button>}
      />

      <div className="px-8 py-8 space-y-5">
        {crews.map((c) => {
          const truck = equipment.find((e) => e.id === c.truckId);
          const trailer = equipment.find((e) => e.id === c.trailerId);
          const assignedEq = equipment.filter((e) => e.assignedCrewId === c.id);
          const crewRoutes = routes.filter((r) => r.crewId === c.id);

          return (
            <Link
              key={c.id}
              href={`/crew/${c.id}`}
              className="panel-stamp p-6 block"
            >
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Identity */}
                <div className="lg:col-span-1">
                  <div className="label">{c.id.toUpperCase()}</div>
                  <h2 className="display text-[28px] leading-tight mt-1">
                    {c.name}
                  </h2>
                  <div className="mono text-[12px] text-slate mt-3">
                    Lead: <span className="text-ink">{c.leadName}</span>
                  </div>
                  <div className="mono text-[12px] text-slate mt-0.5">
                    {c.phone}
                  </div>
                </div>

                {/* Members */}
                <div>
                  <div className="label mb-2">Crew Members</div>
                  <ul className="space-y-1">
                    {c.members.map((m) => (
                      <li key={m} className="text-[13px] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Equipment */}
                <div>
                  <div className="label mb-2">Iron</div>
                  <div className="text-[13px] mono">
                    {truck && (
                      <div>{truck.year} {truck.make} {truck.model.split(" ")[0]}</div>
                    )}
                    {trailer && <div>{trailer.make} trailer</div>}
                  </div>
                  <div className="mt-2 mono text-[10px] text-slate uppercase tracking-wider">
                    + {assignedEq.length - (truck ? 1 : 0) - (trailer ? 1 : 0)} hand tools
                  </div>
                </div>

                {/* Routes */}
                <div>
                  <div className="label mb-2">Default Routes</div>
                  {crewRoutes.length === 0 ? (
                    <span className="text-slate text-[12px] italic">
                      No routes assigned
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {crewRoutes.map((r) => (
                        <Chip key={r.id} tone="good">
                          {r.dayOfWeek}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
