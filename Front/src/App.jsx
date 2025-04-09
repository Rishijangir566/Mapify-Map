import { useEffect, useState } from "react";
import instance from "../axiosconfig";
import { ImCross } from "react-icons/im";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false)
    e.preventDefault();
    try {
      const frm = new FormData();
      frm.append("name", form.name);
      frm.append("address", form.address);
      frm.append("description", form.description);
      frm.append("image", form.image);
      frm.append("number", form.number);
      frm.append("interest", form.interest);
      frm.append("latitude", form.latitude);
      frm.append("longitude", form.longitude);

  

      await instance.post("/addprofile", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); setForm({
        name: "",
        address: "",
        description: "",
        image: "",
        number: "",
        interest: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(form);
  

  function handleChange(e) {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
  }

  useEffect(() => {
    fetchProfiles();
    
    
  }, []);

  async function fetchProfiles() {
    try {
      const response = await instance.get("/fetch");
      setProfiles(response.data.profiles);
    } catch (error) {
      console.error("Erorr fetching profiles:", error);
    }
  }

  async function handleSummary(id) {
    try {
      const response = await instance.get(`/fetch/${id}`);
      setShow(true);
      setProfile(response.data.profile);
    } catch (error) {
      console.error("Erorr fetching profiles:", error);
      setShow(false);
    }
  }

  async function deleteProfile(id) {
    await instance.delete(`/deleteprofile/${id}`);
    fetchProfiles()
   
  }

  // console.log(profile.name);

  function handleClose() {
    setShow(false);
  }
  function handleForm() {
    setShowForm(true);
  }
  function handleHome() {
    setShowForm(false);
  }

  return (
    <>
      <header>
        <nav className="flex justify-between px-20 py-2 bg-amber-400 fixed top-0 left-0 right-0 ">
          <div>
            <h2 className="text-2xl" > <button onClick={handleHome}>Mapify</button></h2>
          </div>
          <ul>
            <li>
              <button
                onClick={handleForm}
                className="bg-blue-600 px-3 py-1 rounded-md text-white "
              >
                Add Profile
              </button>{" "}
            </li>
          </ul>
        </nav>
      </header>

      {
        showForm?<>
         <div className="text-center mt-20 w-[40rem] mx-auto">
      <h1 className='text-2xl font-bold'>Create Your Profile</h1>
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2  py-5"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter your Name"
          className="border w-[20rem] rounded-md pl-2 my-1"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          className="border w-[20rem] rounded-md pl-2 my-1"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter your description"
          className="border w-[20rem] rounded-md pl-2 my-1"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          placeholder="Upload your photo"
          className="border w-[20rem] rounded-md pl-2 my-1"
          onChange={handleChange}
        />
        <input
          type="Number"
          name="number"
          placeholder="Enter your phone No"
          className="border w-[20rem] rounded-md pl-2 my-1"
          value={form.number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="interest"
          placeholder="Enter your interests"
          className="border w-[20rem] rounded-md pl-2 my-1"
          value={form.interest}
          onChange={handleChange}
        />
        <input
          type="Number"
          name="latitude"
          placeholder="Enter the value of latitude"
          className="border w-[20rem] rounded-md pl-2 my-1"
          value={form.latitude}
          onChange={handleChange}
        />
        <input
          type="Number"
          name="longitude"
          className="border w-[20rem] rounded-md pl-2 my-1"
          placeholder="Enter the value of longitude"
          value={form.longitude}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-400 rounded px-4 py-1 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
        
        </>

        : <section className="flex mt-12">
        <div className="left w-[30%] mx-auto font-bold h-[70%] relative ">
          {show ? (
            <>
              <div className="w-[20rem] h-[30rem] border  bg-green-500 text-white rounded-md font-medium mt-8 left-10 fixed  ">
                <img
                  className="h-40 mx-auto rounded-full my-6"
                  src={profile.image}
                  alt="not found"
                />
                <h2 className="mb-1 ml-12">
                  <strong>Name :</strong> {profile.name}{" "}
                </h2>
                <p className="mb-2 ml-12">
                  {" "}
                  <strong>Address :</strong> {profile.address}
                </p>
                <p className="mb-2 ml-12">
                  {" "}
                  <strong>description :</strong> {profile.description}
                </p>
                <p className="mb-2 ml-12">
                  {" "}
                  <strong>interest :</strong> {profile.interest}
                </p>
                <button
                  onClick={handleClose}
                  className="bg-red-400 px-3 py-1 rounded-md font-medium absolute bottom-2 right-3"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mt-8 text-2xl  left-20 fixed "> Loading ....</h2>{" "}
            </>
          )}
        </div>
        <div className="right w-[70%] text-center border-l-2 py-8 ">
          {/* <h2 className="text-2xl font-bold mb-4"> Profiles </h2> */}
          <div className="flex flex-wrap justify-center  gap-4 ">
            {profiles.length > 0 &&
              profiles.map((user) => (
                <div
                  key={user._id}
                  className="w-[13rem] h-[18rem] border text-center bg-blue-950 text-white rounded-md    "
                >
                  <ImCross onClick={()=>deleteProfile(user._id)} className="ml-44 mt-1 text-red-600 bg-white rounded-full p-1 text-2xl"/>
                  <img
                    className="h-20 mx-auto rounded-full my-6"
                    src={user.image}
                    alt="not found"
                  />
                  <h2 className="mb-1">
                    <strong>Name :</strong> {user.name}{" "}
                  </h2>
                  <p className="mb-2">
                    {" "}
                    <strong>Address :</strong> {user.address}
                  </p>
                  <button
                    onClick={() => handleSummary(user._id)}
                    className="bg-green-400 px-3 py-1 rounded-md font-medium mt-4"
                  >
                    Summary
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>}
      <footer className="text-center fixed bottom-0 right-0 left-0 bg-gray-500">
        Footer
      </footer>
    </>
  );
}

export default App;
