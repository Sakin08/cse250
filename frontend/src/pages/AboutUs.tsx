import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Md. Sohanoor Rahaman Sakin',
    role: 'Frontend Developer',
    reg: '2021331008',
  },
  {
    name: 'S.M. Ashikur Rahaman',
    role: 'Backend Developer',
    reg: '2021331007',
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-10"> {/* <-- fixed here */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        We are a team of passionate Computer Science students building a smart tourism platform that connects travelers with unforgettable experiences.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
            <p className="text-sm text-gray-400 mt-1">Reg No: {member.reg}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-600">Email: mdsrsakin2001@gmail.com</p>
        <p className="text-gray-600">University: Shahjalal University of Science and Technology</p>
      </div>
    </div>
  );
};

export default AboutUs;
