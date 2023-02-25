import EditProfile from "components/Navbars/EditProfile";
import UbahPassword from "components/Navbars/UbahPassword";
import Dashboard from "views/Dashboard.js";
import dataKelas from "views/dataKelas/dataKelas";
import detailDataKelas from "views/dataKelas/detailDataKelas";
import editDataKelas from "views/dataKelas/editDataKelas";
import tambahDataKelas from "views/dataKelas/tambahDataKelas";
import dataSiswa from "views/dataSiswa/dataSiswa";
import detailDataSiswa from "views/dataSiswa/detailDataSiswa";
import editDataSiwa from "views/dataSiswa/editDataSiwa";
import tambahDataSiswa from "views/dataSiswa/tambahDataSiswa";
import dataTagihan from "views/dataTagihan/dataTagihan";
import detailDataTagihan from "views/dataTagihan/detailDataTagihan";
import editDataTagihan from "views/dataTagihan/editDataTagihan";
import editJenisTagihan from "views/dataTagihan/jenisTagihan/editJenisTagihan";
import jenisTagihan from "views/dataTagihan/jenisTagihan/jenisTagihan";
import tambahJenisTagihan from "views/dataTagihan/jenisTagihan/tambahJenisTagihan";
import detailTagihanLunas from "views/dataTagihan/listTagihanLunas/detailTagihanLunas";
import listTagihanLunas from "views/dataTagihan/listTagihanLunas/listTagihanLunas";
import tambahDataTagihan from "views/dataTagihan/tambahDataTagihan";
import Laporan from "views/Laporan/Laporan";

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
    path: "/edit-profile",
    name: "Edit Profile",
    component: EditProfile,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/edit-profile/ubahPassword",
    name: "Edit Profile",
    component: UbahPassword,
    layout: "/admin",
    sidebar: false,
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
    path: "/siswa/detail/:id",
    name: "Detail Data Siswa",
    component: detailDataSiswa,
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
    path: "/kelas/detail/:id",
    name: "Detail Data Kelas",
    component: detailDataKelas,
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
    path: "/tagihan/edit/:id",
    name: "Edit Tagihan Siswa",
    component: editDataTagihan,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/tagihan/detail/:id",
    name: "Detail Tagihan Siswa",
    component: detailDataTagihan,
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
  {
    path: "/listPembayaranLunas",
    name: "List Pembayaran Lunas",
    component: listTagihanLunas,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/listPembayaranLunas/detail/:id",
    name: "Detail Tagihan Lunas",
    component: detailTagihanLunas,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/laporan",
    name: "Laporan Pembayaran",
    icon: "nc-icon nc-single-copy-04",
    component: Laporan,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
