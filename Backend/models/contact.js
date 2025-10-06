const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    // Optional: when user is authenticated, we attach their ID from JWT
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },

    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [100, 'First name must be less than 100 characters'],
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [100, 'Last name must be less than 100 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please fill a valid email address',
      ],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      // Basic global phone validation (adjust to your needs)
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        'Please provide a valid phone number',
      ],
      minlength: [8, 'Phone number seems too short'],
      maxlength: [20, 'Phone number seems too long'],
    },

    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: {
        values: ['General Inquiry', 'Technical Support', 'Billing Question', 'Other'],
        message: 'Subject must be one of: General Inquiry, Technical Support, Billing Question, Other',
      },
      default: 'General Inquiry',
      trim: true,
    },

    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
      maxlength: [5000, 'Message must be less than 5000 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false, // removes __v
    toJSON: {
      transform: (_, ret) => {
        // Optional: keep a clean output
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        return ret;
      },
    },
  }
);

// Helpful index for querying recent messages per user
contactSchema.index({ userId: 1, createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;