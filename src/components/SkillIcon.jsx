import {
  SiGo, SiCplusplus, SiC, SiJavascript, SiTypescript, SiPython, SiMysql, SiPostgresql, SiMongodb, SiRedis,
  SiNodedotjs, SiExpress, SiReact, SiTailwindcss, SiTemporal, SiKubernetes, SiDocker, SiArgo, SiHelm,
  SiTerraform, SiJenkins, SiGooglecloud, SiPrometheus, SiGrafana, SiLinux, SiGit, SiPostman,
  SiClaude, SiOpenai, SiGooglegemini, SiX,
} from 'react-icons/si';
import { TbApi, TbDatabase, TbArrowsExchange } from 'react-icons/tb';

const icons = {
  Go: [SiGo, '#00ADD8'],
  'C++': [SiCplusplus, '#659AD2'],
  C: [SiC, '#A8B9CC'],
  JavaScript: [SiJavascript, '#F7DF1E'],
  TypeScript: [SiTypescript, '#3178C6'],
  Python: [SiPython, '#FFD43B'],
  SQL: [TbDatabase, '#93C5FD'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, '#16181D'],
  React: [SiReact, '#61DAFB'],
  'REST APIs': [TbApi, '#22D3EE'],
  gRPC: [TbArrowsExchange, '#4FD1C5'],
  Temporal: [SiTemporal, '#16181D'],
  'Tailwind CSS': [SiTailwindcss, '#38BDF8'],
  MongoDB: [SiMongodb, '#47A248'],
  MySQL: [SiMysql, '#4479A1'],
  PostgreSQL: [SiPostgresql, '#699ECA'],
  Redis: [SiRedis, '#FF4438'],
  Kubernetes: [SiKubernetes, '#326CE5'],
  Docker: [SiDocker, '#2496ED'],
  ArgoCD: [SiArgo, '#EF7B4D'],
  Helm: [SiHelm, '#7FA7E0'],
  Terraform: [SiTerraform, '#844FBA'],
  Jenkins: [SiJenkins, '#D24939'],
  GCP: [SiGooglecloud, '#4285F4'],
  Prometheus: [SiPrometheus, '#E6522C'],
  Grafana: [SiGrafana, '#F46800'],
  Linux: [SiLinux, '#FCC624'],
  Git: [SiGit, '#F05032'],
  Postman: [SiPostman, '#FF6C37'],
  Claude: [SiClaude, '#D97757'],
  ChatGPT: [SiOpenai, '#16181D'],
  Gemini: [SiGooglegemini, '#8E75B2'],
  Grok: [SiX, '#16181D'],
};

// `brand` shows the logo in its brand colour; otherwise it is monochrome until the parent `.group` is hovered.
const SkillIcon = ({ name, className = 'h-5 w-5', brand = false }) => {
  const [Icon, color] = icons[name] || [TbApi, 'rgb(var(--brand))'];
  if (brand) return <Icon className={`${className} skill-brand`} style={{ '--skill': color }} aria-hidden="true" />;
  return (
    <Icon
      className={`${className} transition-colors duration-300 group-hover:text-[color:var(--skill)]`}
      style={{ '--skill': color }}
      aria-hidden="true"
    />
  );
};

export default SkillIcon;
