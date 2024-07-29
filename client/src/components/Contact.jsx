import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4 p-4 bg-gray-100 mt-4 shadow-md rounded-lg">
          <p className="text-lg font-semibold mb-2">
            Contact{" "}
            <span className="font-bold">{landlord.username}</span> for{" "}
            <span className="font-bold">{listing.name}</span> :
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here ..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-150"
          />
          <a
            href={`mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-150"
          >
            Send Message
          </a>
        </div>
      )}
    </>
  );
}

