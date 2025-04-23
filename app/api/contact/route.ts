import { NextRequest } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { sendUserConfirmation, sendAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  console.log('Contact form API route called');
  
  try {
    // Parse the request body
    const formData = await request.json();
    console.log('Received form data:', formData);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !formData.phone) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if Supabase is properly configured
    console.log('Checking Supabase configuration...');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase configuration missing');
      return new Response(
        JSON.stringify({ success: false, message: 'Server configuration error: Supabase credentials missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Log Supabase client initialization
    console.log('Supabase client initialized with URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    let submissionData = null;
    
    try {
      // Get the Supabase client
      const supabase = getSupabaseClient();
      
      // Store the submission in Supabase
      console.log('Attempting to store in Supabase...');
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || null,
            budget: formData.budget || null,
            message: formData.message,
            created_at: new Date().toISOString(),
          },
        ])
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        
        // Check for specific error types
        if (error.code === '42P01') {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'Database table does not exist. Please run the setup SQL script.', 
              error: error.message, 
              details: error 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        } else if (error.code === '23505') {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'A submission with this information already exists.', 
              error: error.message, 
              details: error 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: 'Failed to store submission. Database error: ' + error.message, 
              error: error.message, 
              details: error 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
      
      submissionData = data;
      console.log('Successfully stored in Supabase:', data);
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Database error', 
          error: String(dbError), 
          stack: (dbError as Error).stack 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check email configuration
    console.log('Checking email configuration...');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST ? 'Set' : 'Not set');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + (process.env.EMAIL_PASS?.length || 0) + ')' : 'Not set');
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM ? 'Set' : 'Not set');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? 'Set' : 'Not set');
    
    let userEmailSent = false;
    let adminEmailSent = false;
    
    // Send confirmation email to user
    try {
      console.log('Sending confirmation email to user...');
      const userEmailResult = await sendUserConfirmation(formData.email, formData.name);
      console.log('User email result:', userEmailResult);
      
      if (!userEmailResult.success) {
        console.warn('Failed to send user confirmation email:', userEmailResult.error);
      } else {
        userEmailSent = true;
      }
    } catch (emailError) {
      console.error('Error sending user email:', emailError);
      console.error('Email error stack:', (emailError as Error).stack);
      // Continue execution even if user email fails
    }
    
    // Send notification email to admin
    try {
      console.log('Sending notification email to admin...');
      const adminEmailResult = await sendAdminNotification(formData);
      console.log('Admin email result:', adminEmailResult);
      
      if (!adminEmailResult.success) {
        console.warn('Failed to send admin notification email:', adminEmailResult.error);
      } else {
        adminEmailSent = true;
      }
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
      console.error('Email error stack:', (emailError as Error).stack);
      // Continue execution even if admin email fails
    }
    
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        submissionId: submissionData?.[0]?.id,
        emailStatus: {
          userEmail: userEmailSent,
          adminEmail: adminEmailSent,
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Server error:', error);
    console.error('Error stack:', (error as Error).stack);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error', 
        error: String(error), 
        stack: (error as Error).stack 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
