import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';
import Background from './Background';

const Contact = () => {
	 const EMAIL_JS_SERVICE_ID = 'service_31qu5rb';
	const EMAIL_JS_TEMPLATE_ID = 'template_9548mnl';
	const EMAIL_JS_PUBLIC_KEY = 'AT9wnz5IoRSM3hQEz';
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const username = form.name.trim();
    const user_email = form.email.trim();
    const user_message = form.message.trim();

    if (username === '' || user_email === '' || user_message === '') {
      setLoading(false);
      toast.error('Please fill all the fields.', {
        position: 'bottom-right',
      });
      return;
    }

    emailjs
      .send(
        EMAIL_JS_SERVICE_ID,
        EMAIL_JS_TEMPLATE_ID,
        {
          from_name: username,
          to_name: 'Srikar',
          reply_to: user_email,
          to_email: 'srikarambula.1924@gmail.com',
          message: user_message,
        },
        EMAIL_JS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Message sent successfully!', {
            position: 'bottom-right',
          });
          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error('Uh, oh! Something went wrong. Please try again later.', {
            position: 'bottom-right',
          });
        }
      );
  };

  return (
    <Background>
	 <>
      <div className="relative z-0 pt-20 pb-20">
        <div className="text-white contact overflow-x-hidden pt-12 mt-8 flex justify-center items-center">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full sm:w-[650px]">
		  <h2 className="text-center text-5xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-700"><span className="text-white">🤝</span> Let's Connect <span className="text-white">✉️</span></h2>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
              <label className="flex flex-col">
                <span className="text-lg font-medium mb-2">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="py-3 px-4 rounded-lg bg-gray-900 text-white outline-none border-none focus:text-black"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-lg font-medium mb-2">Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ex:abc@gmail.com"
                  className="py-3 px-4 rounded-lg bg-gray-900 text-white outline-none border-none focus:text-black"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-lg font-medium mb-2">Your Message</span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Do you have anything to say?"
                  className="py-3 px-4 rounded-lg bg-gray-900 text-white outline-none border-none focus:text-black"
                  required
                />
              </label>
              <button
                type="submit"
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
        
      </div>
	  <Footer/>
	  </>
    </Background>
  );
};

export default Contact;
