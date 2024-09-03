const cron = require('node-cron');
const Job = require('../model/job');
const User = require('../model/user');
const { sendMail } = require('../utils/mail');

const newsLetterSent = () => {
    cron.schedule('*/1 * * * *', async () => {  // Adjust timing if necessary
        try {
            const jobs = await Job.find({ newsLetterSent: false });

            for (const job of jobs) {
                try {
                    const filteredUsers = await User.find({
                        $or: [
                            { "niches.firstNiche": job.job_niche },
                            { "niches.secondNiche": job.job_niche },
                            { "niches.thirdNiche": job.job_niche }
                        ]
                    });

                    // Sending emails in parallel
                    const emailPromises = filteredUsers.map(user => {
                        const subject = `Hot Job Alert: ${job.title} in ${job.job_niche} Available Now`;
                        const message = `Hi ${user.fullName},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.company_name}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.company_name}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`;
                        return sendMail(user.email, subject, message);
                    });

                    await Promise.all(emailPromises);

                    job.newsLetterSent = true;
                    await job.save();

                } catch (error) {
                    console.error(`Error sending emails for job ID ${job._id}:`, error);
                }
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    });
};

module.exports = newsLetterSent;
