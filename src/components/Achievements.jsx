import { motion } from 'framer-motion'

const achievementGroups = [
  {
    label: 'Certifications',
    items: [
      {
        title: 'AWS Certified Cloud Practitioner',
        detail: 'Validated foundational AWS cloud knowledge across core services, security, billing, and cloud concepts.',
        href: 'https://www.credly.com/badges/ea42500c-0435-4992-97a5-11cf51f28def/public_url',
        action: 'View credential',
      },
    ],
  },
  {
    label: 'Papers',
    items: [
      {
        title: 'Data Leakage Prevention Web Application',
        detail: 'Published case study in IRJET.',
        href: 'https://irjet.net/archives/V11/i11/IRJET-V11I1175.pdf',
        action: 'Read paper',
      },
    ],
  },
]

function Achievements() {
  return (
    <section id="achievements" className="font-Manrope pt-28 md:pt-36">
      <div className="border-y border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 px-6 py-12 md:px-10 lg:grid-cols-[0.45fr_1fr] lg:py-16"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F2613F]">Verified</p>
            <h2 className="text-4xl font-semibold leading-none tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
              Proof of Work.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-400 md:text-base md:leading-7">
              Certifications, papers, and public artifacts behind the portfolio.
            </p>
          </div>

          <div className="space-y-10 border-l border-neutral-800 pl-6 lg:pl-10">
            {achievementGroups.map((group, groupIndex) => (
              <div key={group.label} className={groupIndex > 0 ? 'border-t border-neutral-800 pt-10' : ''}>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#F2613F]">
                  {group.label}
                </h3>

                {group.items.map((item, itemIndex) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: (groupIndex + itemIndex) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  >
                    <div>
                      <h4 className="text-2xl font-semibold leading-tight text-neutral-100 transition-colors duration-300 group-hover:text-[#F2613F] md:text-3xl">
                        {item.title}
                      </h4>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
                        {item.detail}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-neutral-200 transition-colors duration-300 group-hover:text-[#F2613F]">
                      {item.action}
                      <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">-&gt;</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
