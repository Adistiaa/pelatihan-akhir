import React from "react";

const InformationPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 text-center shadow" style={{ maxWidth: "500px", borderRadius: "10px" }}>
        <img
          src="https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg" // Ganti dengan path gambar profil
          alt="Foto"
          className="rounded-circle mx-auto"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h3 className="mt-3">Muhammad Adistia Pratama</h3>
        <h5 className="text-muted">Fullstack Developer & Game Developer</h5>
        <p className="text-muted">Student at SMK Negeri 69 Jakarta</p>
        <p className="text-secondary">
        I am Muhammad Adistia Pratama, a student from SMK Negeri 69 Jakarta majoring in SIJA (Sistem Informasi, Jaringan, dan Aplikasi). I as a student have an interest in the field of Fullstack Web Developer, I as a Web Developer try to be a wise person and also seek various experiences to create an application / website that is good and also interesting to use.
        </p>
        <div className="d-flex justify-content-center gap-4 mt-3">
          <a href="https://github.com/Adistiaa" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.02 1.53 1.02.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.02-2.69-.1-.25-.44-1.27.1-2.64 0 0 .83-.27 2.73 1.02a9.48 9.48 0 012.49-.34c.84.01 1.69.12 2.49.34 1.9-1.29 2.73-1.02 2.73-1.02.54 1.37.2 2.39.1 2.64.63.7 1.02 1.6 1.02 2.69 0 3.83-2.34 4.68-4.57 4.93.36.31.68.91.68 1.84v2.73c0 .27.16.58.67.48A10.005 10.005 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="https://instagram.com/bad.single_player" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="black"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
