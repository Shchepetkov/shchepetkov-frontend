import React from 'react';
import ResumeLayout from '../components/resume/ResumeLayout';
import ResumeHeader from '../components/resume/ResumeHeader';
import AboutSection from '../components/resume/AboutSection';
import ExperienceSection from '../components/resume/ExperienceSection';
import SpecializationSection from '../components/resume/SpecializationSection';
import ApproachSection from '../components/resume/ApproachSection';
import AchievementsSection from '../components/resume/AchievementsSection';
import SkillsSection from '../components/resume/SkillsSection';
import EducationSection from '../components/resume/EducationSection';
import AdditionalSection from '../components/resume/AdditionalSection';

export default function ResumePage() {
  return (
    <ResumeLayout>
      <ResumeHeader />
      <AboutSection />
      <ExperienceSection />
      <SpecializationSection />
      <ApproachSection />
      <AchievementsSection />
      <SkillsSection />
      <EducationSection />
      <AdditionalSection />
    </ResumeLayout>
  );
} 