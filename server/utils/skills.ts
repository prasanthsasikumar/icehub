import type { SkillWithLevel } from './auth'

// Helper functions for handling skills with levels
export function normalizeSkills(skills: string[] | SkillWithLevel[]): SkillWithLevel[] {
  if (!skills || skills.length === 0) return []
  
  // Check if it's already in the new format
  if (typeof skills[0] === 'object' && 'name' in skills[0] && 'level' in skills[0]) {
    return skills as SkillWithLevel[]
  }
  
  // Convert old format (string[]) to new format with default levels
  return (skills as string[]).map(skill => ({
    name: skill,
    level: getDefaultSkillLevel(skill)
  }))
}

export function getDefaultSkillLevel(skill: string): number {
  // Default skill levels based on common technologies (same logic as before)
  const advanced = ['JavaScript', 'React', 'Vue', 'Python', 'Node.js']
  const intermediate = ['TypeScript', 'Angular', 'PHP', 'Java', 'C#']
  
  if (advanced.includes(skill)) return 4
  if (intermediate.includes(skill)) return 3
  return Math.floor(Math.random() * 3) + 2 // Random 2-4
}

export function skillsToStringArray(skills: string[] | SkillWithLevel[]): string[] {
  if (!skills || skills.length === 0) return []
  
  // If it's already string array, return as is
  if (typeof skills[0] === 'string') {
    return skills as string[]
  }
  
  // Extract names from SkillWithLevel array
  return (skills as SkillWithLevel[]).map(skill => skill.name)
}

export function getSkillLevel(skills: string[] | SkillWithLevel[], skillName: string): number {
  if (!skills || skills.length === 0) return getDefaultSkillLevel(skillName)
  
  // If it's the new format with levels
  if (typeof skills[0] === 'object' && 'name' in skills[0] && 'level' in skills[0]) {
    const skill = (skills as SkillWithLevel[]).find(s => s.name === skillName)
    return skill ? skill.level : getDefaultSkillLevel(skillName)
  }
  
  // Old format - use default calculation
  return getDefaultSkillLevel(skillName)
}
