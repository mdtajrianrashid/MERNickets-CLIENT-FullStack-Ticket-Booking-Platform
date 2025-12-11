export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="font-bold text-lg">MERNickets</div>
          <p className="text-sm">Book bus, train, launch & flight tickets easily</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/all-tickets">All Tickets</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">email@example.com</p>
          <p className="text-sm">+880 1234 567890</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Payments</h4>
          <p className="text-sm">Stripe</p>
        </div>
      </div>

      <div className="border-t mt-6 pt-4 text-center text-sm">
        © 2025 MERNickets. All rights reserved.
      </div>
    </footer>
  );
}