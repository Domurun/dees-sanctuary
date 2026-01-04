import { Resend } from 'resend';

// Initialize Resend with your API Key (Set this in Vercel Environment Variables)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Change to your verified domain later
      to: 'deescreativesanctuary@gmail.com', // Replace with your actual email
      subject: `New Inquiry from ${name}: ${type}`,
      html: `
        <h1>New Portfolio Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}