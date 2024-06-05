import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectDB } from '@/config/db';

connectDB();

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    console.log(`Attempting to delete user with ID: ${id}`); // Log for debugging
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Delete API error:', error); // Improved error logging
    return NextResponse.json({
      success: false,
      message: 'Something went wrong with the Delete API',
      error: error.message,
    }, { status: 500 });
  }
}
