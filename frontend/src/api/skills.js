import api from './axios';

export const getAllSkills = () => api.get('/skills/');
export const getUserSkills = () => api.get('/me/skills/');
export const addSkill = (skill_id, skill_type) =>
  api.post('/me/skills/', { skill_id, skill_type });
export const deleteSkill = (skill_id) => api.delete(`/me/skills/${skill_id}/`);
export const getMatches = () => api.get('/me/matches/');
