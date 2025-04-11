import { useEffect, useState } from "react";
import instance from "../axiosconfig";
import { ImCross } from "react-icons/im";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    image: "",
    number: "",
    interest: "",
    latitude: "",
    longitude: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    try {
      const frm = new FormData();
      Object.entries(form).forEach(([key, value]) => frm.append(key, value));

      await instance.post("/addprofile", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        name: "",
        address: "",
        description: "",
        image: "",
        number: "",
        interest: "",
        latitude: "",
        longitude: "",
      });

      fetchProfiles();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === "image" ? files[0] : value });
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      setIsLoading(true);
      const response = await instance.get("/fetch");
      setProfiles(response.data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSummary(id) {
    try {
      setShow(true);
      const response = await instance.get(`/fetch/${id}`);
      setProfile(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setShow(false);
    }
  }

  async function deleteProfile(id) {
    await instance.delete(`/deleteprofile/${id}`);
    fetchProfiles();
  }

  return (
    <>
      <header>
        <nav className="flex justify-between px-6 py-3 bg-amber-400 fixed top-0 w-full z-10">
          <h2 className="text-2xl font-bold text-cyan-900">
            <button onClick={() => setShowForm(false)}>Mapify</button>
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Add Profile
          </button>
        </nav>
      </header>

      {showForm ? (
        <div className="mt-24 max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Create Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {[
              { name: "name", placeholder: "Enter your Name" },
              { name: "address", placeholder: "Enter your Address" },
              { name: "description", placeholder: "Enter your Description" },
              { name: "number", placeholder: "Enter your Phone No" },
              { name: "interest", placeholder: "Enter your Interests" },
              { name: "latitude", placeholder: "Enter Latitude" },
              { name: "longitude", placeholder: "Enter Longitude" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                type="text"
                name={name}
                value={form[name]}
                placeholder={placeholder}
                className="border rounded px-3 py-1"
                onChange={handleChange}
              />
            ))}

            <input
              type="file"
              name="image"
              className="border rounded px-3 py-1"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <section className="mt-15 px-4 flex flex-col md:flex-row ">
          <div className="md:w-1/3 my-8 md:mb-0 md:pr-4">
            {show && profile ? (
              <div className="bg-green-500 text-white rounded-md p-4 shadow-md sticky top-20">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2>
                  <strong>Name:</strong> {profile.name}
                </h2>
                <p>
                  <strong>Address:</strong> {profile.address}
                </p>
                <p>
                  <strong>Phone:</strong> {profile.number}
                </p>
                <p>
                  <strong>Description:</strong> {profile.description}
                </p>
                <p>
                  <strong>Interest:</strong> {profile.interest}
                </p>
                <button
                  onClick={() => setShow(false)}
                  className="mt-4 bg-red-500 px-3 py-1 rounded"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="text-center text-lg font-semibold">
                {isLoading
                  ? "Loading profiles..."
                  : "Select a profile to see details."}
              </div>
            )}
          </div>

          <div className="w-full min-h-screen flex justify-center shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.5)]">
            <div className="w-full md:w-2/3 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-8 gap-4">
                {profiles.map((user) => (
                  <div
                    key={user._id}
                    className="bg-blue-950 text-white rounded-md p-4 relative shadow-none"
                  >
                    <ImCross
                      onClick={() => deleteProfile(user._id)}
                      className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 text-xl cursor-pointer"
                    />
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-20 h-20 rounded-full mx-auto mb-3"
                    />
                    <h3 className="text-lg font-semibold text-center">
                      {user.name}
                    </h3>
                    <p className="text-sm mb-2 text-center">{user.address}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSummary(user._id)}
                        className="bg-green-500 px-3 py-1 rounded mt-2"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="text-center py-2 bg-gray-500 text-white mt-6 fixed bottom-0 left-0 right-0">
        © 2025 Mapify — All Rights Reserved.
      </footer>
    </>
  );
}

export default App;
