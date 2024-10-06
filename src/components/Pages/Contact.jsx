
const Contact = () => {
    return (
        <section className="body-font relative">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe
                        width="100%"
                        height="100%"
                        className="absolute inset-0"

                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d232.2953618762213!2d70.44154618704279!3d21.321848774689865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726065920252!5m2!1sen!2sin"

                    ></iframe>
                    <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                        <div className="lg:w-1/2 px-6">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                ADDRESS
                            </h2>
                            <p className="mt-1">
                                Ajmera Market, Mendarda, Gujarat 362260, Shop No 50
                            </p>
                        </div>
                        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                EMAIL
                            </h2>
                            <a className="text-red-500 leading-relaxed">viditjoshi94@gmail.com</a>
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                                PHONE
                            </h2>
                            <p className="leading-relaxed">+91 9586607262</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full mt-8 md:mt-0">
                    <h2 className="text-white text-2xl mb-1 font-medium title-font">
                        Contact Us
                    </h2>
                    <p className="leading-relaxed mb-5 font-font3 text-white">
                        This is our Contact Form Your Mail As or Conact With us To Fill Contact Form
                    </p>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            id="email"
                            name="email"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="message"
                            className="leading-7 text-sm text-white"
                        >
                            Message
                        </label>
                        <textarea
                            placeholder="Enter your message"
                            id="message"
                            name="message"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                    <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                        Submit
                    </button>

                </div>
            </div>
        </section>
    );
};

export default Contact;
