export default function Footer() {
  return (
    <>
      <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm bg-indigo-600 text-white backdrop-blur-md">
        <p>Copyright © 2025 CVB. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/CV-builder" className="hover:text-white transition-all">
            Preview CV
          </a>
          <div className="h-8 w-px bg-white/20"></div>
          <a href="#" className="hover:text-white transition-all">
            Privacy Policy
          </a>
          <div className="h-8 w-px bg-white/20"></div>
          <a href="#" className="hover:text-white transition-all">
            Terms of Service
          </a>
        </div>
      </footer>
    </>
  );
}
