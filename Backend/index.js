const express = require('express');
const app = express();
const port = 9090;

require('dotenv').config();


// =========================== IMPORT OF REQUIRED MODULES =================================

const helmet = require("helmet");
const bcrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rateLimit = require('express-rate-limit');


// app.use(express.json());

// +======================== IMPORT OF MODELS ==========================
// const User = require('./models/User');


// ========================== IMPORT OF ROUTES =========================
const authRoutes = require('./routes/auth');
// ========================== IMPORT OF CONTACT ROUTES =========================
// const contactRoutes = require('./routes/contact');


///=============================== DATABASE =============================


mongoose.connect(
        `${process.env.MONGOURL}`

    ).then(async () => {
        console.log("Connected!");

        const db = mongoose.connection.db;
        try {
            await db.collection('users').dropIndex('phone_1');
            console.log(" Dropped existing index 'phone_1' ");
        } catch(err){
            console.log("ℹNo existing 'phone_1' to drop. " );
        }
            await db.collection('users').createIndex(
                { phone: 1 },
                { unique : true , partialFilterExpression: { phone : { $type : "string" } } }
            );
            console.log(" Partial unique index created on 'phone' ");
    }).catch( err => console.log("Error , Not connected!" , err));


    ///  ==================MIDDLEWARES==================

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"  ],
}));

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());

app.use(helmet());

// Rate Limiting , only for admin/ routes

const adminLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/admin', adminLimiter);



/// =============== Passport jwt setup ==================

const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJWt = require('passport-jwt').ExtractJwt;

    const opts = {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.TOKEN,
    };

    passport.use('user-jwt' , new JwtStrategy(opts , async (jwt_payload , done) => {
        try {
            const user  = await User.findById(jwt_payload.id);
            if(user) return done(null, user);
            return done(null , false);
        }   catch (err) {
            return done(err, false);
        }
    }));
app.use(passport.initialize());

passport.use('admin-jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const admin = await Admin.findById(jwt_payload.id);
        if (admin) return done(null, admin);
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

///  ======================= ROUTES =====================

app.get( "/" , (req, res) => res.send( " Can you see me?" ) );
app.use(authRoutes);

// Previously added feature routes (if you already have them, keep them)
app.use('/dashboard', require('./routes/dashboard'));
app.use('/problems', require('./routes/problems'));
app.use('/analytics', require('./routes/analytics'));
app.use('/social', require('./routes/social'));
app.use('/playground', require('./routes/playground'));
app.use('/settings', require('./routes/settings'));
// app.use('/notifications', require('./routes/notifications'));
app.use('/admin', require('./routes/AdminAuth'));

// NEW mounts for images 9–12 features
app.use('/subscriptions', require('./routes/subscriptions')); // pricing/plan access
app.use('/catalog', require('./routes/catalog'));             // exam → subject tree
app.use('/ai', require('./routes/ai'));                       // premium AI sessions
app.use('/practice', require('./routes/practice'));           // topic/level attempts
app.use('/progress', require('./routes/progress'));           // analytics summary
app.use('/leaderboard', require('./routes/leaderboard'));     // class/institute/world
app.use('/friends', require('./routes/friends'));             // search/list
app.use('/organizations', require('./routes/organisations')); // join by school code
app.use('/content', require('./routes/content'));             // paid content
app.use('/teacher', require('./routes/teacher'));             // teacher verification
app.use('/goals', require('./routes/goals'));                 // /goals CRUD

/// ======================= SERVER ======================
app.listen( port , () => console.log("App is running on port http://localhost:" + port));
