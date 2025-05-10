import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', 
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'returned', 'overdue'],
    default: 'active',
  },
  fine: {
    type: Number,
    default: 0,  
  },
});

const Loan = mongoose.models.Loan || mongoose.model('Loan', LoanSchema);

export default Loan;
