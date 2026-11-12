export const skills = [
  ["Introduction", ["HTML", "CSS/SASS", "JavaScript", "TypeScript"]],
  ["Client", ["React", "Angular", "Bootstrap"]],
  ["Server", ["Node.js", "Express", "PHP/Laravel"]],
  ["Databases", ["MySQL", "PostgreSQL", "MongoDB"]],
  ["OS & Linux Images", ["Windows OS", "macOS", "Ubuntu", "Debian", "Amazon AMI"]],
  ["Web Services", ["Apache", "Nginx"]],
  ["Hosting", ["Amazon EC2", "Google Cloud"]],
  ["Source Control", ["GitHub", "Bitbucket", "GitLab"]],
] as const;

export const projects = [
  { title: "Medium-Fake", skills: ["HTML", "CSS", "PHP", "JavaScript", "MySQL", "Bootstrap", "Laravel", "AWS EC2"], timeline: "March 2018 - Ongoing", website: "medium.usharma.ca", github: "github.com/karshh/medium-fake", description: "A componentized Laravel web application inspired by Medium, with controllers and Eloquent models backed by MySQL and hosted on Amazon EC2." },
  { title: "TrafficYYC", skills: ["HTML", "CSS", "Bootstrap", "Express", "Node.js", "Debian", "Nginx", "GCP"], timeline: "February 2018 - Ongoing", website: "trafficyyc.usharma.ca", github: "github.com/karshh/Traffic.YYC", description: "A responsive application using City of Calgary REST data to present local traffic information." },
  { title: "WeatherYYC", skills: ["HTML", "CSS", "Express", "Node.js", "Debian", "Nginx", "GCP"], timeline: "February 2018", website: "weatheryyc.usharma.ca", github: "github.com/karshh/WeatherWebApp", description: "An introduction to consuming weather APIs through an Express server, with the Node service proxied through Nginx on Google Cloud." },
  { title: "BlogYYC", skills: ["HTML", "CSS", "Bootstrap", "Apache", "Ubuntu", "AWS EC2"], timeline: "January 2018", website: "blogyyc.usharma.ca", github: "github.com/karshh/WebLayoutThemes", description: "A template homepage focused on responsive layout and deployment." },
  { title: "Sample Themes", skills: ["HTML", "CSS", "Apache", "Amazon AMI", "AWS EC2"], timeline: "January 2018", website: "themes.usharma.ca", github: "github.com/karshh/WebLayoutThemes", description: "A series of introductory HTML and CSS pages exploring color systems and themes." },
] as const;
