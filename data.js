// Data defining the "code" to be typed and the actual HTML to rendered
const sections = {
    home: {
        filename: 'index.html',
        code: `<!-- Hero Section -->
<section class="hero">
  <div class="hero-content">
    <h1>...</h1>
    <p>...</p>
    <div class="hero-btns">
      <a href="..." class="btn-primary">...</a>
      <a href="..." class="btn-secondary">...</a>
    </div>
  </div>
</section>`
    },
    projects: {
        filename: 'projects.jsx',
        code: `const Projects = () => {
  // Data Source
  const works = [...];

  return (
    <div class="grid-projects">
      {works.map(work => (
        <Card data={work} />
      ))}
    </div>
  );
}`
    },
    services: {
        filename: 'services.ts',
        code: `interface Service {
  icon: string;
  title: string;
  desc: string;
}

const services: Service[] = [
  { title: "Frontend", ... },
  { title: "Backend", ... },
  { title: "UI/UX", ... }
];`
    },
    about: {
        filename: 'about_me.md',
        code: `# About System
        
[User]: "Who am I?"

> I am a aspiring developer bridging 
> the gap between code and design.

## Profile_Pic.png
[LOADING...]

## System_Capabilities
- Frontend Architecture
- Backend Solutions
- UI/UX Engineering
- Performance Optimization

/* End of File */`
    },
    contact: {
        filename: 'contact.json',
        code: `{
  "email": "email@domain.com",
  "linkedin": "linkedin.com/in/user",
  "status": "Open for work",
  "sendMessage": "function() { ... }"
}`
    }
};
