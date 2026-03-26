import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { TranslationKey } from '../i18n/translations';

type TranslateFn = (key: TranslationKey, params?: Record<string, string>) => string;

type GenerateResumePdfParams = {
  t: TranslateFn;
  language: 'ru' | 'en';
};

const truncateText = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  const trimmed = value.slice(0, maxLength);
  const safeCut = trimmed.lastIndexOf(' ');
  return `${(safeCut > 0 ? trimmed.slice(0, safeCut) : trimmed).trim()}...`;
};

const buildResumeHtml = (t: TranslateFn, language: 'ru' | 'en'): string => {
  const summary = [t('aboutSubtitle'), truncateText(t('heroDescription'), 220)].join(' ');
  const experience = [
    {
      title: t('workExperienceTitle'),
      company: t('workExperienceSubtitle'),
      period: t('timePeriod'),
      description: truncateText(t('workExperienceText'), 280),
    },
    {
      title: t('workExperienceTitle2'),
      company: t('workExperienceSubtitle2'),
      period: t('timePeriod2'),
      description: truncateText(t('workExperienceText2'), 260),
    },
  ];

  const skills = [
    `${t('javaDevelopment')} - ${t('javaDescription')}`,
    `${t('testAutomation')} - ${t('testDescription')}`,
    `${t('apiTesting')} - ${t('apiDescription')}`,
    `${t('distributedSystems')} - ${t('distributedSystemsDescription')}`,
    `${t('cicd')} - ${t('cicdDescription')}`,
    `${t('databases')} - ${t('databasesDescription')}`,
    `${t('architecture')} - ${t('architectureDescription')}`,
  ];

  const contacts = language === 'ru'
    ? {
        title: 'Контакты',
        location: 'Саратов, Россия',
      }
    : {
        title: 'Contacts',
        location: 'Saratov, Russia',
      };

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #0f172a; background: #ffffff; width: 794px; padding: 28px; box-sizing: border-box;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: #ffffff; padding: 28px; border-radius: 16px;">
        <h1 style="margin: 0; font-size: 36px; line-height: 1.15;">${t('nameAndLastName')}</h1>
        <p style="margin: 8px 0 0; font-size: 18px; opacity: 0.95;">${t('heroSubtitle')}</p>
      </div>

      <section style="margin-top: 18px;">
        <h2 style="font-size: 18px; margin: 0 0 10px; color: #1d4ed8;">${t('aboutTitle')}</h2>
        <p style="margin: 0; font-size: 13px; line-height: 1.6;">${summary}</p>
      </section>

      <section style="margin-top: 18px;">
        <h2 style="font-size: 18px; margin: 0 0 12px; color: #1d4ed8;">${t('workExperience')}</h2>
        ${experience
          .map(
            (item) => `
            <div style="margin-bottom: 10px; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 10px;">
              <div style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline;">
                <strong style="font-size: 15px;">${item.title} - ${item.company}</strong>
                <span style="font-size: 12px; color: #475569;">${item.period}</span>
              </div>
              <p style="margin: 8px 0 0; font-size: 12px; line-height: 1.55;">${item.description}</p>
            </div>
          `
          )
          .join('')}
      </section>

      <section style="margin-top: 18px;">
        <h2 style="font-size: 18px; margin: 0 0 12px; color: #1d4ed8;">${t('keySkills')}</h2>
        <ul style="padding-left: 20px; margin: 0;">
          ${skills
            .map(
              (skill) =>
                `<li style="margin-bottom: 6px; font-size: 12px; line-height: 1.45;">${skill}</li>`
            )
            .join('')}
        </ul>
      </section>

      <section style="margin-top: 18px;">
        <h2 style="font-size: 18px; margin: 0 0 10px; color: #1d4ed8;">${contacts.title}</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 14px; font-size: 12px;">
          <span><strong>Email:</strong> maksim.shchepetkov1995@gmail.com</span>
          <span><strong>GitHub:</strong> github.com/shchepetkov</span>
          <span><strong>Telegram:</strong> @David_Rizer</span>
          <span><strong>${t('location')}:</strong> ${contacts.location}</span>
        </div>
      </section>
    </div>
  `;
};

export const generateResumePdf = async ({ t, language }: GenerateResumePdfParams): Promise<void> => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.zIndex = '-1';
  container.style.pointerEvents = 'none';
  container.innerHTML = buildResumeHtml(t, language);
  document.body.appendChild(container);

  try {
    const target = container.firstElementChild as HTMLElement;
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    const widthRatio = maxWidth / canvas.width;
    const heightRatio = maxHeight / canvas.height;
    const scale = Math.min(widthRatio, heightRatio);

    const renderWidth = canvas.width * scale;
    const renderHeight = canvas.height * scale;
    const x = (pageWidth - renderWidth) / 2;
    const y = (pageHeight - renderHeight) / 2;

    pdf.addImage(imageData, 'PNG', x, y, renderWidth, renderHeight);

    const fileName = language === 'ru' ? 'Maksim_Shchepetkov_Resume_RU.pdf' : 'Maksim_Shchepetkov_Resume_EN.pdf';
    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
};
