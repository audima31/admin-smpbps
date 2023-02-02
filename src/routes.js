import Dashboard from "views/Dashboard.js";
import dataKelas from "views/dataKelas/dataKelas";
import editDataKelas from "views/dataKelas/editDataKelas";
import tambahDataKelas from "views/dataKelas/tambahDataKelas";
import dataSiswa from "views/dataSiswa/dataSiswa";
import editDataSiwa from "views/dataSiswa/editDataSiwa";
import tambahDataSiswa from "views/dataSiswa/tambahDataSiswa";
import dataTagihan from "views/dataTagihan/dataTagihan";
import editDataTagihan from "views/dataTagihan/editDataTagihan";
import editJenisTagihan from "views/dataTagihan/jenisTagihan/editJenisTagihan";
import jenisTagihan from "views/dataTagihan/jenisTagihan/jenisTagihan";
import tambahJenisTagihan from "views/dataTagihan/jenisTagihan/tambahJenisTagihan";
import tambahDataTagihan from "views/dataTagihan/tambahDataTagihan";
import Icons from "views/Icons.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/siswa",
    name: "Data Siswa",
    icon: "nc-icon nc-hat-3",
    component: dataSiswa,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/siswa/tambah",
    name: "Tambah Akun Siswa",
    component: tambahDataSiswa,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/siswa/edit/:id",
    name: "Edit Data Siswa",
    component: editDataSiwa,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/kelas",
    name: "Data Kelas",
    icon: "nc-icon nc-bullet-list-67",
    component: dataKelas,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/kelas/tambah",
    name: "Tambah Data Kelas",
    component: tambahDataKelas,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/kelas/edit/:id",
    name: "Edit Data Kelas",
    component: editDataKelas,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/tagihan",
    name: "Data Tagihan",
    icon: "nc-icon nc-money-coins",
    component: dataTagihan,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/tagihan/tambah",
    name: "Tambah Data Tagihan",
    component: tambahDataTagihan,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/tagihan/edit/:key/:id",
    name: "Edit Tagihan Siswa",
    component: editDataTagihan,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jenistagihan",
    name: "Jenis Tagihan",
    component: jenisTagihan,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jenistagihan/tambah",
    name: "Tambah Jenis Tagihan",
    component: tambahJenisTagihan,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jenistagihan/edit/:id",
    name: "Edit Jenis Tagihan",
    component: editJenisTagihan,
    layout: "/admin",
    sidebar: false,
  },
];
export default routes;
