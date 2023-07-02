import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from'@/styles/Home.module.css';
import Navbar from "./components/Navbar";

const koneksiMahasiswa = axios.create({
  baseURL: "http://127.0.0.1:5000/api/mahasiswa",
});

export default function FormMahasiswa() {
  const [statenama, setNama] = useState("");
  const [statenim, setNim] = useState("");
  const [statetanggal, setTanggal] = useState("2018-07-22");
  const [statealamat, setAlamat] = useState("");
  const [statefoto, setFoto] = useState("");
  const [mahasiswa, setMahasiswa] = useState(null);
  const [stateadd, setAdd] = useState(false);
  const [stateedit, setEdit] = useState(false);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await koneksiMahasiswa.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setAdd(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const nim = event.target.nim.value;
    const formData = {
      nim: event.target.nim.value,
      nama: event.target.nama.value,
      alamat: event.target.alamat.value,
      tanggal_lahir: event.target.tanggal_lahir.value,
    };
    try {
      const response = await koneksiMahasiswa.put(`/${nim}`, formData);
      console.log(response);
      setEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleAdd = () => {
    setAdd(true);
    setEdit(false);
  };

  const handleCancelAdd = () => {
    setAdd(false);
  };

  const handleCancelEdit = () => {
    setEdit(false);
    setNama("");
    setNim("");
    setAlamat("");
    setTanggal(formatDate("2018-07-22"));
    setFoto("");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const nim = event.currentTarget.value;
    koneksiMahasiswa
      .delete(`/${nim}`)
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data);
        setMahasiswa((mahasiswa) => mahasiswa.filter((mhs) => mhs.nim !== nim));
      })
      .catch((error) => {
        console.error('Gagal menghapus data:', error);
      });
  };
  
  

  const handleEdit = (event) => {
    event.preventDefault();
    const nim = event.target.value;
    const mhsEdit = mahasiswa.filter((mahasiswa) => mahasiswa.nim === nim);
    if (mhsEdit.length > 0) {
      setNama(mhsEdit[0].nama);
      setNim(mhsEdit[0].nim);
      setAlamat(mhsEdit[0].alamat);
      setTanggal(formatDate(mhsEdit[0].tanggal_lahir));
      setFoto(mhsEdit[0].foto);
      setAdd(false);
      setEdit(true);
    }
  };

  useEffect(() => {
    async function getMahasiswa() {
      try {
        const response = await koneksiMahasiswa.get("/");
        setMahasiswa(response.data.data);
      } catch (error) {
        console.error("Error from API Mahasiswa:", error);
      }
    }
    getMahasiswa();
  }, []);

  if (mahasiswa === null) {
    return <div>Waiting...</div>;
  } else {
    return (
      <div>
        <Navbar/>
        <button
          id="btnadd"
          onClick={handleAdd}
          className={stateadd ? "hide" : "show"}
        >
          Add
        </button>

        <form
          id="formadd"
          className={stateadd ? "show boxInput" : "hide"}
          onSubmit={handleSubmitAdd}
        >
          <table border={0}>
            <tbody>
              <tr>
                <td>
                  <label>NIP:</label>
                </td>
                <td>
                  <input type="text" id="nim" name="nim" className="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Nama:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    className="text"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Foto:</label>
                </td>
                <td>
                  <input type="file" name="image" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Tanggal Masuk:</label>
                </td>
                <td>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    className="text"
                    min="1970-01-01"
                    max="2025-12-31"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Divisi/Unit :</label>
                </td>
                <td>
                  <textarea
                    id="address"
                    style={{ resize: "none" }}
                    name="alamat"
                    className="text"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" className="btn btn-blue" />
          <input
            type="button"
            value="Cancel"
            onClick={handleCancelAdd}
            className="btn btn-blue"
          />
        </form>

        <form
          id="formedit"
          className={stateedit ? "show box" : "hide"}
          onSubmit={handleSubmitEdit}
        >
          <table border={0}>
            <tbody>
              <tr>
                <td>
                  <label>NIP:</label>
                </td>
                <td>
                  <input type="text" id="nim" value={statenim} name="nim" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Nama:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="nama"
                    value={statenama}
                    name="nama"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Foto:</label>
                </td>
                <td> <input type="file" name="image" />
                  <img src={statefoto} width="80" alt="" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Tanggal Masuk:</label>
                </td>
                <td>
                  <input
                    type="date"
                    value={statetanggal}
                    name="tanggal_lahir"
                    onChange={(e) => setTanggal(e.target.value)}
                    min="1970-01-01"
                    max="2025-12-31"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Divisi/Unit:</label>
                </td>
                <td>
                  <textarea
                    id="address"
                    style={{ resize: "none" }}
                    value={statealamat}
                    name="alamat"
                    onChange={(e) => setAlamat(e.target.value)}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" className="btn btn-blue" />
          <input
            type="button"
            value="Cancel"
            onClick={handleCancelEdit}
            className="btn btn-blue"
          />
        </form> 
        <br />
        <br />
        <br />

      <h1>Data Absen Karyawan</h1>
        <div className="container my-12 mx-auto px-4 md:px-14">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {mahasiswa.map((mhs) => (
              <div className="box my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={mhs.nim}>
                <a href="#">
                  <img className="rounded-t-lg" src={mhs.foto} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {mhs.nama}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {mhs.alamat}
                  </p>
                  <button
                    className="btn btn-blue"
                    onClick={handleEdit}
                    value={mhs.nim}
                  >
                    Edit &nbsp; <i className="fas fa-heart"></i>{" "}
                  </button>
                  <button
                    className="btn btn-blue"
                    onClick={handleDelete}
                    value={mhs.nim}
                  >
                    Delete &nbsp; <i className="fas fa-exchange-alt"></i>{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
