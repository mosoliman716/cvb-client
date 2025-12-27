function PersonalInfoForm({ data, change }) {
  return (
    <div>
      <label className="mb-4 block text-gray-700 font-semibold">
        Full Name:
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your full name"
          value={data?.full_name || ""}
          onChange={(e) => change({ ...data, full_name: e.target.value })}
        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        Email:
        <input
          type="email"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => change({ ...data, email: e.target.value })}
        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        Phone:
        <input
          type="tel"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your phone number"
          value={data.phone}
          onChange={(e) => change({ ...data, phone: e.target.value })}

        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        Location:
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your full name"
                    value={data.location}
          onChange={(e) => change({ ...data, location: e.target.value })}

        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        LinkedIn:
        <input
          type="url"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your LinkedIn profile URL"
                    value={data.linkedin}
          onChange={(e) => change({ ...data, linkedin: e.target.value })}

        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        website:
        <input
          type="url"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your website URL"
                    value={data.website}
          onChange={(e) => change({ ...data, website: e.target.value })}

        />
      </label>
      <label className="mb-4 block text-gray-700 font-semibold">
        profession:
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          placeholder="Enter your profession"
                    value={data.profession}
          onChange={(e) => change({ ...data, profession: e.target.value })}

        />
      </label>
    </div>
  );
}

export default PersonalInfoForm;
