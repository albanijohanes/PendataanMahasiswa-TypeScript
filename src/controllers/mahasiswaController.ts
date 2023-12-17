import { Request, Response } from "express";
import prisma from "../models/prisma-client";

// ambil data mahasiswa semua yang ada dalam database
export const getAllMahasiswa = async (req: Request, res: Response) => {
  try {
    const mahasiswa = await prisma.mahasiswa.findMany();
    res.status(200).json(mahasiswa);
  } catch (error){
    console.error('Gagal dalam mengambil data mahasiswa', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// ambil data mahasiswa berdasarkan id yang dipilih di database
export const getMahasiswaById = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { id: Number(id) },
    });
    if(!mahasiswa) {
      res.status(404).json('Mahasiswa tersebut tidak di temukan');
      return;
    }
    res.json(mahasiswa);
  } catch (error) {
    console.error('Gagal dalam mengambil data mahasiswa', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

// mengcreate data mahasiswa untuk di kirim ke database
export const createMahasiswa = async (req: Request, res: Response) => {
    const { nama, nim, jk } = req.body;
    try {
      const newMahasiswa = await prisma.mahasiswa.create({
        data: { nama, nim, jk }
      });
      res.json('berhasil menambahkan data');
    } catch (error) {
      console.error('Gagal dalam membuat data', error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

// mengupdate data mahasiswa untuk di ubah di database
export const updateMahasiswa = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { nama, nim, jk } = req.body;
  try {
    const updateMahasiswa = await prisma.mahasiswa.update({
      where: { id: Number(id) },
      data: { nama, nim, jk },
    });
    res.json('Berhasil merubah data');
  } catch (error) {
    console.error('Gagal dalam mengubah data', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

// mendelete data mahasiswa untuk diubah di database
export const deleteMahasiswa =async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteMahasiswa = await prisma.mahasiswa.delete({
      where: {id: Number(id)}
    });
    res.json('Berhasil menghapus data');
  } catch(error) {
    console.error('Gagal dalam menghapus data', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}