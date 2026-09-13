import type { Request, Response } from 'express';

export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }

    // Mock/heuristic logic to fulfill the skeleton requirement for Week 5-6
    let answer = "I found some information in the recent placement drives. Please check the dashboard for the most up-to-date schedule.";
    let source_notice = "General Placement Cell Guidelines";

    const q = question.toLowerCase();
    
    if (q.includes('google')) {
      answer = "Google is visiting the campus for the Software Engineer role with a 32.0 LPA package. The CGPA cutoff is 8.0, and they will conduct a Coding Test.";
      source_notice = "Notice: Google India SDE Campus Drive";
    } else if (q.includes('microsoft')) {
      answer = "Microsoft is actively shortlisting for the Program Manager role. Make sure your resume highlights product planning and data analytics.";
      source_notice = "Notice: Microsoft Recruitment Update";
    } else if (q.includes('deloitte')) {
      answer = "Deloitte US is looking for Technology Consultants. The deadline is upcoming. Check the placement portal for eligible branches (CSE, IT, ECE, ME, EE).";
      source_notice = "Notice: Deloitte US Consultant Drive";
    } else if (q.includes('deadline')) {
      answer = "There are several upcoming deadlines. Please refer to the Placements tab to filter by deadlines and statuses.";
      source_notice = "Placement Calendar 2026";
    } else if (q.includes('highest package') || q.includes('maximum package')) {
      answer = "Currently, Google India is offering the highest package at 32.0 LPA.";
      source_notice = "Placement Statistics 2026";
    }

    // Simulate slight delay to mimic LLM generation
    setTimeout(() => {
      res.json({
        success: true,
        data: {
          answer,
          source_notice
        }
      });
    }, 800);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
