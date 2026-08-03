export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050508] py-8">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-accent opacity-50"></div>
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Pulakandla Raghavender Reddy. Built with passion.
        </p>
      </div>
    </footer>
  );
}