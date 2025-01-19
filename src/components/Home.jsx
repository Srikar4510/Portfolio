import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Background from './Background';
import Profile from "../assets/Profile.jpg"; // Replace with your image path

const Home = () => {
  const name = 'Srikar';
  const ref = useRef(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current < name.length) {
        ref.current++;
        setText((prev) => prev + name[ref.current - 1]);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Background>
      <div className="w-screen min-h-screen flex items-center justify-center text-white p-4" style={{ marginTop: '4rem' }}>
        <div className="flex flex-col lg:flex-row items-center gap-10 p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl">
          {/* Text Section */}
          <div className="text-center lg:text-left max-w-lg">
            <h1 className="text-5xl sm:text-6xl font-extrabold mt-2">
              Hi, I'm <span className="text-blue-400 font-extrabold">{text}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed">
              I'm an undergraduate student in Computer Science and Engineering at the Indian Institute of Information Technology, Sricity. 🎓<br /><br />
              My expertise lies in software development, including full-stack development and testing.<br /><br />
              I'm passionate about creating efficient, scalable solutions and exploring innovative ideas in the tech domain.
            </p>
          </div>
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={Profile}
              alt="Srikar"
              className="w-[300px] h-[400px] rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default Home;
