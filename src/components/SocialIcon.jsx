import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const icons = { github: FaGithub, linkedin: FaLinkedin, leetcode: SiLeetcode, gfg: SiGeeksforgeeks };

const SocialIcon = ({ icon, className = 'h-5 w-5' }) => {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden="true" />;
};

export default SocialIcon;
