export default defineEventHandler(async () => {
  // Return a predefined list of skills
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js',
    'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'C#', '.NET',
    'PHP', 'Laravel', 'Ruby', 'Rails', 'Go', 'Rust', 'C++', 'C',
    'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'DevOps',
    'Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'Photoshop',
    'Machine Learning', 'AI', 'Data Science', 'TensorFlow', 'PyTorch',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android',
    'UI/UX Design', 'Product Management', 'Agile', 'Scrum', 'Testing'
  ]
  
  return skills.sort()
})
