import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "../models/prisma-client";

export const registerAdmin =async (req: Request, res: Response) => {
  try {
    const { username, password, nama } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashPassword,
        nama,
      },
    });
    res.status(201).json({ message:'Akun berhasil terbuat', admin });
  } catch (error) {
    console.error('Gagal dalam membuat akun', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if(!admin) {
      res.status(404).json('Username tidak ditemukan');
      return;
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if(!validPassword) {
      res.status(400).json('Password salah');
      return;
    }
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string);
    res.json({ message: 'Berhasil login', token });
  } catch (error) {
    console.error('Gagal dalam login', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};