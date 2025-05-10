import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: [true , "El nombre de cada libro deber se unico"] ,   
    trim: true,

  },
  authors: {
    type: [String], 

  },
  genres: {
    type: [String], 
    
  },
  availability: {
    type: Boolean,
    default: true, 
  },
  timesBorrowed: {
    type: Number,
    default: 0, 
  },
  loanDuration: {
    type: Number, 

  },
  lastLoanDate: {
    type: Date, 
    default: null, 
  }
  
}, {
  timestamps: true
});


export default mongoose.models.Book || mongoose.model('Book', BookSchema);