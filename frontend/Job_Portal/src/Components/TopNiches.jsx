import React from 'react'

const TopNiches = () => {
    const services = [
        {
          id: 1,
          service: "Software Development",
          description:
            "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
        },
        {
          id: 2,
          service: "Web Development",
          description:
            "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
        },
        {
          id: 3,
          service: "Data Science",
          description:
            "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
        },
        {
          id: 4,
          service: "Cloud Computing",
          description:
            "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
        },
        {
          id: 5,
          service: "DevOps",
          description:
            "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
        },
        {
          id: 6,
          service: "Mobile App Development",
          description:
            "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
        },
      ];
  return (
    <section className='niches container'>
      <h1>TOP NICHES</h1>
        <div className='grid'>
            {
                services.map(({service,description,id})=>(
                    <div className='card' key={id}>
                        <h3>{service}</h3>
                        <p>{description}</p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default TopNiches
