import './globals.css';

export const metadata = {
  title: 'Minor en Salud Pública | UANDES',
  description: 'Comprende los problemas de salud, analiza la evidencia y transforma decisiones con el Minor en Salud Pública de la Universidad de los Andes.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
