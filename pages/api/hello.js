// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let data = {
    npm: 2022320048,
    nama: "Aji Pujo Hardiyanto",
    kelas: "SI20B",
    Angkatan: 2020,
  };

  res.status(200).json(data);
}
