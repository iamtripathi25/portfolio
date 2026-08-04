import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { ProjectData } from '../data/ProjectData'

function ProjectComponent() { 
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-4 px-6 md:grid-cols-2 md:px-10'>
      {ProjectData.map((value, index) => (
        <motion.div
          key={value.projectName}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className='h-full'
        >
          <ProjectCard
            type={value.type}
            projectName={value.projectName}
            date={value.date}
            link={value.githubLink}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ProjectComponent
