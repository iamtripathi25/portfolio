
function ProjectCard({ type, date, projectName, link, index }) {

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="group grid h-full min-h-[280px] grid-rows-[auto_auto_1fr_auto] border border-neutral-800 bg-neutral-900/70 p-6 font-Manrope text-neutral-100 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-500 hover:bg-neutral-900 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:min-h-[320px] md:p-8"
      href={link}
    >
      <div className="flex items-start justify-between gap-6 text-sm font-semibold text-neutral-400 md:text-base">
        <p>{type || 'Type'}</p>
        <p className="shrink-0">{date || ''}</p>
      </div>

      <p className="mt-8 text-sm font-semibold text-neutral-600">{`0${index + 1}`}</p>

      <div className="pt-7">
        <h3 className="max-w-2xl text-4xl font-semibold leading-none tracking-tight text-neutral-100 transition-colors duration-500 group-hover:text-[#F2613F] sm:text-5xl lg:text-6xl">
          {projectName || 'Project Name'}
        </h3>
      </div>

      <div className="inline-flex items-center gap-2 self-end text-sm font-bold text-neutral-200 transition-colors duration-300 group-hover:text-[#F2613F]">
        View repository
        <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">-&gt;</span>
      </div>
    </a>
  )
}

export default ProjectCard
