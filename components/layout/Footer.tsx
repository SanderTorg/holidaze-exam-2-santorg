export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
        <p>This is a student project.</p>
      </div>
    </footer>
  );
}
