import React from "react";

const Footer = () => {
  return (
    <footer className="text-neutral-800 px-4 py-8 w-full">
      {/* Center wrapper */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* First section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl text-pink-500 font-semibold">Logo .</h2>
          <p className="text-lg py-2 mt-2">
            SKILLSWAP is a skill sharing platform open for all. Encouraging
            students to learn and grow new skills.
          </p>
          <p className="text-lg py-2">
            Need Support <u className="text-blue-200">contact us</u>
          </p>
        </div>

        {/* Second section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-pink-500 font-semibold">Platform</h1>
          <ul className="font-semibold flex flex-col gap-1 text-lg">
            <li>Marketplace</li>
            <li>Requests</li>
            <li>Chat</li>
            <li>Notifications</li>
            <li>Dashboard</li>
            <li>Profiles</li>
          </ul>
        </div>

        {/* Third section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-pink-500 font-semibold">Use Cases</h1>
          <ul className="font-semibold flex flex-col gap-2 text-lg">
            <li>Freelancers</li>
            <li>Students</li>
            <li>Recruiters</li>
            <li>Mentorship</li>
            <li>Developers</li>
            <li>Artists</li>
          </ul>
        </div>

        {/* Fourth section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-pink-500 font-semibold">Company</h2>
          <ul className="font-semibold flex flex-col gap-2 text-lg">
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Changelog</li>
            <li>Open Source</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
