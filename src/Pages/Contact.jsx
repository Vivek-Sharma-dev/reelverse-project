import { MdSend } from 'react-icons/md';

const Contact = () => {
  // link of my Formspree form
  const FORMSPREE_URL = "https://formspree.io/f/xpwovegv";

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-gray-300 mb-8 text-xl">
        Have a question, feedback, or just want to say hi? Fill out the form below,
        and we'll get back to you as soon as possible.
      </p>

      {/* This is the Formspree form */}
      <form action={FORMSPREE_URL} method="POST">
        {/* Your Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 font-semibold mb-2 text-lg">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Your Email (Required by Formspree) */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 font-semibold mb-2 text-lg">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-300 font-semibold mb-2 text-lg">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Your Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-300 font-semibold mb-2 text-lg">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-xl "
          >
            <MdSend />
            Send Message
          </button>
        </div>

      </form>
    </div>
  );
};

export default Contact;