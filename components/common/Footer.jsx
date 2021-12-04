import Button from "./Button";
import Icon from "./Icon";
import Image from "next/image";

const Footer = ({ planTrip, children }) => (
  <div className="footer-wrapper pt-52 text-white">
    {children}
    <div className="footer-background">
      <img
        src="/footer-background-top.png"
        alt="beach background"
        className="w-full"
      />
    </div>
    <div className="foot-links grid grid-cols-2 md:grid-cols-4 text-black-content pt-7 mb-16 gap-3 container">
      <div className="legal">
        <h3 className="font-circular-black text-black pb-5">Legal</h3>
        <ul className="">
          <li>MSA Self Managed</li>
          <li>Privacy</li>
          <li>GDPR</li>
          <li>Guidelines for Law Enforcement</li>
          <li>Terms of Service</li>
          <li>Manage Cookies</li>
        </ul>
      </div>
      <div className="product">
        <h3 className="font-circular-black text-black pb-5">Product</h3>
        <ul>
          <li>Why move</li>
          <li>Features</li>
          <li>Omnichannel</li>
          <li>Community</li>
          <li>Webinars</li>
          <li>Marketplace</li>
        </ul>
      </div>
      <div className="company mt-10 md:mt-0">
        <h3 className="font-circular-black text-black pb-5">Company</h3>
        <ul>
          <li>Team</li>
          <li>About</li>
          <li>Jobs</li>
          <li>Partners</li>
          <li>Press</li>
          <li>Blog</li>
          <li>Newsletter</li>
        </ul>
      </div>
      <div className="social mt-10 md:mt-0">
        <ul className="pt-5">
          <li>
            <Icon icon="facebook" />
          </li>
          <li>
            <Icon icon="twitter" />
          </li>
          <li>
            <Icon icon="linkedin" />
          </li>
          <li>
            <Icon icon="instagram" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
