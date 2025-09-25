import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_FROM_EMAIL,
            to: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
            subject: `WorktreeWise from ${fullName}`,
            text: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        } as Mail.Options;

        // Send email
        await transporter.sendMail(mailOptions);

        // Respond with success
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
    }
}
