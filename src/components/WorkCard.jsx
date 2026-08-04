import { motion } from 'framer-motion'
import { WorkData } from '../data/WorkData'

function WorkCard() {
  return (
    <section id="work" className="font-Manrope px-6 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-[#F2613F]">Experience</p>
            <h2 className="text-5xl font-semibold leading-none tracking-tight text-neutral-100 sm:text-6xl lg:text-8xl">
              Work.
            </h2>
          </div>
          <p className="max-w-2xl text-base font-medium leading-8 text-neutral-300 md:text-lg lg:ml-auto">
            Recent roles and collaborations across backend systems, serverless infrastructure, data processing, and product-focused interfaces.
          </p>
        </motion.div>

        <div className="border-t border-neutral-800">
          {WorkData.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.position}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 border-b border-neutral-800 py-8 md:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-10 md:py-10"
            >
              <p className="text-sm font-semibold text-[#F2613F]">{`0${index + 1}`}</p>

              <div>
                <h3 className="text-2xl font-semibold leading-tight text-neutral-100 md:text-3xl">
                  {item.company}
                </h3>
                <p className="mt-3 text-base font-semibold text-[#F2613F]">
                  {item.position}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase text-neutral-500">
                  {item.date}
                </p>
              </div>

              <p className="max-w-3xl text-lg font-semibold leading-8 text-neutral-200 md:text-2xl md:leading-10">
                {item.smallDesc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkCard
