// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     This page displays a list of learning modules available on the SakhiSangam platform, specifically tailored for rural women.
//     The user can browse through courses, see progress, and enroll in new ones. 
//     It also includes course details and recommendations based on completed courses.
//
// Dependencies:
//     - React useState Hook: For managing dynamic course and progress data
//     - React Router (v6+): For navigating between course details and other learning resources
//
// Notes:
//     Make sure to dynamically update the progress bars and course status based on user interaction and data from the backend.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LearningPage.css';

const lessonsData = {
  budgeting: [
    {
      tag: 'B-1',
      title: 'Lesson - 1',
      desc: 'Your Money Map: Creating a Monthly Household Budget',
    },
    {
      tag: 'B-2',
      title: 'Lesson - 2',
      desc: 'Needs vs Wants: Spending Wisely Every Day',
    },
    {
      tag: 'B-3',
      title: 'Lesson - 3',
      desc: 'Festivals & Emergencies: Planning for Special Expenses',
    },
  ],
  savings: [
    {
      tag: 'S-1',
      title: 'Lesson - 1',
      desc: 'Small Drops, Big Ocean: The Power of Daily Saving',
    },
    {
      tag: 'S-2',
      title: 'Lesson - 2',
      desc: 'Safe Spaces: How and Where to Save Money Securely',
    },
    {
      tag: 'S-3',
      title: 'Lesson - 3',
      desc: 'Emergency First: Building a Safety Fund',
    },
  ],
  investment: [
    {
      tag: 'I-1',
      title: 'Lesson - 1',
      desc: 'Growing Money: What is Investment?',
    },
    {
      tag: 'I-2',
      title: 'Lesson - 2',
      desc: 'How to Choose the Right Investment – Safety First',
    },
    {
      tag: 'I-3',
      title: 'Lesson - 3',
      desc: 'How to Start Investing – Step by Step Guide',
    },
  ],
};

const defaultLessons = [
  {
    tag: 'S-1',
    titleKey: 'Beginners guide to savings',
    descKey: 'Savings Guide',
  },
  {
    tag: 'B-1',
    titleKey: 'Beginners guide to Budgeting',
    descKey: 'Budgeting Guide',
  },
  {
    tag: 'I-1',
    titleKey: 'Beginners guide to Investment',
    descKey: 'Investments Guide',
  },
];

// Each lesson tag points to its unique PDF
const lessonPDFs = {
  'S-1': '/pdfs/savings/S-1.pdf',
  'S-2': '/pdfs/savings/S-2.pdf',
  'S-3': '/pdfs/savings/S-3.pdf',
  'B-1': '/pdfs/budgeting/B-1.pdf',
  'B-2': '/pdfs/budgeting/B-2.pdf',
  'B-3': '/pdfs/budgeting/B-3.pdf',
  'I-1': '/pdfs/investment/I-1.pdf',
  'I-2': '/pdfs/investment/I-2.pdf',
  'I-3': '/pdfs/investment/I-3.pdf',
};

const LearningPage = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Determine category based on tag prefix
  const getCategoryFromTag = (tag) => {
    if (tag.startsWith('S')) return 'savings';
    if (tag.startsWith('B')) return 'budgeting';
    if (tag.startsWith('I')) return 'investment';
    return '';
  };

  return (
    <div className="learning-page">
      <div className="learning-content">
        <select className="learning-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="">{t('LearningPage.selectOption')}</option>
          <option value="budgeting">{t('LearningPage.options.budgeting')}</option>
          <option value="savings">{t('LearningPage.options.savings')}</option>
          <option value="investment">{t('LearningPage.options.investment')}</option>
        </select>

        <div className="learning-options">
          {selectedOption === ''
            ? defaultLessons.map(({ tag, titleKey, descKey }, index) => (
                <div className="learning-item" key={index}>
                  <span className="learning-tag">{t(`${tag}`)}</span>
                  <div className="learning-item-content">
                    <h2>{t(titleKey)}</h2>
                    <button
                      className="play-button"
                      onClick={() => {
                        const category = getCategoryFromTag(tag);
                        setSelectedOption(category);
                      }}
                    >
                      {t('LearningPage.lessons.startLesson')}
                    </button>
                  </div>
                  <p>{t(descKey)}</p>
                </div>
              ))
            : lessonsData[selectedOption].map(({ tag, title, desc }, index) => (
                <div className="learning-item" key={index}>
                  <span className="learning-tag">{t(`${tag}`)}</span>
                  <div className="learning-item-content">
                    <h2>{title}</h2>
                    <button
                      className="play-button"
                      onClick={() => {
                        const pdfUrl = lessonPDFs[tag];
                        if (pdfUrl) window.open(pdfUrl, '_blank');
                      }}
                    >
                      {t('LearningPage.lessons.startLesson')}
                    </button>
                  </div>
                  <p>{desc}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPage;