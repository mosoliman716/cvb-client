import { useRef } from "react";

const Testimonials = () => {
  const cardRefs = useRef([]);

  const testimonials = [
    {
      name: "Alex Johnson",
      title: "Software Engineer",
      message:
        "CVB made creating my CV effortless. The live preview feature is a game changer!",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Maria Lee",
      title: "Product Manager",
      message:
        "I landed my dream job using a CV from CVB. Highly recommend for job seekers!",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      name: "Sam Patel",
      title: "Designer",
      message:
        "The templates are modern and professional. Exporting to PDF was seamless.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <div id="testimonials">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          Testimonials
        </h1>
        <p className="text-center text-gray-500 mt-1">
          We have collected some testimonials from our users. They are real
          people who have used our product.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 py-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300 hover:bg-indigo-300"
            >

              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-gray-500">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Very easy to integrate
                  </h3>
                  <p className="my-4 text-sm line-clamp-3">
                    {testimonial.message}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full w-9 h-9"
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                  />
                  <div className="space-y-0.5 font-medium text-left ml-3">
                    <p>{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
