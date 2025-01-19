import React from 'react';
import Background from './Background';
import Footer from './Footer';

const experiences = [
  {
    title: 'Software Development Engineer Intern',
    company: 'Irage Broking Services LLP',
    location: 'Mumbai, India',
    duration: 'December 2024 - June 2025',
    description:
      'Developed backend systems for a brokerage platform using Go, optimizing trading operations and ensuring system scalability. Gained hands-on experience in building scalable solutions in the financial domain.'
  },
  {
    title: 'Intern, Data Visualization',
    company: 'Quest Global Engineering Services Private Limited',
    location: 'Bangalore, India',
    duration: 'June 2024 - July 2024',
    description:
      'Designed interactive dashboards to visualize complex data relationships, enhancing analytical capabilities for engineering teams. Collaborated with team members to resolve technical issues and enhance problem-solving skills.'
  }
];

const Experience = () => {
  return (
    <Background>
      <div className="min-h-screen w-full flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl sm:text-5xl text-white font-extrabold mb-12 mt-20">Experience</h2>
        {/* Add margin-top (mt-20) to clear the navbar */}
        <div className="w-full max-w-4xl space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white">
                {exp.company}, {exp.location}
              </h3>
              <p className="text-sm text-gray-400">{exp.duration}</p>
              <h4 className="text-lg font-semibold text-blue-400 mt-2">{exp.title}</h4>
              <p className="text-gray-200 mt-4">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default Experience;
